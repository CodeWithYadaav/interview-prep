/**
 * Backend Interview Preparation Questions & System Design Scenarios
 *
 * Structure:
 * - id: Unique identifier
 * - question: The short title/scenario
 * - rating: Interview frequency / importance (1-5 stars)
 * - details: Specific scenario context
 * - conceptsToLearn: Key architectural patterns or concepts to research
 * - codeTemplate: Boilerplate JS structure to implement your solution
 */

module.exports = [
  // ==========================================
  // MODULE 1 — CONCURRENCY (HIGHEST PRIORITY)
  // ==========================================
  {
    id: 1,
    module: "Concurrency",
    question: "Cache Stampede (Thundering Herd Problem)",
    rating: "⭐⭐⭐⭐⭐",
    details: "Redis cache is empty or expires. 100 users hit the API simultaneously, causing 100 Redis misses and 100 simultaneous DB queries.",
    conceptsToLearn: ["Promise Sharing", "Single Flight Pattern", "Distributed Lock (Redlock)", "Probabilistic Early Expiration (XFetch)"],
    codeTemplate: `
/**
 * Prevent thundering herd using Promise Sharing / Singleflight Pattern
 */
const inFlightRequests = new Map();

async function getDataWithSingleFlight(key) {
  // 1. Check Cache
  // 2. If Miss, check if request is already in-flight
  // 3. If in-flight, return the existing Promise
  // 4. Otherwise, query DB and populate cache
}
`
  },
  {
    id: 2,
    module: "Concurrency",
    question: "Duplicate Payment Prevention",
    rating: "⭐⭐⭐⭐⭐",
    details: "User clicks 'Pay Now' 5 times in rapid succession. Payment must execute exactly once.",
    conceptsToLearn: ["Idempotency Key", "Database Unique Constraints", "Atomic Transactions"],
    codeTemplate: `
/**
 * Idempotency Middleware Example
 */
async function processPayment(req, res) {
  const idempotencyKey = req.headers['x-idempotency-key'];
  // Check Redis/DB for idempotencyKey state (PENDING, SUCCESS, FAILED)
  // Handle lock or return cached response
}
`
  },
  {
    id: 3,
    module: "Concurrency",
    question: "Double Order Creation",
    rating: "⭐⭐⭐⭐",
    details: "Customer refreshes POST /orders twice. Prevent duplicate orders from being placed.",
    conceptsToLearn: ["Idempotent API Design", "Client-side Request Token", "Pessimistic vs Optimistic Locking"],
    codeTemplate: `
async function createOrder(userId, orderPayload, requestToken) {
  // Implement unique constraint check or token invalidation
}
`
  },
  {
    id: 4,
    module: "Concurrency",
    question: "OTP Spam & Cost Prevention",
    rating: "⭐⭐⭐⭐",
    details: "User presses 'Send OTP' 10 times in seconds. Send only one OTP, avoid SMS costs, and prevent abuse.",
    conceptsToLearn: ["Rate Limiting", "Cooldown Timers (TTL in Redis)", "IP & User-based Throttling"],
    codeTemplate: `
async function sendOTP(phoneNumber) {
  // 1. Check if OTP was sent in the last 60 seconds (Redis TTL)
  // 2. If blocked, reject request
  // 3. Else, generate OTP, store with short TTL, send SMS
}
`
  },
  {
    id: 5,
    module: "Concurrency",
    question: "Refresh Token Storm",
    rating: "⭐⭐⭐⭐",
    details: "JWT expires. 50 parallel API requests fail together on the frontend and trigger 50 concurrent refresh token calls.",
    conceptsToLearn: ["Frontend/Backend Request Queueing", "Promise Mutex", "Singleflight Token Refresh"],
    codeTemplate: `
// Deduplicate refresh calls on client/server API gateway level
let refreshPromise = null;

async function handleTokenRefresh() {
  if (!refreshPromise) {
    refreshPromise = fetchNewTokens().finally(() => { refreshPromise = null; });
  }
  return refreshPromise;
}
`
  },

  // ==========================================
  // MODULE 2 — REDIS & CACHING
  // ==========================================
  {
    id: 6,
    module: "Redis",
    question: "Redis vs Relational Database Strategy",
    rating: "⭐⭐⭐⭐",
    details: "When should Redis be used vs a persistent DB? What data should NEVER be cached?",
    conceptsToLearn: ["In-Memory Data Structures", "Cache Eviction Policies (LRU/LFU)", "Cache Security & PII Data"],
    codeTemplate: `
// Architectural comparison guide:
// USE REDIS: High-read data, sessions, rate limits, ephemeral counters, pub/sub.
// USE DB: ACID compliant transactions, complex relational queries, financial source of truth.
// NEVER CACHE: Non-invalidatable security rights, sensitive unencrypted PII, rapidly changing unindexed audit logs.
`
  },
  {
    id: 7,
    module: "Redis",
    question: "Cache-Aside Pattern (Lazy Loading)",
    rating: "⭐⭐⭐⭐⭐",
    details: "Redis -> Miss -> Database -> Update Redis -> Return. The most fundamental read-heavy pattern.",
    conceptsToLearn: ["Cache-Aside Flow", "Cache TTL Strategy", "Cache Warmup"],
    codeTemplate: `
async function getUserProfile(userId) {
  const cacheKey = \`user:\${userId}\`;
  const cachedData = await redis.get(cacheKey);
  if (cachedData) return JSON.parse(cachedData);

  const dbData = await db.users.findById(userId);
  if (dbData) {
    await redis.set(cacheKey, JSON.stringify(dbData), 'EX', 3600);
  }
  return dbData;
}
`
  },
  {
    id: 8,
    module: "Redis",
    question: "Write-Through vs Write-Back Cache",
    rating: "⭐⭐⭐",
    details: "Update DB and Cache simultaneously. What are the pros, cons, and performance trade-offs?",
    conceptsToLearn: ["Write-Through", "Write-Behind (Write-Back)", "Consistency vs Latency Trade-offs"],
    codeTemplate: `
async function updateUserProfile(userId, newData) {
  // Write-Through implementation
  await db.users.update(userId, newData);
  await redis.set(\`user:\${userId}\`, JSON.stringify(newData));
}
`
  },
  {
    id: 9,
    module: "Redis",
    question: "Cache Invalidation & Consistency",
    rating: "⭐⭐⭐⭐⭐",
    details: "Database is updated, but Redis holds stale data. How do you solve state drift?",
    conceptsToLearn: ["Pub/Sub Invalidation Events", "CDC (Change Data Capture)", "Short TTLs", "Dual Writes"],
    codeTemplate: `
async function updateProduct(productId, updates) {
  // Update DB first
  await db.products.update(productId, updates);
  // Invalidate Cache immediately
  await redis.del(\`product:\${productId}\`);
}
`
  },
  {
    id: 10,
    module: "Redis",
    question: "Distributed Session Storage",
    rating: "⭐⭐⭐⭐",
    details: "Why sessions should be stored in Redis instead of Node.js process memory in production.",
    conceptsToLearn: ["Stateless Servers", "Horizontal Scaling", "Sticky Sessions vs Centralized Cache"],
    codeTemplate: `
// Express-session configuration using connect-redis
// Enables multi-instance cluster support without losing user state
`
  },

  // ==========================================
  // MODULE 3 — DATABASE & OPTIMIZATION
  // ==========================================
  {
    id: 11,
    module: "Database",
    question: "N+1 Query Problem",
    rating: "⭐⭐⭐⭐⭐",
    details: "Fetching Users -> Orders -> Products -> Reviews generates 1000+ DB queries. Reduce it to 2 queries.",
    conceptsToLearn: ["SQL JOINs", "Eager Loading", "DataLoader Pattern", "Batching Queries"],
    codeTemplate: `
// Bad: Querying inside loops
// Good: Fetching keys and executing SELECT ... WHERE id IN (...)
async function fetchUsersWithOrders(userIds) {
  const users = await db.users.findMany({ id: userIds });
  const orders = await db.orders.findMany({ userId: userIds });
  // Map orders to users in application layer
}
`
  },
  {
    id: 12,
    module: "Database",
    question: "Slow Query Optimization Without Pagination",
    rating: "⭐⭐⭐⭐",
    details: "Query takes 2 seconds. The interviewer forbids pagination. What code/DB changes do you make?",
    conceptsToLearn: ["Composite Indexes", "Covering Indexes", "EXPLAIN ANALYZE", "Field Selection (Select specific columns)"],
    codeTemplate: `
// 1. Use EXPLAIN ANALYZE to identify Sequential Scans
// 2. Index filtering/sorting columns
// 3. Avoid SELECT *; request only required fields
`
  },
  {
    id: 13,
    module: "Database",
    question: "Connection Pool Exhaustion",
    rating: "⭐⭐⭐⭐",
    details: "1000 incoming users, but DB maximum connection limit is 100. What happens and how to prevent crash?",
    conceptsToLearn: ["Database Pooling (PgBouncer)", "Connection Leaks", "Queueing Requests", "Timeouts"],
    codeTemplate: `
// Ensure connections are released back to pool in a try-finally block
async function executeTransaction(pool) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // operations
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release(); // Crucial!
  }
}
`
  },
  {
    id: 14,
    module: "Database",
    question: "Wallet Race Condition",
    rating: "⭐⭐⭐⭐⭐",
    details: "Two concurrent requests update wallet balance simultaneously (100 -> 80 -> 90), leading to incorrect end balance.",
    conceptsToLearn: ["Optimistic Concurrency Control", "Pessimistic Locking (SELECT FOR UPDATE)", "Atomic SQL Operations"],
    codeTemplate: `
// Atomic SQL execution prevents race condition:
// UPDATE wallets SET balance = balance - 20 WHERE user_id = 1 AND balance >= 20;
`
  },
  {
    id: 15,
    module: "Database",
    question: "Database Transactions & Rollback",
    rating: "⭐⭐⭐⭐",
    details: "Transfer funds from A to B. Money is deducted from A, but crediting B fails. Roll back safely.",
    conceptsToLearn: ["ACID Properties", "DB Isolation Levels", "Explicit Transactions"],
    codeTemplate: `
async function transferMoney(fromId, toId, amount) {
  // Wrap operations in DB Transaction block
}
`
  },

  // ==========================================
  // MODULE 4 — APIs & RESILIENCE
  // ==========================================
  {
    id: 16,
    module: "APIs",
    question: "Distributed Rate Limiting",
    rating: "⭐⭐⭐⭐⭐",
    details: "Prevent brute force login attacks on POST /login (10,000 requests) using Redis.",
    conceptsToLearn: ["Leaky Bucket Algorithm", "Token Bucket Algorithm", "Sliding Window Log / Counter"],
    codeTemplate: `
async function slidingWindowRateLimiter(ipKey, limit = 5, windowInSec = 60) {
  // Use Redis Sorted Sets (ZADD, ZREMRANGEBYSCORE, ZCARD)
}
`
  },
  {
    id: 17,
    module: "APIs",
    question: "Retry Logic & Exponential Backoff",
    rating: "⭐⭐⭐⭐",
    details: "Third-party API fails transiently. How to retry safely without overloading the destination system?",
    conceptsToLearn: ["Exponential Backoff", "Jitter (Randomization)", "Idempotent Retries"],
    codeTemplate: `
async function fetchWithRetry(fn, retries = 3, delay = 1000) {
  try {
    return await fn();
  } catch (err) {
    if (retries === 0) throw err;
    const jitter = Math.random() * 200;
    await new Promise(r => setTimeout(r, delay + jitter));
    return fetchWithRetry(fn, retries - 1, delay * 2);
  }
}
`
  },
  {
    id: 18,
    module: "APIs",
    question: "Circuit Breaker Pattern",
    rating: "⭐⭐⭐⭐",
    details: "Database or downstream service is down. Prevent incoming requests from hanging for 30s.",
    conceptsToLearn: ["Circuit Breaker States (CLOSED, OPEN, HALF-OPEN)", "Opossum Library", "Fail-fast strategy"],
    codeTemplate: `
// Circuit Breaker tracks error rate.
// If > threshold, immediately fail requests without calling failing dependency.
`
  },
  {
    id: 19,
    module: "APIs",
    question: "Third-Party API Timeout Handling",
    rating: "⭐⭐⭐",
    details: "An external vendor API takes 30 seconds to answer. How should your server respond?",
    conceptsToLearn: ["AbortController / Timeouts", "Asynchronous Webhooks", "Polling Pattern"],
    codeTemplate: `
async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 5000 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, { ...options, signal: controller.signal });
  clearTimeout(id);
  return response;
}
`
  },
  {
    id: 20,
    module: "APIs",
    question: "API Versioning Strategies",
    rating: "⭐⭐⭐",
    details: "Transitioning from /v1 to /v2 without breaking legacy clients.",
    conceptsToLearn: ["URI Path Versioning", "Header Versioning", "Query Param Versioning", "Deprecation Strategies"],
    codeTemplate: `
// Common patterns:
// 1. URI: /api/v1/users vs /api/v2/users
// 2. Header: Accept: application/vnd.myapi.v2+json
`
  },

  // ==========================================
  // MODULE 5 — NODE.JS RUNTIME
  // ==========================================
  {
    id: 21,
    module: "Node.js",
    question: "Event Loop Execution Order",
    rating: "⭐⭐⭐⭐⭐",
    details: "Predict execution order of synchronous code, process.nextTick, Promise microtasks, setTimeout, and setImmediate.",
    conceptsToLearn: ["Phases of Event Loop", "Microtask Queue vs Macrotask Queue", "process.nextTick Starvation"],
    codeTemplate: `
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
process.nextTick(() => console.log('4'));
setImmediate(() => console.log('5'));
console.log('6');
// Expected Output Order: 1 -> 6 -> 4 -> 3 -> 2 -> 5 (or 5 before 2 depending on phase start)
`
  },
  {
    id: 22,
    module: "Node.js",
    question: "CPU Intensive Tasks Blocking Event Loop",
    rating: "⭐⭐⭐⭐",
    details: "User uploads a 1GB Excel file. Parsing freezes the single-threaded server. How to fix it?",
    conceptsToLearn: ["Offloading to Worker Threads", "Child Processes", "Chunking Processing with setImmediate"],
    codeTemplate: `
// Solution: Offload parsing off the main event loop thread
const { Worker } = require('worker_threads');
`
  },
  {
    id: 23,
    module: "Node.js",
    question: "Worker Threads vs Child Processes",
    rating: "⭐⭐⭐",
    details: "When should Worker Threads be used vs Child Processes or Cluster module?",
    conceptsToLearn: ["SharedArrayBuffer", "Thread Memory Overhead", "CPU-bound vs I/O-bound tasks"],
    codeTemplate: `
// Worker Threads: Shared memory, ideal for JS CPU-intensive logic.
// Child Processes: Isolated memory, running non-JS shell commands/binaries.
`
  },
  {
    id: 24,
    module: "Node.js",
    question: "Memory Efficient File Processing (Streams)",
    rating: "⭐⭐⭐⭐",
    details: "Read and process a 5GB file without exceeding RAM limits or crashing Node.",
    conceptsToLearn: ["Readable / Writable Streams", "Transform Streams", "Backpressure (.pipe / pipeline)"],
    codeTemplate: `
const fs = require('fs');
const { pipeline } = require('stream/promises');

async function processLargeFile() {
  await pipeline(
    fs.createReadStream('huge-file.txt'),
    // transformStreamStep,
    fs.createWriteStream('output.txt')
  );
}
`
  },
  {
    id: 25,
    module: "Node.js",
    question: "Background Processing with Job Queues",
    rating: "⭐⭐⭐⭐⭐",
    details: "User uploads 10,000 images. Should the HTTP response wait? How to process asynchronously?",
    conceptsToLearn: ["Asynchronous Message Queues", "BullMQ / Redis", "Dead Letter Queues", "Worker Nodes"],
    codeTemplate: `
// 1. API receives request -> Pushes task to Queue -> Responds with 202 Accepted & JobId
// 2. Independent worker process pulls tasks from BullMQ and processes images
`
  },

  // ==========================================
  // BONUS MODULE — ADVANCED SYSTEM DESIGN
  // ==========================================
  {
    id: 26,
    module: "Bonus",
    question: "Optimistic vs Pessimistic Locking",
    rating: "⭐⭐⭐⭐",
    details: "Prevent overwrite conflicts in high-concurrency DB writes.",
    conceptsToLearn: ["Version Column (Optimistic)", "SELECT FOR UPDATE (Pessimistic)", "Conflict Resolution Strategy"],
    codeTemplate: `
// Optimistic:
// UPDATE products SET stock = 5, version = version + 1 WHERE id = 10 AND version = 2;
`
  },
  {
    id: 27,
    module: "Bonus",
    question: "Deadlocks Detection & Avoidance",
    rating: "⭐⭐⭐",
    details: "Transaction A locks Row 1 and waits for Row 2. Transaction B locks Row 2 and waits for Row 1.",
    conceptsToLearn: ["Consistent Resource Lock Order", "Transaction Timeouts", "Deadlock Detection Graphs"],
    codeTemplate: `
// Rule: Always acquire locks in the exact same deterministic order across all queries
`
  },
  {
    id: 28,
    module: "Bonus",
    question: "Message Queues Comparison (Kafka vs RabbitMQ vs SQS)",
    rating: "⭐⭐⭐⭐",
    details: "Selecting the right messaging backend for microservices.",
    conceptsToLearn: ["AMQP vs Event Log Streaming", "Message Retention Policies", "Ordering Guarantees"],
    codeTemplate: `
// Kafka: Log-based, replayable events, massive throughput.
// RabbitMQ: Complex routing (AMQP), message acknowledgement, lower latency.
// SQS: Fully managed AWS queue, simple integration, zero maintenance.
`
  },
  {
    id: 29,
    module: "Bonus",
    question: "Real-time Messaging Architecture at Scale",
    rating: "⭐⭐⭐⭐",
    details: "How do 1 million connected WebSocket users receive live messages across multiple backend nodes?",
    conceptsToLearn: ["Redis Pub/Sub Adapter", "Socket.IO Cluster", "Connection Memory Footprint"],
    codeTemplate: `
// Attach Redis Adapter to WebSocket server so events broadcast across all instances
`
  },
  {
    id: 30,
    module: "Bonus",
    question: "S3 Pre-signed URLs for Direct Uploads",
    rating: "⭐⭐⭐⭐",
    details: "Why avoiding file streaming through your API server to AWS S3 saves CPU and bandwidth.",
    conceptsToLearn: ["AWS S3 SDK", "GetObject/PutObject Pre-signed URLs", "CORS Configuration"],
    codeTemplate: `
async function getUploadUrl(fileKey) {
  // Generate timed pre-signed URL and return to client to upload directly to S3 bucket
}
`
  },
  {
    id: 31,
    module: "Bonus",
    question: "Distributed Cron Jobs",
    rating: "⭐⭐⭐",
    details: "You scale to 3 API instances. A scheduled cron job executes 3 times instead of once.",
    conceptsToLearn: ["Redlock / Distributed Locks", "Dedicated Cron Worker Service", "Agenda.js / BullMQ Repeater"],
    codeTemplate: `
// Acquire distributed lock in Redis before running cron task; if lock fails, skip run
`
  },
  {
    id: 32,
    module: "Bonus",
    question: "Graceful Shutdown in Node.js",
    rating: "⭐⭐⭐⭐",
    details: "Node server receives SIGTERM from Kubernetes/Docker. How to stop safely without dropping active requests?",
    conceptsToLearn: ["SIGTERM / SIGINT Signals", "Closing DB Connections", "HTTP Server Close Callback"],
    codeTemplate: `
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Closing HTTP server...');
  server.close(async () => {
    await db.disconnect();
    await redis.quit();
    process.exit(0);
  });
});
`
  }
];
