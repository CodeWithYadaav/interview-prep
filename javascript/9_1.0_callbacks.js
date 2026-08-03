/**
 * ============================================================================
 * CHEAT SHEET: Callbacks, Callback Hell & Modern Fixes
 * ============================================================================
 *
 * GOLDEN RULE:
 *  - Callback       -> A function passed into another function to run after an async task completes.
 *  - Callback Hell  -> Deeply nested callbacks (Pyramid of Doom) that make code unreadable and fragile.
 *  - The Solution   -> Convert Callbacks to Promises, then consume with `async/await`.
 */

/* ============================================================================
 * 1. CALLBACK BASICS
 * ============================================================================
 */

// A function receiving another function as an argument
function fetchData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: 'John Doe' };
    callback(data); // Invoking callback with retrieved data
  }, 1000);
}

// Consuming the callback
fetchData((data) => {
  console.log('Data received:', data);
});


/* ============================================================================
 * 2. THE PROBLEM: CALLBACK HELL (Pyramid of Doom)
 * ============================================================================
 * Sequentially executing dependent async tasks leads to deeply nested indentations.
 */

function step1(cb) { setTimeout(() => { console.log('Step 1 Done'); cb(); }, 1000); }
function step2(cb) { setTimeout(() => { console.log('Step 2 Done'); cb(); }, 1000); }
function step3(cb) { setTimeout(() => { console.log('Step 3 Done'); cb(); }, 1000); }

// ❌ CALLBACK HELL: Hard to read, maintain, or handle errors
step1(() => {
  step2(() => {
    step3(() => {
      console.log('All steps completed');
    });
  });
});


/* ============================================================================
 * 3. FIX #1: PROMISE CHAINING (Flattening the Pyramid)
 * ============================================================================
 * Wrap async tasks in Promises to flatten structure from nested to sequential.
 */

const runStep = (stepName) => new Promise((resolve) => {
  setTimeout(() => {
    console.log(`${stepName} Done`);
    resolve();
  }, 1000);
});

// ✅ PROMISE CHAIN: Flat structure, centralized error handling
runStep('Step 1')
  .then(() => runStep('Step 2'))
  .then(() => runStep('Step 3'))
  .then(() => console.log('All steps completed'))
  .catch((err) => console.error('Error occurred:', err));


/* ============================================================================
 * 4. FIX #2: ASYNC / AWAIT (Modern Standard)
 * ============================================================================
 * Makes asynchronous code look and behave like synchronous code.
 */

async function executeSteps() {
  try {
    await runStep('Step 1');
    await runStep('Step 2');
    await runStep('Step 3');
    console.log('All steps completed');
  } catch (err) {
    console.error('Error occurred:', err);
  }
}

executeSteps();


/* ============================================================================
 * 5. QUICK COMPARISON MATRIX
 * ============================================================================
 *
 * | Approach      | Readability | Error Handling             | Flow Style       |
 * |---------------|-------------|----------------------------|------------------|
 * | Callbacks     | Poor (Nested)| Boilerplate in every level | Pyramid / Nested |
 * | Promises      | Medium      | Unified `.catch()` block   | Chained `.then()`|
 * | Async/Await   | Excellent   | Standard `try...catch`     | Linear / Sync    |
 */


/* ============================================================================
 * 6. TOP INTERVIEW QUESTIONS & QUICK ANSWERS
 * ============================================================================
 *
 * Q1: What is Callback Hell and why is it bad?
 * A: Deeply nested callbacks forming a triangular "Pyramid of Doom." It hurts
 *    readability, makes error handling fragmented, and complicates debugging.
 *
 * Q2: What is the "Inversion of Control" issue with callbacks?
 * A: When you pass a callback to a third-party library, you hand over control
 *    of execution (it might execute twice, never execute, or swallow errors).
 *    Promises fix this by giving control back to the caller.
 *
 * Q3: How do you convert a callback-based API to a Promise (Promisification)?
 * A: Wrap the callback-based function inside `new Promise((resolve, reject) => { ... })`.
 *
 * Q4: What is Error-First Callback syntax (Node.js style)?
 * A: The convention where the first parameter of a callback is reserved for
 *    an error object `(err, data) => { if (err) { ... } }`.
 */


//   Callback Hell
// Callback hell refers to a situation where multiple nested callbacks are used, leading to code that is difficult to read and maintain.
//  This often occurs when dealing with multiple asynchronous operations that depend on each other.


function firstFunction(callback) {
  setTimeout(() => {
    console.log('First function completed');
    callback();
  }, 1000);
}

function secondFunction(callback) {
  setTimeout(() => {
    console.log('Second function completed');
    callback();
  }, 1000);
}

function thirdFunction(callback) {
  setTimeout(() => {
    console.log('Third function completed');
    callback();
  }, 1000);
}

// Callback Hell
firstFunction(() => {
  secondFunction(() => {
    thirdFunction(() => {
      console.log('All functions completed');
    });
  });
});
