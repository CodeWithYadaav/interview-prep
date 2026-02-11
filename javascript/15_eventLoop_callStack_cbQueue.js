// ════════════════════════════════════════════════════════════════════════════════════
// JAVASCRIPT EVENT LOOP, CALLSTACK, MICROTASK & MACROTASK QUEUES (INTERVIEW POV)
// ════════════════════════════════════════════════════════════════════════════════════
//
// Use this file to VISUALIZE what actually happens when JS runs.
//
// Single‑threaded rule:
// - One call stack, one thing executes at a time.
// - Async is simulated using:
//     Web APIs / Node APIs  →   Task Queues  →   Event Loop  →   Call Stack
//
// dia: Simple mental picture (like common blog diagrams)
// ┌─────────────────────────────────────────────────────────────────────────────┐
// │                             JS (single thread)                             │
// │                                                                             │
// │   ┌───────────────┐          ┌───────────────┐          ┌────────────────┐ │
// │   │   Call Stack  │   ───▶   │    Web APIs   │   ───▶   │ Callback Queue │ │
// │   │  (main(),     │          │ (setTimeout,  │          │ (tasks waiting │ │
// │   │   functions)  │          │  DOM, fetch)  │          │  to run)       │ │
// │   └───────────────┘          └───────────────┘          └────────────────┘ │
// │             ▲                                                │             │
// │             └───────────────── Event Loop ───────────────────┘             │
// │                                                                             │
// │   - Call stack runs your JS line by line.                                   │
// │   - Async work is handed to Web APIs.                                       │
// │   - When async finishes, callbacks go into the Callback Queue.              │
// │   - Event Loop moves a callback to the Call Stack when the stack is empty.  │
// └─────────────────────────────────────────────────────────────────────────────┘
//
// Microtask Queue  (a.k.a. Job Queue)   → Higher priority
//   - Promise.then / catch / finally
//   - MutationObserver
//
// Macrotask Queue (a.k.a. Callback Queue / Task Queue)
//   - setTimeout / setInterval
//   - setImmediate (Node)
//   - I/O callbacks, DOM events, messageChannel, etc.
//
// EVENT LOOP RULE:
// - When the call stack is EMPTY:
//     1. Run ALL microtasks in the microtask queue (until it’s empty).
//     2. Then take ONE macrotask from macrotask queue and run it.
// - Repeat forever.
//
// INTERVIEW TIP:
// - Always talk about ORDER:  Call Stack  → Microtasks  → Macrotasks.
// - Mention that too many microtasks can starve macrotasks.


// (You can extend this later with a separate Microtask/Promise queue if needed.)

console.log("\n=== 1. CALL STACK (SYNCHRONOUS CODE) ===");

function first() {
  console.log("first: start");
  second();
  console.log("first: end");
}

function second() {
  console.log("second: inside");
}

first();

// Call stack diagram for above:
//
// 1) first() is called
//    STACK: [ first ]
// 2) first() calls second()
//    STACK: [ first, second ]
// 3) second finishes (pops)
//    STACK: [ first ]
// 4) first finishes (pops)
//    STACK: [ ]
//
// One thing at a time. No async involved yet.

// ════════════════════════════════════════════════════════════════════════════════════
// 2. BASIC EVENT LOOP WITH setTimeout (MACROTASK)
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 2. EVENT LOOP WITH MACROTASK (setTimeout) ===");

console.log("A: start");

setTimeout(() => {
  console.log("C: inside setTimeout (macrotask)");
}, 0);

console.log("B: end");

// Expected output order:
//   A: start
//   B: end
//   C: inside setTimeout (macrotask)
//
// DIAGRAM (very simplified):
//
// 1) JS executes top‑to‑bottom:
//      - logs "A: start"
//      - registers setTimeout with Web API
//      - logs "B: end"
//
// 2) After 0ms, Web API pushes callback into MACROTASK QUEUE.
//
// 3) Event loop sees:
//      - Call stack empty? YES
//      - Any microtasks? (none here)
//      - Take ONE macrotask (our timeout) → push callback to call stack → run it.

// ════════════════════════════════════════════════════════════════════════════════════
// 3. MICROTASK vs MACROTASK ORDER (Promises vs setTimeout)
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 3. MICROTASK (Promise) vs MACROTASK (setTimeout) ===");

console.log("1: script start");

setTimeout(() => {
  console.log("4: setTimeout (macrotask)");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("3: Promise.then (microtask)");
  });

console.log("2: script end");

// Execution order explanation:
//
// 1) "1: script start"      (normal sync)
// 2) "2: script end"        (normal sync)
//
//   After main script finishes, call stack is empty.
//   Event loop steps:
//   - Microtask queue: has Promise.then → run it → "3: Promise.then (microtask)"
//   - Macrotask queue: has setTimeout   → then run it → "4: setTimeout (macrotask)"
//
// FINAL OUTPUT:
//   1: script start
//   2: script end
//   3: Promise.then (microtask)
//   4: setTimeout (macrotask)
//
// INTERVIEW LINE:
// - "Even if setTimeout has 0ms delay, Promise microtasks always run first
//    once the current call stack is empty."

// ════════════════════════════════════════════════════════════════════════════════════
// 4. MICROTASK LOOP (HOW MICROTASKS CAN STARVE MACROTASKS)
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 4. MICROTASK LOOP (starving macrotasks) ===");

let microtaskCounter = 0;

function scheduleMicrotask() {
  if (microtaskCounter >= 3) return; // avoid infinite loop in this demo

  microtaskCounter++;
  Promise.resolve().then(() => {
    console.log("Microtask run:", microtaskCounter);
    scheduleMicrotask(); // schedule next microtask inside microtask
  });
}

setTimeout(() => {
  console.log("Macrotask from setTimeout");
}, 0);

scheduleMicrotask();

// Here the flow is:
// - Main script schedules:
//     • some microtasks (via Promise)
//     • one macrotask (setTimeout)
// - When call stack is empty:
//     1) Run ALL microtasks (they keep adding more until limit is hit).
//     2) Only AFTER microtask queue is empty, run macrotask (setTimeout).
//
// INTERVIEW POINT:
// - Explain that if you keep adding microtasks inside microtasks, you can delay
//   timers and I/O because macrotasks run only after microtasks are drained.

// ════════════════════════════════════════════════════════════════════════════════════
// 5. HLD DIAGRAM – EVENT LOOP + CALL STACK + QUEUES
// ════════════════════════════════════════════════════════════════════════════════════
//
// High Level Design you can draw in interviews (like a box‑and‑arrow diagram):
//
//   ┌───────────────┐        ┌───────────────┐        ┌──────────────────────────────┐
//   │   JS          │        │   Web APIs    │        │            QUEUES            │
//   │  Call Stack   │  ───▶  │ (browser/Node)│  ───▶  │  ┌────────────────────────┐  │
//   │               │        │               │        │  │ Callback Queue         │  │
//   │ main()        │        │ setTimeout    │        │  │ (Macrotask, low prio)  │  │
//   │ logger("a")   │        │ DOM events    │        │  └────────────────────────┘  │
//   │ console.log() │        │ fetch / I/O   │        │  ┌────────────────────────┐  │
//   └───────────────┘        └───────────────┘        │  │ Microtask / Priority   │  │
//                                                     │  │ Queue (high prio)      │  │
//                                                     │  │ Promises, observers…   │  │
//                                                     │  └────────────────────────┘  │
//                                                     └──────────────────────────────┘
//                                    ▲
//                                    │
//                              ┌───────────┐
//                              │ Event     │
//                              │  Loop     │
//                              └───────────┘
//
// FLOW (HLD):
// 1) JS executes code on the CALL STACK.
// 2) Async APIs (setTimeout, DOM, fetch…) hand work to WEB APIs.
// 3) When work finishes, callbacks go into:
//      - MICROTASK / PRIORITY QUEUE  → Promise.then, MutationObserver (HIGH priority)
//      - CALLBACK QUEUE / MACROTASK  → setTimeout, setInterval, I/O, DOM events
// 4) EVENT LOOP:
//      - If call stack is empty:
//          a) Run ALL microtasks from priority queue.
//          b) Then take ONE macrotask from callback queue and run it on stack.
//
// If you can reproduce this HLD diagram and narrate these 4 steps, you cover
// almost every common event‑loop interview question (including micro vs macrotask).

