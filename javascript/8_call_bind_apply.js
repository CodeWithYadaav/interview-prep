/**
 * ============================================================================
 * LESSON: Explicit Binding in JavaScript (call, apply, bind)
 * TOPIC: How to control what `this` points to inside a function.
 * ============================================================================
 *
 * QUICK SUMMARY:
 *  1. Default Behavior: When you invoke a plain function, `this` points to the
 *     global object (window in browsers, global in Node) or `undefined` in strict mode.
 *  2. Explicit Binding: Methods that let you FORCE a function to use a specific object as `this`.
 *     - .call()  -> Invokes function IMMEDIATELY. Arguments passed INDIVIDUALLY.
 *     - .apply() -> Invokes function IMMEDIATELY. Arguments passed as an ARRAY.
 *     - .bind()  -> DOES NOT invoke immediately. Returns a NEW function to run later.
 */

/* ============================================================================
 * CONCEPT 1: Why do we even need `call`?
 * ============================================================================
 */

// Step A: The Problem (Default Binding Failure)
const personObj = { name: "Praveen" };

function sayHello() {
  // JavaScript looks for `this.name`.
  // But because `sayHello()` is called standalone, `this` points to the global object.
  // Global object has no `name` property, so it returns `undefined`.
  console.log(this.name);
}

sayHello(); // Output: undefined


// Step B: The Solution using `.call()`
// `.call(targetObject)` tells JavaScript: "Run `sayHello()`, but treat `this` as `personObj`."

sayHello.call(personObj); // Output: Praveen


// Step C: Passing arguments with `.call()`
// Extra parameters come AFTER the object parameter, separated by commas.

function sayHelloWithAge(age) {
  console.log(`${this.name}'s age is ${age}`);
}

sayHelloWithAge.call(personObj, 30); // Output: Praveen's age is 30


/* ============================================================================
 * CONCEPT 2: The `.apply()` Method
 * ============================================================================
 * `.apply()` is identical to `.call()`, with ONE difference:
 * Arguments MUST be wrapped inside an Array `[...]`.
 *
 * MEMORY TRICK:
 *  - C in Call  -> Comma-separated arguments
 *  - A in Apply -> Array of arguments
 */

const userObj = { name: "Praveen" };

function introduceUser(age, profession) {
  console.log(`${this.name} is ${age} years old and works as a ${profession}`);
}

// Notice the array brackets `[30, "Software Engineer"]`:
introduceUser.apply(userObj, [30, "Software Engineer"]);
// Output: Praveen is 30 years old and works as a Software Engineer


/* ============================================================================
 * CONCEPT 3: The `.bind()` Method
 * ============================================================================
 * Unlike `.call()` and `.apply()`, `.bind()` DOES NOT call the function right away.
 * Instead, it creates and RETURNS a brand new bound function that you can store in
 * a variable and execute whenever you want.
 *
 * MEMORY TRICK:
 *  - B in Bind  -> Creates a "Bound" reusable function for later.
 */

const developerObj = { name: "Praveen" };

function describeDev(age, company) {
  return `${this.name} is ${age} years old and works at ${company}`;
}

// 1. Create the bound function:
const boundFunc = describeDev.bind(developerObj);

// 2. Execute it later as many times as you like:
console.log(boundFunc(30, "Software Engineer")); // Output: Praveen is 30 years old and works at Software Engineer
console.log(boundFunc(30, "EPAM"));              // Output: Praveen is 30 years old and works at EPAM


/* ============================================================================
 * CONCEPT 4: Quick Comparison (call vs bind)
 * ============================================================================
 */

const candidate = { name: "Praveen" };

function getInfo(age) {
  return `${this.name} is ${age}`;
}

// .call() executes immediately and returns the direct result ("Praveen is 24")
console.log(getInfo.call(candidate, 24));

// .bind() returns the function itself (it hasn't run yet!)
console.log(getInfo.bind(candidate, 24));
// Output: [Function: bound getInfo]


/* ============================================================================
 * CONCEPT 5: Borrowing Methods across Objects
 * ============================================================================
 * You can "borrow" a method from one object and run it against another object.
 */

const person1 = {
  name: "Praveen",
  age: 30,
  getAge: function () {
    return this.age;
  }
};

const person2 = {
  age: 24
  // Notice person2 does NOT have a `getAge` method!
};

// We borrow `person1.getAge` and force its `this` to point to `person2`:
console.log(person1.getAge.call(person2)); // Output: 24


/* ============================================================================
 * CONCEPT 6: Tricky Interview Output Question Walkthrough
 * ============================================================================
 */

// Let's trace this step by step:

var status = "😎 Global Status";

setTimeout(() => {
  const status = "😍 Local Status";

  const data = {
    status: "🥑 Object Status",
    getStatus() {
      return this.status;
    }
  };

  // --------------------------------------------------------------------------
  // Question A: What does data.getStatus() print?
  // --------------------------------------------------------------------------
  console.log(data.getStatus());
  // ANSWER: "🥑 Object Status"
  // WHY: Normal method invocation. `this` implicitly points to the `data` object.

  // --------------------------------------------------------------------------
  // Question B: What does data.getStatus.call(this) print?
  // --------------------------------------------------------------------------
  console.log(data.getStatus.call(this));
  // ANSWER: "😎 Global Status" (or `undefined` depending on the environment)
  // WHY:
  // 1. `setTimeout` uses an Arrow Function `() => {}`.
  // 2. Arrow functions do NOT have their own `this`. They inherit `this` from the outer scope.
  // 3. In the outer scope, `this` points to the Global Object (Window/Global).
  // 4. Therefore, `data.getStatus.call(this)` passes the Global Object into `call()`.
  // 5. Inside `getStatus()`, `this.status` looks up the `status` on the Global Object!
  // 6. It finds `var status = "😎 Global Status"`.
  // (Note: `const status = '😍 Local Status'` inside setTimeout is block-scoped, NOT attached to `this`).

}, 0);
