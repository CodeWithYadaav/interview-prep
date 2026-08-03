/**
 * ============================================================================
 * CHEAT SHEET: Hoisting & Temporal Dead Zone (TDZ) in JavaScript
 * ============================================================================
 *
 * DEFINITION:
 * Hoisting is JavaScript's default behavior of moving variable and function
 * declarations to the top of their scope before code execution.
 *
 * CORE RULES:
 *  1. `var` declarations are hoisted and initialized with `undefined`.
 *  2. `let` and `const` declarations are hoisted but NOT initialized (stay in TDZ).
 *  3. Function declarations are fully hoisted (both declaration and body).
 *  4. Function expressions / Arrow functions follow variable rules (`var`/`let`/`const`).
 *  5. ONLY declarations are hoisted, NOT initializations/assignments.
 */

/* ============================================================================
 * 1. BASIC HOISTING WITH `var`
 * ============================================================================
 * In `var`, the declaration is moved to the top of its scope, but the assignment
 * stays in place.
 */

console.log(x); // Output: undefined
var x = 5;

/*
 * 💡 Behind the scenes, JavaScript interprets the code above as:
 *
 * var x;         // Declaration hoisted to top & initialized to undefined
 * console.log(x); // Logs undefined
 * x = 5;         // Assignment stays in original location
 */


/* ============================================================================
 * 2. TEMPORAL DEAD ZONE (TDZ) WITH `let` AND `const`
 * ============================================================================
 * The Temporal Dead Zone (TDZ) is the period between entering a scope
 * and the actual declaration line where a `let` or `const` variable is initialized.
 *
 * Accessing a `let` or `const` variable inside its TDZ throws a `ReferenceError`.
 */

// ❌ Throws ReferenceError: Cannot access 'count' before initialization
// console.log(count);
// let count = 1;

/*
 * 💡 Why does this happen?
 * `let` and `const` ARE hoisted to the top of their block scope, but unlike `var`,
 * they are NOT initialized with `undefined`. They remain uninitialized in the TDZ
 * until the engine hits the line where they are declared.
 */


/* ============================================================================
 * 3. SCOPE-BASED HOISTING EXAMPLE (`var` VS `let`/`const`)
 * ============================================================================
 */

function abc() {
  console.log(a); // Output: undefined (`var` is hoisted and initialized with undefined)
  // console.log(b); // ❌ Throws ReferenceError (b is in TDZ)
  // console.log(c); // ❌ Throws ReferenceError (c is in TDZ)

  var a = 10;
  let b = 20;
  const c = 30;

  console.log(a, b, c); // Output: 10 20 30 (after initialization)
}

abc();

/*
 * 💡 Breakdown inside `abc()` function scope:
 *  - `a` (var): Declaration hoisted to top of function scope -> Initialized to `undefined`.
 *  - `b` (let) & `c` (const): Declarations hoisted to top of block scope -> Uninitialized (TDZ).
 *  - Executing `console.log(a, b, c)` before the lines where `b` and `c` are initialized
 *    fails because `b` and `c` cannot be accessed inside their TDZ.
 */


/* ============================================================================
 * 4. KEY SUMMARY & BEST PRACTICES
 * ============================================================================
 *
 *  - Function declarations: Fully hoisted! You can invoke them before they appear in code.
 *  - Var declarations: Hoisted and initialized with `undefined`.
 *  - Let and Const: Hoisted, but not accessible before declaration due to TDZ.
 *  - Best Practice: Always declare variables and functions at the top of their scope
 *    or use `const`/`let` to catch hoisting bugs early during execution.
 */
