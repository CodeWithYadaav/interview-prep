/**
 * ============================================================================
 * SYSTEM DESIGN & CODING INTERVIEW CHEAT SHEET
 * ============================================================================
 */

/* ============================================================================
 * 1. MUST-KNOW INTERVIEW PATTERNS CHECKLIST
 * ============================================================================
 *
 * 📊 HASH MAP / DICTIONARY
 * ------------------------
 *  [ ] Frequency Counter (Numbers, Characters, Words)
 *  [ ] Grouping (Group by Role, Group by Age)
 *  [ ] Aggregate Counts (Count Roles)
 *  [ ] Duplicate Detection (Find Duplicates, Contains Duplicate)
 *  [ ] Unique Element Tracking (First Unique Character)
 *  [ ] Complement Lookup (Two Sum)
 *
 * 🔢 ARRAYS & TWO-POINTERS / SLIDING WINDOW
 * -----------------------------------------
 *  [ ] In-Place Modification (Move Zeros, Reverse Array, Remove Duplicates)
 *  [ ] Array Rotation & Swapping (Rotate Array)
 *  [ ] Extremes & Single-Pass Scans (Second Largest, Missing Number)
 *  [ ] Prefix/Suffix Products (Product of Array Except Self)
 *  [ ] Dynamic Programming / Subarrays (Kadane's Algorithm)
 *  [ ] Sorted Array Merging (Merge Two Arrays)
 *  [ ] Set Operations (Intersection of Two Arrays)
 *
 * 🔤 STRINGS & MANIPULATION
 * -------------------------
 *  [ ] Space & Character Tokenization (Reverse Words)
 *  [ ] Two-Pointer Symmetry (Valid Palindrome)
 *  [ ] Frequency Comparison (Valid Anagram)
 *  [ ] Sliding Window (Longest Substring Without Repeating Characters)
 *  [ ] String Compression / Run-Length Encoding
 *
 * ⚡ JAVASCRIPT CORE / RUNTIME THEORY
 * -----------------------------------
 *  [ ] Closures & Lexical Scope
 *  [ ] Asynchronous Execution & Promise Outputs
 *  [ ] Event Loop, Call Stack & Microtask Queue Order
 *  [ ] Variable & Function Hoisting Edge Cases
 *  [ ] Execution Context & `this` Keyword Binding Rules
 */


/* ============================================================================
 * 2. SYSTEM DESIGN: CACHE STAMPEDE (SINGLEFLIGHT PATTERN)
 * ============================================================================
 *
 * 🚨 THE PROBLEM: Cache Stampede / Thundering Herd Problem
 * --------------------------------------------------------
 * When a high-traffic cache key expires or isn't populated, multiple
 * concurrent incoming requests hit the cache miss simultaneously.
 *
 *  Request 1 ──┐
 *  Request 2 ──┼──> [ Cache Miss ] ──> 5x Concurrent DB Queries (Database Crash 💥)
 *  Request 3 ──┘
 *
 * ❌ WRONG APPROACH (Naïve Cache Check):
 *   Every request checks Redis independently, sees a miss, and fires a DB query.
 *
 * 💡 INTERVIEWER MINDSET SWITCH:
 *   Don't ask: "Is the data in Redis?"
 *   Ask:       "Is someone else ALREADY fetching this data?"
 *
 * ✅ CORRECT APPROACH: Request Coalescing (In-flight Promise Sharing)
 *   If a database fetch is already in progress, reuse the existing Promise.
 *
 *  Request 1 ──> [ DB Query Started ] ──> Returns Promise 1 ──┐
 *  Request 2 ───────────────────────────> Waits on Promise 1 ┼──> 1 DB Query total!
 *  Request 3 ───────────────────────────> Waits on Promise 1 ──┘
 */

// Memory store for shared in-flight promises (Process-Level Singleflight)
let loadingPromise = null;

/**
 * Fetches user data using Request Coalescing to prevent cache stampedes.
 * Includes robust `try...finally` error handling to prevent stuck promises.
 */
async function getUserData(){
  // Step 1: Attempt to read from primary cache
  const cachedData = await redis.get("users");
  if (cachedData) {
    return cachedData;
  }

  // Step 2: Request Coalescing - If an identical fetch is in-flight, return its Promise
  if (loadingPromise) {
    return loadingPromise;
  }

  // Step 3: Initiate the fetch and store the active Promise reference
  loadingPromise = (async () => {
    try {
      const dbData = await fetchDb();

      // Populate cache for subsequent requests
      await redis.set("users", dbData, "EX", 300); // 5 min TTL

      return dbData;
    } finally {
      // CRITICAL: Always reset the promise in finally block!
      // Prevents failed requests from caching rejected promises indefinitely.
      loadingPromise = null;
    }
  })();

  return loadingPromise;
}


/* ============================================================================
 * 3. SENIOR FOLLOW-UP: SINGLE-NODE VS DISTRIBUTED SYSTEMS
 * ============================================================================
 *
 * ❓ Interviewer Question:
 * "In-flight promises work on a single Node.js instance. What happens if you
 *  have 10 server instances behind a load balancer?"
 *
 * 💡 Senior Level Answer:
 *  1. In-flight promises (Singleflight) reduce DB load per instance (e.g., 100 requests -> 10 DB hits across 10 pods).
 *  2. To achieve EXACTLY 1 DB query across distributed servers, pair this with
 *     a Distributed Lock (e.g., Redis Redlock / `SET key value NX PX 5000`).
 *  3. Only the instance acquiring the lock queries the DB; the other instances wait
 *     or poll Redis.
 */


/* ============================================================================
 * SECTION 4: CODE WALKTHROUGH & SIMULATION
 * ============================================================================
 *
 * What happens when 5 users hit the API at the exact same millisecond:
 *
 * Timeline:
 * T = 0ms    │ Req 1 arrives -> Redis Miss -> loadingPromise = null -> Starts DB query -> loadingPromise = Promise<Pending>
 * T = 5ms    │ Req 2 arrives -> Redis Miss -> loadingPromise EXISTS -> Reuses loadingPromise
 * T = 10ms   │ Req 3 arrives -> Redis Miss -> loadingPromise EXISTS -> Reuses loadingPromise
 * T = 15ms   │ Req 4 arrives -> Redis Miss -> loadingPromise EXISTS -> Reuses loadingPromise
 * T = 20ms   │ Req 5 arrives -> Redis Miss -> loadingPromise EXISTS -> Reuses loadingPromise
 *            │
 * T = 2000ms │ DB Query completes!
 *            │  1. Redis cache updated
 *            │  2. loadingPromise reset to null in finally block
 *            │  3. Promise resolves -> ALL 5 requests return data simultaneously from 1 DB hit!
 */

async function runSimulation() {
  console.log("\n==================================================");
  console.log("SIMULATING CONCURRENT REQUESTS (5 Hits at once)");
  console.log("==================================================\n");

  // Fire 5 requests simultaneously
  const results = await Promise.all([
    fixedDbData(),
    fixedDbData(),
    fixedDbData(),
    fixedDbData(),
    fixedDbData()
  ]);

  console.log("\n✅ All 5 requests completed successfully!");
  console.log("Result payload count:", results.length);
}

// Execute simulation
runSimulation();


/* ============================================================================
 * SECTION 5: HOW TO EXPLAIN THIS IN AN INTERVIEW
 * ============================================================================
 *
 * Question: "How did you fix this heavy query concurrency issue at the code level?"
 *
 * Answer:
 * "The original implementation suffered from a Cache Stampede (Thundering Herd problem).
 *  When traffic hit the endpoint before Redis was populated, every request fired an
 *  independent 2-second database query simultaneously.
 *
 *  I resolved this strictly at the runtime level using Request Coalescing (In-flight Promise Sharing):
 *
 *  1. I created a `loadingPromise` variable at module scope.
 *  2. When Request 1 hits a cache miss, it creates the DB fetch Promise and assigns it to `loadingPromise`.
 *  3. Concurrent Requests 2 through N detect that `loadingPromise` is active and immediately return that
 *     same pending Promise.
 *  4. When the database responds 2 seconds later, all N requests resolve simultaneously using a SINGLE
 *     database call instead of N calls.
 *  5. I wrapped the operation in a `try...finally` block to guarantee `loadingPromise` resets to `null`,
 *     preventing stuck promises if an error occurs."
 */
