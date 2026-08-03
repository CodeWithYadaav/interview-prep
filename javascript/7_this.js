/**
 * ============================================================================
 * LESSON: Everything About `this` Keyword & Object Binding in JavaScript
 * TOPIC: Implicit vs. Explicit Binding, Arrow Functions, Classes, and Output Questions
 * ============================================================================
 *
 * CORE BINDING CONCEPTS:
 * 1. Implicit Binding: Occurs automatically when invoking a method using dot
 *    notation (e.g., `object.method()`). `this` points to the object before the dot.
 * 2. Explicit Binding: Occurs manually when forcing a context using `.call()`,
 *    `.apply()`, or `.bind()`.
 * 3. Default / Global Binding: Standalone function calls where `this` points to
 *    the global object (`window` in browsers, `global` in Node, or `undefined` in strict mode).
 */

/* ============================================================================
 * SECTION 1: What is the `this` Keyword?
 * ============================================================================
 * `this` references an object, which depends on the execution context in which
 * it is called (e.g., Global context vs Object context).
 */

// Global Context Example:
// In non-strict mode, assigning to `this.a` at the top level attaches `a` to the global object.
this.a = 5;
console.log(this.a); // Output: 5


/* ============================================================================
 * SECTION 2: Implicit Binding Examples
 * ============================================================================
 */

// --- Example A: Basic Method Invocation ---
const user1 = {
  name: "praveen",
  age: 30,
  getDetail() {
    console.log(this.name);
  }
};

// `user1` is before the dot, so `this` inside `getDetail()` points to `user1`.
user1.getDetail(); // Output: praveen


// --- Example B: Nested Object Scope ---
const user2 = {
  name: "praveen",
  age: 30,
  childObj: {
    newName: "yadav",
    getDetail() {
      // `this` points ONLY to `childObj` because `childObj` is directly before `.getDetail()`.
      // `childObj` has `newName`, but NO `name` property!
      console.log(this.name, "", this.newName);
    }
  }
};

user2.childObj.getDetail(); // Output: undefined yadav


/* ============================================================================
 * SECTION 3: `this` Behavior in Arrow Functions
 * ============================================================================
 * KEY RULE: Arrow functions DO NOT have their own `this`.
 * They inherit `this` lexically from their enclosing parent scope at creation time.
 */

// --- Example A: Top-Level Arrow Function inside Object ---
const userArrow = {
  name: "praveen",
  age: 30,
  getDetail: () => {
    // Parent scope is the Global/Window context (NOT the `userArrow` object!).
    // In global scope, `this.name` is undefined.
    console.log(this.name);
  }
};

userArrow.getDetail(); // Output: undefined


// --- Example B: Nested Arrow Function inside Regular Method ---
const userNestedArrow = {
  name: "praveen",
  age: 30,
  getDetail() {
    // `getDetail` is a regular function, so its `this` points to `userNestedArrow`.
    // The inner arrow function inherits `this` directly from `getDetail`.
    const nestedArr = () => console.log(this.name);
    nestedArr();
  }
};

userNestedArrow.getDetail(); // Output: praveen


/* ============================================================================
 * SECTION 4: `this` inside Classes and Constructors
 * ============================================================================
 * Inside a class constructor or class method, `this` refers to the newly
 * instantiated object created by the `new` keyword.
 */

class UserClass {
  constructor(n) {
    this.name = n; // Attaches `name` to the new instance
  }

  getName() {
    console.log(this.name);
  }
}

const instanceUser = new UserClass("praveen");
instanceUser.getName(); // Output: praveen
console.log(instanceUser); // Output: UserClass { name: 'praveen' }


/* ============================================================================
 * SECTION 5: Interview Output Questions & Problem Walkthroughs
 * ============================================================================
 */

// --- QUESTION 1: Local Variable vs Object Property ---
const q1User = {
  firstName: "praveen",
  getName() {
    const firstName = "yadav";
    // `this.firstName` ALWAYS looks up the property on the object,
    // ignoring the local variable `const firstName`.
    return this.firstName;
  }
};

console.log(q1User.getName()); // Output: praveen


// --- QUESTION 2: The `ref` Property Trap & Fix ---

// Problem Version:
function makeUserBad() {
  return {
    name: "praveen",
    ref: this // Executed at object creation time! `this` points to global window/undefined.
  };
}

let badUser = makeUserBad();
console.log(badUser.ref.name);
// Output: undefined (or Error in strict mode)
// WHY? `this` inside `makeUserBad()` is not bound to the returned object because
// the object hasn't been created yet when `this` is evaluated.

// Fixed Version:
function makeUserGood() {
  return {
    name: "praveen",
    ref() {
      // Now `ref` is a method! When invoked as `user.ref()`, `this` points to the object before the dot.
      return this;
    }
  };
}

let goodUser = makeUserGood();
console.log(goodUser.ref().name); // Output: praveen


// --- QUESTION 3: Method Passed as Callback (Losing Context) ---

// Problem Version:
const cbUser = {
  name: "praveen",
  logMessage() {
    console.log(this.name);
  }
};

// Passing `cbUser.logMessage` directly strips away its implicit object binding.
// setTimeout executes it later as a plain function call in the global context.
setTimeout(cbUser.logMessage, 1000); // Output: undefined (after 1 sec)

// Fixed Version:
// Wrap it inside an anonymous function so `cbUser.logMessage()` is called explicitly as an object method.
setTimeout(function () {
  cbUser.logMessage(); // Output: praveen (after 1 sec)
}, 1000);


// --- QUESTION 4: Regular Method vs Arrow Method ---
const q4User = {
  name: "praveen",
  greet() {
    return `Hello ${this.name}`; // Regular function: `this` points to `q4User`
  },
  message: () => {
    return `Hi ${this.name}`; // Arrow function: `this` points to global scope
  }
};

console.log(q4User.greet());   // Output: Hello praveen
console.log(q4User.message()); // Output: Hi undefined


// --- QUESTION 5: Implement a Calculator Object ---
let calculator = {
  read() {
    // Using prompt for user input (+ converts string to number)
    // (Mocked values here for non-browser execution safety)
    this.a = typeof prompt !== "undefined" ? +prompt("a = 0", 0) : 10;
    this.b = typeof prompt !== "undefined" ? +prompt("b = 0", 0) : 5;
  },
  sum() {
    return this.a + this.b; // Added missing `return` statement
  },
  mul() {
    return this.a * this.b; // Added missing `return` statement
  }
};

calculator.read();
console.log("Calculator Sum:", calculator.sum()); // Output: 15 (using mock values 10 & 5)
console.log("Calculator Mul:", calculator.mul()); // Output: 50


// --- QUESTION 6: Array Method Callback Context Trap ---
var length = 4;

function callback() {
  console.log(this.length);
}

const objContainer = {
  length: 5,
  method(fn) {
    fn(); // Standalone function call! `this` defaults to global object (where length = 4)
  }
};

objContainer.method(callback); // Output: 4


// --- QUESTION 7: Method Chaining Calculator (CARS 24 Interview Question) ---
// TRICK: To allow chaining like `calc.add().multiply().subtract()`,
// every method MUST return `this` (the object itself)!

const calc = {
  total: 0, // Note: tracking variable is named `total`
  add(a) {
    this.total += a;
    return this; // Enables method chaining
  },
  multiply(a) {
    this.total *= a;
    return this; // Enables method chaining
  },
  subtract(a) {
    this.total -= a;
    return this; // Enables method chaining
  }
};

const result = calc.add(10).multiply(5).subtract(30).add(10);
console.log("CARS 24 Calc Result:", result.total);
// Trace: 0 + 10 = 10 -> 10 * 5 = 50 -> 50 - 30 = 20 -> 20 + 10 = 30
// Output: 30
