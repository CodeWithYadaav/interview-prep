/**
 * ============================================================================
 * CHEAT SHEET: Lexical Scoping & Closures in JavaScript
 * ============================================================================
 *
 * MENTAL MODEL:
 *  - Lexical Scope -> WHERE a function is written determines what variables it can see.
 *  - Scope Chain   -> The lookup path (Local -> Outer -> Global).
 *  - Closure       -> Inner function + its "backpack" of outer variables, remembered
 *                     even AFTER the outer function has finished executing.
 */

/* ============================================================================
 * 1. LEXICAL SCOPE & SCOPE CHAIN
 * ============================================================================
 */

const globalVar = "Global";

function outer() {
  const outerVar = "Outer";

  function inner() {
    const innerVar = "Inner";

    // Lookups move UP the chain: local -> outer -> global
    console.log(innerVar, outerVar, globalVar); // ✅ Accessible
  }

  inner();
  // console.log(innerVar); // ❌ Error: Outer scope cannot look DOWN into inner scope
}


/* ============================================================================
 * 2. WHAT IS A CLOSURE?
 * ============================================================================
 */

function makeGreeter(greeting) {
  // `greeting` stays preserved in the returned function's closure scope
  return function(name) {
    console.log(`${greeting}, ${name}!`);
  };
}

const sayHello = makeGreeter("Hello");
sayHello("Praveen"); // Output: "Hello, Praveen!" (outer func already returned!)


/* ============================================================================
 * 3. PRACTICAL CLOSURE PATTERNS
 * ============================================================================
 */

// A. Data Encapsulation (Private Variables)
function createCounter() {
  let count = 0; // Truly private: inaccessible from outside

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount:  () => count
  };
}
const counter = createCounter();
counter.increment(); // 1
// counter.count;     // undefined (protected)


// B. Function Factory
const createMultiplier = (factor) => (num) => num * factor;
const double = createMultiplier(2);
const triple = createMultiplier(3);
double(5); // 10
triple(5); // 15


// C. Module Pattern (IIFE + Closures)
const Calculator = (() => {
  let result = 0; // Private state

  return {
    add(n)      { result += n; return this; }, // Method chaining
    subtract(n) { result -= n; return this; },
    getVal()    { return result; }
  };
})();
Calculator.add(10).subtract(3).getVal(); // 7


// D. Memoization (Caching Results)
function memoize(fn) {
  const cache = {}; // Preserved across calls via closure
  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) return cache[key];
    return (cache[key] = fn(...args));
  };
}


/* ============================================================================
 * 4. COMMON PITFALLS & SOLUTIONS
 * ============================================================================
 */

// PITFALL: 'var' in asynchronous loops
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Prints: 3, 3, 3 (Shared 'i' reference)
}

// SOLUTION 1: Use 'let' (creates a fresh binding per iteration)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Prints: 0, 1, 2
}

// SOLUTION 2: IIFE (creates a explicit inner closure scope)
for (var i = 0; i < 3; i++) {
  ((index) => {
    setTimeout(() => console.log(index), 100); // Prints: 0, 1, 2
  })(i);
}


/* ============================================================================
 * 5. QUICK COMPARISON MATRIX
 * ============================================================================
 *
 * | Concept          | Core Definition                                      |
 * |------------------|------------------------------------------------------|
 * | Lexical Scope    | Static access rules fixed at write-time.             |
 * | Scope Chain      | Bottom-up lookup trajectory for identifier resolution|
 * | Closure          | Retained access to outer scope after execution ends. |
 * | Shadowing        | Inner scope variable redeclaring outer scope name.   |
 */


/* ============================================================================
 * 6. TOP INTERVIEW QUESTIONS & QUICK ANSWERS
 * ============================================================================
 *
 * Q1: What is the main difference between Scope and Closure?
 * A: Scope defines variable accessibility rules at compile/write time.
 *    Closure is the runtime mechanism where an inner function retains
 *    access to its outer lexical scope even when invoked outside it.
 *
 * Q2: Can closures lead to memory issues?
 * A: Yes. Unhandled closures prevent garbage collection of captured
 *    variables, potentially causing memory leaks if tied to long-lived objects.
 *
 * Q3: How do you achieve true private properties in JS using closures?
 * A: Declare variables inside an outer function and expose only inner accessor
 *    functions (getters/setters). Outside code cannot modify them directly.
 *
 * Q4: What is variable shadowing?
 * A: When a variable declared inside an inner scope shares the exact same name
 *    as a variable in an outer scope, temporarily overriding access to it.
 */
