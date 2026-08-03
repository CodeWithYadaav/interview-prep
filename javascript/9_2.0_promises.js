/**
 * ============================================================================
 * CHEAT SHEET: Asynchronous JS (Callbacks, Promises, Combinators, Async/Await)
 * ============================================================================
 *
 * EXECUTION ORDER RULE:
 *  1. Synchronous Code (Call Stack)  -> Executes line-by-line immediately.
 *  2. Microtask Queue (Promises/async) -> Executes after current sync stack empties.
 *  3. Macrotask Queue (setTimeout/I/O) -> Executes after microtasks clear.
 */

/* ============================================================================
 * 1. SYNC VS ASYNC & THE CALLBACK SOLUTION
 * ============================================================================
 */

// ❌ PROBLEM: Async operation without a callback returns `undefined` synchronously
console.log("start");
function importantActionsAsync(username) {
  setTimeout(() => {
    return `Welcome to world! ${username}`;
  }, 1000);
}
const messageAsync = importantActionsAsync("praveen");
console.log(messageAsync); // Output: undefined
console.log("end");


// ✅ SOLUTION: Use a Callback function to receive data when ready
console.log("start");
function importantActions(username, cb) {
  setTimeout(() => {
    cb(`Welcome to world! ${username}`);
  }, 1000);
}
importantActions("praveen", function (message) {
  console.log(message); // Output (after 1s): "Welcome to world! praveen"
});
console.log("End");


/* ============================================================================
 * 2. CALLBACK HELL (Pyramid of Doom)
 * ============================================================================
 * Deeply nested callbacks make code hard to scale, read, and maintain.
 */

function likeTheVideo(video, cb) {
  setTimeout(() => cb(`like the video ${video}`), 1000);
}
function shareTheVideo(video, cb) {
  setTimeout(() => cb(`Share the video ${video}`), 1000);
}

// ❌ CALLBACK HELL STRUCTURE:
console.log("start");
importantActions("praveen", function (message) {
  console.log(message);
  likeTheVideo("JS Interview Que", (action) => {
    console.log(action);
    shareTheVideo("Praveen yadav codes", (action) => {
      console.log(`Share the video ${action}`);
      shareTheVideo("Praveen yadav codes", (action) => {
        console.log(`Share the video ${action}`);
        shareTheVideo("Praveen yadav codes", (action) => {
          console.log(`Share the video ${action}`);
        });
      });
    });
  });
});
console.log("End");


/* ============================================================================
 * 3. PROMISES & PROMISE CHAINING
 * ============================================================================
 * Promises resolve callback hell by flattening nested calls into `.then()` chains.
 */

// Basic Promise Structure
const sub = new Promise((resolve, reject) => {
  setTimeout(() => {
    let res = true;
    if (res) resolve("Welcome to the world!");
    else reject(new Error("Not resolved the promise"));
  }, 1000);
});

sub.then((res) => console.log(res))
   .catch((err) => console.log(err.message));


// Promisified Helper Functions
function importantActionsPromise(username) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Welcome to world! ${username}`), 500);
  });
}
function likeTheVideoPromise(video) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Like the video ${video}`), 1000);
  });
}
function shareTheVideoPromise(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(`Share the video! ${video}`), 1000);
  });
}

// ❌ Bad Promise Usage (Recreating Pyramid Structure):
importantActionsPromise("praveen yadav").then((res) => {
  console.log(res);
  likeTheVideoPromise("JS Interview que").then((res) => {
    console.log(res);
    shareTheVideoPromise("share Interview").then((res) => {
      console.log(res);
    });
  });
});

// ✅ Good Promise Usage (Flat Promise Chaining):
importantActionsPromise("praveen yadav")
  .then((res) => {
    console.log(res);
    return likeTheVideoPromise("JS Interview Que");
  })
  .then((res) => {
    console.log(res);
    return shareTheVideoPromise("share Interview");
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err.message);
  });


/* ============================================================================
 * 4. PROMISE COMBINATORS (Parallel Execution)
 * ============================================================================
 * Used to run multiple promises concurrently.
 */

function pSuccess(msg, delay) {
  return new Promise((resolve) => setTimeout(() => resolve(msg), delay));
}
function pFail(msg, delay) {
  return new Promise((_, reject) => setTimeout(() => reject(msg), delay));
}

// 1. Promise.all
// Runs promises in parallel. Resolves with array of results when ALL succeed.
// Rejects immediately if ANY promise fails.
Promise.all([
  importantActionsPromise("praveen yadav"),
  likeTheVideoPromise("JS Interview que"),
  pFail("Share failed", 1000)
])
  .then((res) => console.log("Promise.all success:", res))
  .catch((err) => console.error("Promise.all error:", err));

// 2. Promise.race
// Returns the result/error of the FIRST promise that settles (fastest wins).
Promise.race([
  importantActionsPromise("praveen yadav"), // 500ms (fastest)
  likeTheVideoPromise("JS Interview que")  // 1000ms
])
  .then((res) => console.log("Promise.race result:", res))
  .catch((err) => console.error("Promise.race error:", err));

// 3. Promise.allSettled
// Runs all promises and returns an array of objects showing the status
// ({status: "fulfilled", value: ...} or {status: "rejected", reason: ...}) of EVERY promise.
Promise.allSettled([
  importantActionsPromise("praveen yadav"),
  likeTheVideoPromise("JS Interview que"),
  pFail("Share failed", 1000)
])
  .then((res) => console.log("Promise.allSettled result:", res));

// 4. Promise.any
// Returns the FIRST resolved promise (ignores rejections).
// Rejects with an AggregateError only if ALL promises fail.
Promise.any([
  pFail("Failed 1", 200),
  importantActionsPromise("praveen yadav"), // First to fulfill
  likeTheVideoPromise("JS Interview que")
])
  .then((res) => console.log("Promise.any result:", res))
  .catch((err) => console.error("Promise.any error:", err));


/* ============================================================================
 * 5. ASYNC / AWAIT (Modern Clean Alternative)
 * ============================================================================
 * Syntactic sugar on top of Promises; eliminates `.then()` chains entirely.
 */

const executeAsyncSequence = async () => {
  try {
    const message1 = await importantActionsPromise("praveen");
    const message2 = await likeTheVideoPromise("JS Interview Que");
    const message3 = await shareTheVideoPromise("Share Interview");
    console.log({ message1, message2, message3 });
  } catch (error) {
    console.log(error.message);
  }
};

executeAsyncSequence();


/* ============================================================================
 * 6. OUTPUT-BASED INTERVIEW QUESTIONS
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// Q1: Sync inside Promise constructor
// ----------------------------------------------------------------------------
console.log("start");
const promise1 = new Promise((resolve, reject) => {
  console.log(1); // Executed synchronously when Promise is instantiated!
  resolve(2);
});
promise1.then((res) => {
  console.log(res); // Async Microtask
});
console.log("end");

/*
 * 🎯 Output:
 * start
 * 1
 * end
 * 2
 *
 * 💡 Reason: The executor function inside `new Promise(...)` runs SYNCHRONOUSLY immediately.
 *            The `.then()` callback is queued as a microtask and runs after sync execution ends.
 */


// ----------------------------------------------------------------------------
// Q2: Code after resolve() inside Promise constructor
// ----------------------------------------------------------------------------
console.log("start");
const promise2 = new Promise((resolve, reject) => {
  console.log(1);
  resolve(2);
  console.log(3); // Sync code continues executing even after resolve()!
});
promise2.then((res) => {
  console.log(res);
});
console.log("end");

/*
 * 🎯 Output:
 * start
 * 1
 * 3
 * end
 * 2
 *
 * 💡 Reason: `resolve(2)` changes promise state but does NOT halt function execution.
 *            `console.log(3)` executes synchronously before the call stack clears.
 */


// ----------------------------------------------------------------------------
// Q3: Function returning a Promise
// ----------------------------------------------------------------------------
console.log("start");
const fn = () => {
  return new Promise((resolve, reject) => {
    console.log(1);
    resolve("success");
  });
};
console.log("middle");
fn().then((res) => {
  console.log(res);
});
console.log("end");

/*
 * 🎯 Output:
 * start
 * middle
 * 1
 * end
 * success
 *
 * 💡 Reason: `fn()` is invoked after "middle", triggering `console.log(1)` synchronously,
 *            and `.then()` executes after "end".
 */


// ----------------------------------------------------------------------------
// Q4: Promise Rejection and Catch Chaining
// ----------------------------------------------------------------------------
function jobRejection() {
  return new Promise((resolve, reject) => {
    reject();
  });
}

let jobPromise = jobRejection();

jobPromise
  .then(function () {
    console.log("Success 1");
  })
  .then(function () {
    console.log("Success 2");
  })
  .then(function () {
    console.log("Success 3");
  })
  .catch(function () {
    console.log("Error 1");
  })
  .then(function () {
    console.log("Success 4");
  });

/*
 * 🎯 Output:
 * Error 1
 * Success 4
 *
 * 💡 Reason: The promise rejects immediately, skipping all initial `.then()` handlers
 *            until it reaches `.catch()`. Since `.catch()` doesn't throw or return a rejected
 *            promise, execution continues down to the trailing `.then()` ("Success 4").
 */


// ----------------------------------------------------------------------------
// Q5: Sequential State Resolution
// ----------------------------------------------------------------------------
function jobState(state) {
  return new Promise((resolve, reject) => {
    if (state) {
      resolve("Success");
    } else {
      reject("Error");
    }
  });
}

let statePromise = jobState(true);

statePromise
  .then(function (data) {
    console.log(data); // "Success"
    return jobState(false); // Returns rejected promise
  })
  .catch(function (err) {
    console.log(err); // "Error"
    return "Error handled"; // Returns resolved value string
  })
  .then(function (data) {
    console.log(data); // "Error handled"
    return jobState(true); // Returns resolved promise
  })
  .catch(function (err) {
    console.log(err); // Skipped (no error occurred)
  });

/*
 * 🎯 Output:
 * Success
 * Error
 * Error handled
 *
 * 💡 Breakdown:
 *  1. `jobState(true)` resolves -> prints "Success", returns `jobState(false)` (Rejected).
 *  2. Catches error -> prints "Error", recovers by returning string `"Error handled"` (Resolved).
 *  3. Next `.then()` runs -> prints `"Error handled"`, returns `jobState(true)` (Resolved).
 *  4. Final `.catch()` is skipped because the chain was not in a rejected state.
 */
