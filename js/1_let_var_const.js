// https://roadsidecoder.hashnode.dev/javascript-interview-questions-on-var-let-and-const
// Scope
//scopes


// JavaScript var, let, and const: Detailed "Why" Explanations
// ==========================================================

// 1. Scope
// --------

// function name() {
//   // Functional scope
// }

// {
//   // Block scope
// }

//var is functional and let/const is block scope

// WHY:
// - `var` is function-scoped, so it is accessible throughout the function it’s declared in.
// - `let` and `const` are block-scoped, meaning they are only accessible within the enclosing `{}`.

// 2. var inside block
// -------------------
// {
//   var name = 'praveen';
// }
// console.log(name); // ✅ prints "praveen"

// WHY:
// - `var` ignores block scope and becomes part of the enclosing function or global scope.

// 3. let inside block
// -------------------
// {
//   let name = 'praveen';
// }
// console.log(name); // ❌ ReferenceError

// WHY:
// - `let` is block-scoped and only available within the `{}` block.

// 4. Variable Shadowing
// ---------------------
// function test() {
//   let a = 'Hello';
//   if (true) {
//     let a = 'Hi';   // shadowing 'a'
//     console.log(a); // "Hi"
//   }
//   console.log(a);   // "Hello"
// }

// WHY:
// - Shadowing occurs when a variable declared in an inner scope has the same name as a variable in an outer scope.
// - Both `a` variables are separate due to block scoping.

// 5. Illegal Shadowing
// --------------------
// let a = 10;
// {
//   var a = 20; // ❌ SyntaxError
// }

// WHY:
// - `var` tries to hoist and redeclare `a` in the same scope where `let a` already exists — not allowed due to different scoping rules.

// 6. Redeclaration
// ----------------

// ✅ var
// var x = 1;
// var x = 2; // Allowed

// ❌ let/const
// let y = 1;
// let y = 2; // ❌ SyntaxError

// WHY:
// - `var` allows redeclaration.
// - `let` and `const` do not allow redeclaration in the same scope to avoid accidental bugs.

// 7. Nested let declaration
// -------------------------
// let x = 1;
// {
//   let x = 2; // ✅ allowed
// }

// WHY:
// - This is legal because they are in different block scopes.

// 8. Declaration without Initialization
// -------------------------------------

// var a;   // ✅
// let b;   // ✅
// const c; // ❌ SyntaxError

// WHY:
// - `const` must be initialized during declaration because it represents a constant binding.


// Interview Questions Summary with Whys
// =====================================

// | ❓ Question                                                          | ✅ Answer                                                            | 🤔 Why                                                                 |
// | ------------------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------- |
// | What’s the difference in scoping between `var`, `let`, and `const`? | `var`: function-scoped, `let/const`: block-scoped                    | Prevents bugs due to scoping confusion; `let/const` promote cleaner code |
// | Can you redeclare a `let` variable?                                 | ❌ No, not in the same scope                                          | To avoid bugs and unintended overwrites                                 |
// | Can you reassign a `const` variable?                                | ❌ No, but object properties can change                               | Binding is constant, but internal state of objects is still mutable     |
// | What is hoisting?                                                   | JS moves declarations to the top of their scope                      | Helps explain why `var` can be accessed before declaration (undefined)  |
// | What is the Temporal Dead Zone?                                     | Phase where `let` and `const` exist before initialization            | Prevents access before the variable is fully initialized                |
// | Explain variable shadowing and illegal shadowing.                   | Shadowing: new variable in inner scope. `var` can’t shadow `let`.    | `var` violates scoping boundaries; `let` respects block-level scoping   |
// | Which keyword is preferable in modern JS?                           | `const`, then `let`. Avoid `var`.                                    | Promotes immutability and avoids common bugs with function scoping      |
