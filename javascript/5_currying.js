/**
 * ============================================================================
 * CHEAT SHEET: Currying in JavaScript
 * ============================================================================
 *
 * GOLDEN RULE:
 *  - Currying: Transforms `f(a, b, c)` into `f(a)(b)(c)`.
 *    Takes ONE argument at a time and returns a function for the next argument.
 *
 * MENTAL MODEL:
 *  - Sandwich metaphor: Instead of eating a whole sandwich at once `f(bread, meat, cheese)`,
 *    currying takes one bite at a time `f(bread)(meat)(cheese)`.
 */

/* ============================================================================
 * 1. BASIC SYNTAX & ARROW FUNCTIONS
 * ============================================================================
 */

// Normal Function
function normalAdd(a, b) {
  return a + b;
}

// Curried Function (Standard vs Arrow)
function curriedAdd(a) {
  return function (b) {
    return a + b;
  };
}

const curriedAddArrow = a => b => a + b;

curriedAdd(5)(3);       // 8
curriedAddArrow(5)(3);  // 8

// Partial Application: Reusing intermediate functions
const addFive = curriedAdd(5);
addFive(3);  // 8
addFive(10); // 15


/* ============================================================================
 * 2. INFINITE CURRYING
 * ============================================================================
 * Keeps accepting arguments until called with empty parentheses `()`.
 */

function add(a) {
  return function (b) {
    if (b !== undefined) {
      return add(a + b); // Accumulate and recurse
    }
    return a; // Return final sum on empty invocation
  };
}

add(1)(2)();           // 3
add(1)(2)(3)(4)();     // 10
add(5)(10)(15)(20)();  // 50


/* ============================================================================
 * 3. IMPLEMENT A GENERIC CURRY WRAPPER (Interview Classic)
 * ============================================================================
 * Converts any standard function `f(a, b, c)` into a curried version.
 */

function curry(fn) {
  return function curried(...args) {
    // If enough args provided, execute original function
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    // Otherwise, return function that collects remaining args
    return function (...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}

// Usage:
function volume(l, w, h) {
  return l * w * h;
}
const curriedVolume = curry(volume);

curriedVolume(2, 3, 4);   // 24 (All at once)
curriedVolume(2)(3)(4);    // 24 (One by one)
curriedVolume(2, 3)(4);    // 24 (Mixed)


/* ============================================================================
 * 4. PRACTICAL EVALUATE CALCULATOR
 * ============================================================================
 */

const evaluate = operation => a => b => {
  switch (operation) {
    case 'sum':      return a + b;
    case 'multiply': return a * b;
    case 'divide':   return a / b;
    case 'subtract': return a - b;
    default:         return "Invalid operation";
  }
};

evaluate('sum')(4)(2);      // 6
evaluate('multiply')(4)(2); // 8

// Create specialized operation functions
const sumCalc = evaluate('sum');
sumCalc(10)(5); // 15


/* ============================================================================
 * 5. REAL-WORLD USE CASES
 * ============================================================================
 */

// A. Configurable API Request Builder
const buildRequest = method => url => data => ({
  method,
  url,
  body: JSON.stringify(data)
});

const postRequest = buildRequest('POST');
const createUser = postRequest('/api/users');
createUser({ name: "Praveen", age: 25 });

// B. Configurable Logger
const createLogger = level => module => message =>
  `[${new Date().toISOString()}] [${level}] [${module}] ${message}`;

const logError = createLogger('ERROR');
const authError = logError('AUTH');
authError('Invalid credentials'); // Output formatted log string


/* ============================================================================
 * 6. CURRYING VS PARTIAL APPLICATION
 * ============================================================================
 *
 * | Concept             | Argument Signature | Execution Style                |
 * |---------------------|--------------------|--------------------------------|
 * | Currying            | `f(a)(b)(c)`       | Strict: 1 argument per turn.  |
 * | Partial Application | `f(a, b)(c)`       | Flexible: N arguments at once. |
 */


/* ============================================================================
 * 7. TOP INTERVIEW QUESTIONS & QUICK ANSWERS
 * ============================================================================
 *
 * Q1: What is currying?
 * A: Transforming a function that takes multiple arguments into a chain of
 *    functions that each take a single argument.
 *
 * Q2: How does currying leverage closures?
 * A: Each returned inner function retains access to the parameters passed to
 *    its outer parent functions via closure scope.
 *
 * Q3: How do you implement infinite currying `add(1)(2)...()`?
 * A: By checking if the next argument is `undefined`. If yes, return the
 *    accumulated value; if no, return the curried function again.
 *
 * Q4: Why use currying over standard functions?
 * A: To create specialized/reusable helper functions (like `addGST` or `logError`),
 *    avoid repeating static arguments, and enable clean function composition.
 */
