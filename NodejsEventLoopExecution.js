/**
 * ============================================================================
 * LESSON: Node.js Event Loop Execution Order
 * TOPIC: Asynchronous Execution, Priority Queues, Phase Mechanics
 * ============================================================================
 *
 * TABLE OF CONTENTS:
 *  1. Fundamental Architecture
 *  2. Non-blocking Asynchronous Flow
 *  3. Event Loop Phases & Callbacks
 *  4. Priority Hierarchy Matrix
 *  5. Comprehensive Code Example & Walkthrough
 *  6. Edge Cases: Timers vs setImmediate & NextTick Starvation
 *  7. Two-Minute Interview Elevator Pitch
 */

/* ============================================================================
 * SECTION 1: Fundamental Architecture
 * ============================================================================
 * Imagine an office structure:
 * - Manager (JS Main Thread): Handles one single task at a time (Single-threaded).
 * - Workers (OS / libuv): Handle background tasks asynchronously (File I/O, Network, Timers).
 * - To-Do Queue (Event Loop): Continuously polls: "Is the main thread free?"
 *
 *                  +-------------------+
 *                  |   JS Main Thread  |
 *                  +---------+---------+
 *                            |
 *                            v
 *                  +-------------------+
 *                  |    Event Loop     |
 *                  +---------+---------+
 *                            |
 *       -----------------------------------------------
 *       |                    |                        |
 *  Timers Queue          I/O Queue               Check Queue
 * (setTimeout, etc.)   (fs.readFile, etc.)     (setImmediate, etc.)
 */


/* ============================================================================
 * SECTION 2: Non-Blocking Asynchronous Flow
 * ============================================================================
 * Synchronous code executes line-by-line on the Call Stack without interruption.
 * Asynchronous APIs delegate their execution to libuv and push callbacks onto queues.
 */

// Example 1: Synchronous Blocking Execution
console.log("A");
console.log("B");
console.log("C");
// Output: A -> B -> C

// Example 2: Non-blocking Timer Execution
console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 3000);

console.log("End");

/**
 * Output:
 *  Start
 *  End
 *  (3 second delay)
 *  Timer
 *
 * Execution Flow:
 *  1. `console.log("Start")` executes immediately on the Call Stack.
 *  2. `setTimeout` registers a 3-second timer with libuv and pops off the stack.
 *  3. `console.log("End")` executes immediately.
 *  4. Call Stack becomes empty.
 *  5. After 3000ms, libuv pushes the callback to the Timers Queue.
 *  6. Event Loop picks up the callback and executes `console.log("Timer")`.
 */


/* ============================================================================
 * SECTION 3: Event Loop Phases & Microtasks
 * ============================================================================
 * Complete Phase Progression (In Order):
 *  1. Timers Phase       : Executes callbacks from setTimeout() and setInterval().
 *  2. Pending Callbacks  : Executes I/O callbacks deferred to the next loop iteration.
 *  3. Idle, Prepare      : Internal node system operations.
 *  4. Poll Phase         : Retrieves new I/O events; executes I/O related callbacks.
 *  5. Check Phase        : Executes setImmediate() callbacks.
 *  6. Close Callbacks    : Executes close events (e.g., socket.on('close')).
 *
 * Callback-to-Queue Mapping:
 * +-----------------------+-----------------------------+
 * | API Target            | Designated Queue / Phase    |
 * +-----------------------+-----------------------------+
 * | setTimeout()          | Timers Phase                |
 * | setInterval()         | Timers Phase                |
 * | setImmediate()        | Check Phase                 |
 * | Promise.then()        | Microtask Queue             |
 * | queueMicrotask()      | Microtask Queue             |
 * | process.nextTick()    | Next Tick Queue (Special)   |
 * +-----------------------+-----------------------------+
 *
 * IMPORTANT:
 * - `process.nextTick` and `Promises` are NOT part of libuv's Event Loop phases.
 * - They are microtask queues managed directly by V8/Node.js and execute
 *   IMMEDIATELY after the current operation finishes, BEFORE the loop moves to the next phase.
 */


/* ============================================================================
 * SECTION 4: Priority Hierarchy Matrix
 * ============================================================================
 * Execution Hierarchy (Highest to Lowest Priority):
 *
 *    1. Synchronous Code       (Call Stack)
 *            |
 *            v
 *    2. process.nextTick()     (NextTick Queue - drained completely first)
 *            |
 *            v
 *    3. Microtasks             (Promises / queueMicrotask - drained completely second)
 *            |
 *            v
 *    4. Timers Phase           (setTimeout / setInterval)
 *            |
 *            v
 *    5. Poll Phase             (I/O Callbacks)
 *            |
 *            v
 *    6. Check Phase            (setImmediate)
 *            |
 *            v
 *    7. Close Callbacks        (socket.on('close'))
 */


/* ============================================================================
 * SECTION 5: Comprehensive Interview Code Challenge
 * ============================================================================
 */

function runInterviewExample() {
  console.log("--- START INTERVIEW EXAMPLE ---");

  console.log("1");

  setTimeout(() => {
    console.log("2");
  }, 0);

  Promise.resolve().then(() => {
    console.log("3");
  });

  process.nextTick(() => {
    console.log("4");
  });

  setImmediate(() => {
    console.log("5");
  });

  console.log("6");
}

/**
 * STEP-BY-STEP EXECUTION TRACE:
 *
 * 1. Synchronous Pass:
 *    - `console.log("1")`          -> Prints "1"
 *    - `setTimeout(..., 0)`        -> Registers callback to Timers Queue [2]
 *    - `Promise.resolve().then()`  -> Registers callback to Microtask Queue [3]
 *    - `process.nextTick()`        -> Registers callback to NextTick Queue [4]
 *    - `setImmediate()`            -> Registers callback to Check Queue [5]
 *    - `console.log("6")`          -> Prints "6"
 *
 * 2. Synchronous Code Complete:
 *    - Call Stack: Empty
 *    - NextTick Queue: [4]
 *    - Microtask Queue: [3]
 *    - Timers Queue: [2]
 *    - Check Queue: [5]
 *
 * 3. Microtask Drain:
 *    - Process NextTick Queue      -> Prints "4"
 *    - Process Promise Microtasks  -> Prints "3"
 *
 * 4. Event Loop Phase Execution:
 *    - Timers Phase                -> Prints "2"
 *    - Check Phase                 -> Prints "5"
 *
 * EXPECTED OUTPUT:
 * 1
 * 6
 * 4
 * 3
 * 2
 * 5
 */


/* ============================================================================
 * SECTION 6: Important Edge Cases
 * ============================================================================
 */

/**
 * CASE A: Top-Level vs. I/O-Bound Scheduling (setImmediate vs. setTimeout)
 *
 * 1. Top-Level Context:
 *    Ordering between `setTimeout(..., 0)` and `setImmediate()` is non-deterministic
 *    because it depends on process performance and execution time.
 *
 * 2. Within I/O Callback Context:
 *    `setImmediate` ALWAYS executes before `setTimeout` when scheduled inside I/O.
 */
function demonstrateIOBehavior() {
  const fs = require("fs");

  // Mocking or executing within I/O scope:
  fs.readFile(__filename, () => {
    setTimeout(() => {
      console.log("I/O Context: timeout");
    }, 0);

    setImmediate(() => {
      console.log("I/O Context: immediate");
    });
  });
  // Why? Inside an I/O callback, the event loop is currently in the POLL phase.
  // The next phase in sequence is CHECK phase (setImmediate), before wrapping
  // around to the TIMERS phase (setTimeout).
}

/**
 * CASE B: Event Loop Starvation with process.nextTick()
 *
 * Node drains the nextTick queue ENTIRELY before moving on to any other phase.
 * Recursively invoking process.nextTick blocks the Event Loop completely.
 */
function simulateStarvation() {
  function starve() {
    process.nextTick(starve); // Recursively queues microtask indefinitely
  }

  // starve(); // UNCOMMENT AT YOUR OWN RISK: Will block all timers and I/O.

  setTimeout(() => {
    console.log("This will never print if starve() is running!");
  }, 0);
}


/* ============================================================================
 * SECTION 7: Interview Elevator Pitch (2-Minute Summary)
 * ============================================================================
 *
 * "Node.js executes synchronous code first on the Call Stack. Once empty,
 * Node handles microtasks BEFORE entering any Event Loop phase:
 *   1. It drains the entire process.nextTick queue.
 *   2. It drains the Promise/queueMicrotask queue.
 *
 * Next, the Event Loop proceeds through its phases in order:
 *   - Timers (setTimeout, setInterval)
 *   - Poll (I/O callbacks)
 *   - Check (setImmediate)
 *   - Close Callbacks
 *
 * Two critical caveats to remember:
 *   1. Top-level `setTimeout(fn, 0)` vs `setImmediate()` execution order is non-deterministic.
 *      However, inside an I/O callback, `setImmediate()` ALWAYS runs first because the loop
 *      moves directly from the Poll phase to the Check phase.
 *   2. Recursive `process.nextTick()` calls can starve the Event Loop, preventing timers
 *      and I/O callbacks from ever running."
 */

// Run example to test execution directly in Node environment:
runInterviewExample();








/**
 * ============================================================================
 * LESSON: Node.js Event Loop Execution Order
 * TOPIC: Asynchronous Execution, Phase Mechanics, & Interview Traps
 * ============================================================================
 *
 * TABLE OF CONTENTS:
 *  1. Fundamental Architecture & Analogy
 *  2. The 6 Official Event Loop Phases (libuv)
 *  3. Microtasks vs Phase Mechanics (Where nextTick/Promise live)
 *  4. Complete Priority Hierarchy Matrix
 *  5. Synchronous vs Non-Blocking Asynchronous Examples
 *  6. Comprehensive Code Example & Walkthrough
 *  7. Important Edge Cases (I/O Order & Starvation)
 *  8. 2-Minute Interview Elevator Pitch
 */

/* ============================================================================
 * SECTION 1: Fundamental Architecture & Analogy
 * ============================================================================
 * Think of Node.js as an efficient office setup:
 * - Manager (JS Main Thread): Single-threaded; processes one task at a time.
 * - Workers (libuv / OS Thread Pool): Handle heavy/background tasks (File I/O, Network, Timers).
 * - To-Do List (Event Loop): A continuous loop polling tasks from workers to hand to the manager.
 *
 *               ┌───────────────────────────┐
 *               │      JS Main Thread       │
 *               │  (Call Stack Execution)   │
 *               └─────────────┬─────────────┘
 *                             │
 *                             v
 *               ┌───────────────────────────┐
 *               │        Event Loop         │
 *               └─────────────┬─────────────┘
 *                             │
 *      ┌──────────────────────┼──────────────────────┐
 *      │                      │                      │
 *      v                      v                      v
 * ┌──────────┐          ┌──────────┐          ┌──────────┐
 * │  Timers  │          │   Poll   │          │  Check   │
 * └──────────┘          └──────────┘          └──────────┘
 */


/* ============================================================================
 * SECTION 2: The 6 Official Event Loop Phases
 * ============================================================================
 * The Node.js Event Loop consists of EXACTLY 6 core phases managed by libuv.
 * (Note: Microtasks like Promises and process.nextTick are NOT event loop
 * phases—they execute between phases).
 *
 * ┌────────────────────────────────────────────────────────────────────────┐
 * │                         THE 6 CORE PHASES                              │
 * └────────────────────────────────────────────────────────────────────────┘
 *
 *    ┌───────────────────────────┐
 * 1. │          TIMERS           │ ──> setTimeout(), setInterval()
 *    └─────────────┬─────────────┘
 *                  │
 *    ┌─────────────v─────────────┐
 * 2. │     PENDING CALLBACKS     │ ──> Deferred I/O callbacks (e.g., TCP errors)
 *    └─────────────┬─────────────┘
 *                  │
 *    ┌─────────────v─────────────┐
 * 3. │       IDLE, PREPARE       │ ──> Used internally by Node; safe to ignore in code
 *    └─────────────┬─────────────┘
 *                  │
 *    ┌─────────────v─────────────┐
 * 4. │           POLL            │ ──> Fetch new I/O events & execute I/O callbacks
 *    └─────────────┬─────────────┘
 *                  │
 *    ┌─────────────v─────────────┐
 * 5. │           CHECK           │ ──> setImmediate() callbacks
 *    └─────────────┬─────────────┘
 *                  │
 *    ┌─────────────v─────────────┐
 * 6. │      CLOSE CALLBACKS      │ ──> socket.on('close', ...) cleanup tasks
 *    └───────────────────────────┘
 *
 * Detailed Phase Definitions:
 * 1. Timers Phase:
 *    Executes callbacks scheduled by setTimeout() and setInterval() once their
 *    threshold time has elapsed.
 *
 * 2. Pending Callbacks Phase:
 *    Executes I/O callbacks deferred from the previous loop iteration (such as
 *    certain TCP error reports like ECONNREFUSED).
 *
 * 3. Idle, Prepare Phase:
 *    Used strictly internally by Node.js for initialization/housekeeping.
 *    Does not process user code.
 *
 * 4. Poll Phase:
 *    Retrieves new I/O events, executes I/O-related callbacks (file systems,
 *    HTTP requests, etc.), and blocks/waits here if no other tasks are pending.
 *
 * 5. Check Phase:
 *    Executes callbacks scheduled specifically by setImmediate().
 *
 * 6. Close Callbacks Phase:
 *    Handles cleanup logic for abruptly closed resources (e.g., socket.on('close')).
 */


/* ============================================================================
 * SECTION 3: Microtasks vs. Event Loop Phases
 * ============================================================================
 * KEY INTERVIEW FACT:
 * Promises (`Promise.then()`) and `process.nextTick()` are NOT part of the
 * libuv event loop phases!
 *
 * - They belong to Microtask Queues managed directly by Node/V8.
 * - Microtask queues are checked and drained IMMEDIATELY after the current
 *   operation completes, BEFORE the Event Loop moves to the next libuv phase.
 *
 * Microtask Queue Hierarchy:
 *  1. NextTick Queue: Holds process.nextTick() callbacks. (Highest priority)
 *  2. Promise Microtask Queue: Holds Promise.then(), queueMicrotask() callbacks.
 */


/* ============================================================================
 * SECTION 4: Complete Priority Hierarchy Matrix
 * ============================================================================
 * Order of Execution (From Highest Priority to Lowest):
 *
 * ┌────────────────────────────────────────────────────────────────────────┐
 * │ 1. Synchronous Code       │ Main Call Stack                            │
 * ├───────────────────────────┼────────────────────────────────────────────┤
 * │ 2. process.nextTick()     │ NextTick Queue (Drained completely first)  │
 * ├───────────────────────────┼────────────────────────────────────────────┤
 * │ 3. Promise Microtasks     │ Microtask Queue (Drained completely second)│
 * ├───────────────────────────┼────────────────────────────────────────────┤
 * │ 4. Timers Phase           │ libuv Phase 1 (setTimeout/setInterval)     │
 * ├───────────────────────────┼────────────────────────────────────────────┤
 * │ 5. Pending Callbacks      │ libuv Phase 2 (Deferred I/O)               │
 * ├───────────────────────────┼────────────────────────────────────────────┤
 * │ 6. Idle, Prepare          │ libuv Phase 3 (Node Internal)              │
 * ├───────────────────────────┼────────────────────────────────────────────┤
 * │ 7. Poll Phase             │ libuv Phase 4 (File/Network I/O)           │
 * ├───────────────────────────┼────────────────────────────────────────────┤
 * │ 8. Check Phase            │ libuv Phase 5 (setImmediate)               │
 * ├───────────────────────────┼────────────────────────────────────────────┤
 * │ 9. Close Callbacks        │ libuv Phase 6 (socket.on('close'))         │
 * └───────────────────────────┴────────────────────────────────────────────┘
 */


/* ============================================================================
 * SECTION 5: Synchronous vs Non-Blocking Asynchronous Examples
 * ============================================================================
 */

// Example A: Synchronous Blocking Execution
console.log("A");
console.log("B");
console.log("C");
// Output: A -> B -> C (Executes line by line on Call Stack)

// Example B: Asynchronous Non-Blocking Execution
console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 3000);

console.log("End");

/**
 * Output:
 *  Start
 *  End
 *  (3 second delay)
 *  Timer
 */


/* ============================================================================
 * SECTION 6: Comprehensive Interview Code Challenge
 * ============================================================================
 */

function runInterviewExample() {
  console.log("--- START INTERVIEW EXAMPLE ---");

  console.log("1");

  setTimeout(() => console.log("2"), 0);

  Promise.resolve().then(() => {
    console.log("3");
  });

  process.nextTick(() => {
    console.log("4");
  });

  setImmediate(() => {
    console.log("5");
  });

  console.log("6");
}

/**
 * STEP-BY-STEP TRACE:
 *
 * 1. Synchronous Pass:
 *    - `console.log("1")`          -> Prints "1"
 *    - `setTimeout(..., 0)`        -> Pushed to Timers Phase Queue
 *    - `Promise.resolve().then()`  -> Pushed to Promise Microtask Queue
 *    - `process.nextTick()`        -> Pushed to nextTick Queue
 *    - `setImmediate()`            -> Pushed to Check Phase Queue
 *    - `console.log("6")`          -> Prints "6"
 *
 * 2. Drain Microtasks (Before Event Loop starts phases):
 *    - process.nextTick Queue      -> Prints "4"
 *    - Promise Microtask Queue     -> Prints "3"
 *
 * 3. Event Loop Phase Execution:
 *    - Phase 1 (Timers Phase)      -> Prints "2"
 *    - Phase 5 (Check Phase)       -> Prints "5"
 *
 * EXPECTED OUTPUT:
 * 1
 * 6
 * 4
 * 3
 * 2
 * 5
 */


/* ============================================================================
 * SECTION 7: Important Edge Cases
 * ============================================================================
 */

/**
 * EDGE CASE A: Top-Level vs I/O Context (setImmediate vs setTimeout)
 *
 * Scenario 1: Top-Level Execution
 * Ordering between setTimeout(fn, 0) and setImmediate() is non-deterministic
 * because CPU tick timing varies.
 *
 * Scenario 2: Inside an I/O Callback (fs.readFile, TCP socket, etc.)
 * setImmediate ALWAYS runs before setTimeout(fn, 0).
 */
function demonstrateIOBehavior() {
  const fs = require("fs");

  fs.readFile(__filename, () => {
    setTimeout(() => {
      console.log("I/O Context: timeout");
    }, 0);

    setImmediate(() => {
      console.log("I/O Context: immediate");
    });
  });
  // Why? Inside an I/O callback, the loop is currently in the POLL phase.
  // The next phase immediately following POLL is CHECK (setImmediate),
  // before looping back around to TIMERS (setTimeout).
}

/**
 * EDGE CASE B: Process.nextTick Starvation
 *
 * Because Node drains the nextTick queue entirely before moving into event loop phases,
 * recursive nextTick calls will freeze the event loop completely.
 */
function simulateStarvation() {
  function starve() {
    process.nextTick(starve); // Recursively queues microtask
  }

  // starve(); // DO NOT UNCOMMENT IN PRODUCTION: Starves Timers and I/O completely.

  setTimeout(() => {
    console.log("This will never run if starve() is active!");
  }, 0);
}


/* ============================================================================
 * SECTION 8: Interview Elevator Pitch (2-Minute Summary)
 * ============================================================================
 *
 * "The Node.js event loop is managed by libuv and consists of 6 core phases:
 *  1. Timers (setTimeout/setInterval)
 *  2. Pending Callbacks (deferred I/O)
 *  3. Idle/Prepare (internal Node operations)
 *  4. Poll (fetches I/O events and executes callbacks)
 *  5. Check (setImmediate)
 *  6. Close Callbacks (resource cleanup like sockets)
 *
 * Crucially, microtasks—like process.nextTick and Promise.then—are NOT event
 * loop phases. They live in microtask queues that execute immediately after
 * synchronous code or the current phase finishes. process.nextTick always
 * takes priority over Promises.
 *
 * Two edge cases interviewers love:
 *  1. Inside an I/O callback, setImmediate always runs before setTimeout(0)
 *     because the loop moves directly from Poll phase to Check phase.
 *  2. Recursive process.nextTick calls can starve the event loop, preventing
 *     timers and I/O from ever executing."
 */

// Run example to verify:
runInterviewExample();
