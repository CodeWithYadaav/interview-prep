/**
 * ============================================================================
 * INTERVIEW CHEAT SHEET: __proto__ vs prototype & The Prototype Chain
 * ============================================================================
 *
 * 🎯 ONE-LINE INTERVIEW ANSWER:
 * "prototype is a property on constructor functions used as a blueprint for instances,
 *  while __proto__ is an accessor property on objects that links them back to their prototype."
 *
 * 💡 GOLDEN RULE:
 * `prototype` defines, `__proto__` connects.
 */


/* ============================================================================
 * 1. PROTOTYPE VS __PROTO__ IN ACTION
 * ============================================================================
 * Problem Statement: Demonstrate how constructor functions use `prototype`
 * to attach shared methods and how instance objects access them via `__proto__`.
 */

function Person(name) {
  this.name = name; // Own property
}

// Add shared methods to constructor's prototype blueprint
Person.prototype.sayHello = function () {
  return `Hi, I'm ${this.name}`;
};

const user = new Person("Praveen");

// Own property check
console.log(user.hasOwnProperty("name"));     // true (stored on instance)
console.log(user.hasOwnProperty("sayHello")); // false (inherited)

// __proto__ link verification
console.log(user.__proto__ === Person.prototype); // true


/* ============================================================================
 * 2. THE PROTOTYPE CHAIN LOOKUP
 * ============================================================================
 * Problem Statement: Trace how JS resolves property lookup step-by-step
 * when calling an inherited method up to Object.prototype.
 */

function Car(brand) {
  this.brand = brand;
}

Car.prototype.drive = function () {
  return `${this.brand} is driving`;
};

const tesla = new Car("Tesla");

// Property Lookup Resolution:
// 1. tesla.brand   -> Found on `tesla` instance (Own Property)
// 2. tesla.drive() -> Not on instance -> Checks `tesla.__proto__` (Car.prototype) -> FOUND!
// 3. tesla.toString() -> Not on instance -> Not on `Car.prototype` -> Checks `Car.prototype.__proto__` (Object.prototype) -> FOUND!

console.log(tesla.brand);                   // "Tesla"
console.log(tesla.drive());                 // "Tesla is driving"
console.log(tesla.toString());              // "[object Object]"

// Prototype Chain Traversal:
console.log(tesla.__proto__ === Car.prototype);                   // true
console.log(Car.prototype.__proto__ === Object.prototype);       // true
console.log(Object.prototype.__proto__);                         // null (End of chain)


/* ============================================================================
 * 3. DYNAMIC MUTATION & SHARED REFERENCE
 * ============================================================================
 * Problem Statement: Show why modifying a prototype affects all instances
 * dynamically, even if created prior to the modification.
 */

const user1 = new Person("Praveen");

// Add method after instance creation
Person.prototype.greet = function () {
  return `Hello, ${this.name}`;
};

// Immediate access via shared reference link
console.log(user1.greet()); // "Hello, Praveen"


/* ============================================================================
 * 4. MODERN ALTERNATIVES (BEST PRACTICES)
 * ============================================================================
 * Problem Statement: Replace legacy `__proto__` accessors with standard
 * ES6 static methods for prototype inspection and delegation.
 */

const emp = new Person("Ravi");

// ❌ Legacy / Non-Standard in Production
const legacyProto = emp.__proto__;

// ✅ Modern ES6 Standard
const modernProto = Object.getPrototypeOf(emp);
console.log(modernProto === Person.prototype); // true


/* ============================================================================
 * 5. QUICK INTERVIEW Q&A
 * ============================================================================
 *
 * Q1: What is the difference between prototype and __proto__?
 * A: `prototype` exists on function objects (constructors) to serve as a blueprint.
 *    `__proto__` exists on instances pointing to `Constructor.prototype`.
 *
 * Q2: Where does the prototype chain terminate?
 * A: At `Object.prototype.__proto__`, which equals `null`.
 *
 * Q3: What is the performance impact of using __proto__ or Object.setPrototypeOf()?
 * A: Mutating prototypes breaks JavaScript engine optimizations (V8 inline caches).
 *    Use `Object.create()` during initial object instantiation instead.
 *
 * Q4: How do you differentiate between own and inherited properties?
 * A: Use `obj.hasOwnProperty('prop')` or `Object.hasOwn(obj, 'prop')`.
 */
