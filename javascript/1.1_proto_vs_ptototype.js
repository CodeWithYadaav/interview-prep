// ════════════════════════════════════════════════════════════════════════════════════
// __proto__ vs prototype - Simple & Complete Guide
// ════════════════════════════════════════════════════════════════════════════════════

// QUICK SUMMARY:
// prototype  -> Property on FUNCTIONS (blueprint for objects)
// __proto__  -> Property on OBJECTS (link to parent prototype)

// ════════════════════════════════════════════════════════════════════════════════════
// 1. WHAT IS prototype?
// ════════════════════════════════════════════════════════════════════════════════════
// prototype is a property that exists ONLY on functions
// It's used as a BLUEPRINT when creating new objects

console.log("\n=== 1. PROTOTYPE (Function Property) ===\n");

// Example: Constructor function
function Person(name) {
  this.name = name;
}

// Add methods to Person.prototype
Person.prototype.sayHello = function () {
  return `Hi, I'm ${this.name}`;
};

Person.prototype.getAge = function () {
  return this.age || "Age not set";
};

// Create an instance
const praveen = new Person("Praveen");
console.log("Name:", praveen.name);              // "Praveen"
console.log("Method:", praveen.sayHello());      // "Hi, I'm Praveen"

// SIMPLE RULE:
// prototype is the BLUEPRINT attached to the constructor function
// All instances created with "new" will inherit from this blueprint

// ════════════════════════════════════════════════════════════════════════════════════
// 2. WHAT IS __proto__?
// ════════════════════════════════════════════════════════════════════════════════════

// __proto__ is a property that exists on ALL objects
// It POINTS to the prototype object from which it inherited

console.log("\n=== 2. __PROTO__ (Object Property) ===\n");

const ravi = new Person("Ravi");

// __proto__ points to Person.prototype
console.log("Is same?", ravi.__proto__ === Person.prototype);  // true

// This link is what enables inheritance
console.log("Has sayHello?", "sayHello" in ravi);  // true
console.log("Where?", ravi.hasOwnProperty("sayHello"));  // false (it's in prototype)

// SIMPLE RULE:
// __proto__ is the LINK that connects an object to its parent prototype
// It's how JavaScript finds inherited properties and methods

// ════════════════════════════════════════════════════════════════════════════════════
// 3. HOW THEY WORK TOGETHER (The Prototype Chain)
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 3. PROTOTYPE CHAIN ===\n");

function Animal(type) {
  this.type = type;
}

Animal.prototype.speak = function () {
  return `${this.type} makes a sound`;
};

const dog = new Animal("Dog");

// When you call dog.speak():
// Step 1: JS looks for "speak" on dog object -> NOT FOUND
// Step 2: JS follows dog.__proto__ to Animal.prototype -> FOUND!
// Step 3: Execute the method

console.log(dog.speak());  // "Dog makes a sound"

// Visual representation:
console.log("\nPrototype Chain:");
console.log("dog object:", dog);
console.log("dog.__proto__:", dog.__proto__);
console.log("dog.__proto__ === Animal.prototype:", dog.__proto__ === Animal.prototype);

// SIMPLE RULE:
// prototype -> What you want instances to inherit (on function)
// __proto__  -> The actual link that makes inheritance work (on object)

// ════════════════════════════════════════════════════════════════════════════════════
// 4. PROTOTYPE CHAIN WALKTHROUGH
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 4. CHAIN WALKTHROUGH ===\n");

function Car(brand) {
  this.brand = brand;
}

Car.prototype.drive = function () {
  return `${this.brand} is driving`;
};

const tesla = new Car("Tesla");

// The complete chain:
console.log("1. tesla.brand (own property):", tesla.brand);
console.log("2. tesla.drive (from prototype):", tesla.drive());
console.log("3. tesla.toString (from Object.prototype):", tesla.toString());

// How JS finds properties:
// tesla.drive() lookup:
//   -> Check tesla object? NO
//   -> Check tesla.__proto__ (Car.prototype)? YES -> Found!

// tesla.toString() lookup:
//   -> Check tesla object? NO
//   -> Check tesla.__proto__ (Car.prototype)? NO
//   -> Check Car.prototype.__proto__ (Object.prototype)? YES -> Found!

console.log("\nChain verification:");
console.log("tesla.__proto__ === Car.prototype:", tesla.__proto__ === Car.prototype);
console.log("Car.prototype.__proto__ === Object.prototype:", Car.prototype.__proto__ === Object.prototype);

// ════════════════════════════════════════════════════════════════════════════════════
// 5. MODIFYING PROTOTYPES
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 5. MODIFYING PROTOTYPES ===\n");

function User(username) {
  this.username = username;
}

const user1 = new User("Praveen");
const user2 = new User("Ravi");

// Add method to prototype AFTER creating instances
User.prototype.greet = function () {
  return `Hello, ${this.username}`;
};

// Both instances get the new method immediately!
console.log("User1:", user1.greet());  // "Hello, Praveen"
console.log("User2:", user2.greet());  // "Hello, Ravi"

// Why? Because they both share the same prototype via __proto__
console.log("Same prototype?", user1.__proto__ === user2.__proto__);  // true

// SIMPLE RULE:
// Changes to prototype affect ALL instances immediately
// They all point to the same prototype object via __proto__

// ════════════════════════════════════════════════════════════════════════════════════
// 6. OWN PROPERTY vs INHERITED PROPERTY
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 6. OWN vs INHERITED ===\n");

function Product(name, price) {
  this.name = name;    // Own property
  this.price = price;  // Own property
}

Product.prototype.getInfo = function () {  // Inherited property
  return `${this.name}: $${this.price}`;
};

const laptop = new Product("Laptop", 1000);

// Check property location
console.log("Has 'name' (own)?", laptop.hasOwnProperty("name"));        // true
console.log("Has 'price' (own)?", laptop.hasOwnProperty("price"));      // true
console.log("Has 'getInfo' (own)?", laptop.hasOwnProperty("getInfo"));  // false

// But can still access inherited properties
console.log("Can access getInfo?", "getInfo" in laptop);  // true
console.log("Result:", laptop.getInfo());

// SIMPLE RULE:
// Own properties -> Stored on the object itself
// Inherited properties -> Found via __proto__ chain

// ════════════════════════════════════════════════════════════════════════════════════
// 7. MODERN ALTERNATIVE: Object.getPrototypeOf()
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 7. MODERN APPROACH ===\n");

function Book(title) {
  this.title = title;
}

Book.prototype.read = function () {
  return `Reading ${this.title}`;
};

const book = new Book("JavaScript Guide");

// OLD WAY (still works but not recommended)
console.log("Old way:", book.__proto__ === Book.prototype);

// MODERN WAY (recommended)
console.log("Modern way:", Object.getPrototypeOf(book) === Book.prototype);

// Setting prototype (modern way)
const newPrototype = { author: "Unknown" };
Object.setPrototypeOf(book, newPrototype);
console.log("New author:", book.author);

// SIMPLE RULE:
// Use Object.getPrototypeOf() instead of __proto__ in production code
// __proto__ is legacy but useful for understanding

// ════════════════════════════════════════════════════════════════════════════════════
// COMPARISON TABLE
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== COMPARISON TABLE ===\n");

const comparisonTable = `
┌──────────────┬──────────────────────────────────┬─────────────────────────────────┐
│   Feature    │           prototype              │           __proto__             │
├──────────────┼──────────────────────────────────┼─────────────────────────────────┤
│ Belongs to   │ Functions (constructors)         │ All objects                     │
│ Purpose      │ Define what gets inherited       │ Link to inherited prototype     │
│ Type         │ Function property                │ Object property                 │
│ Used for     │ Building inheritance chain       │ Looking up the chain            │
│ Accessible?  │ YES (Function.prototype)         │ YES (but use getPrototypeOf())  │
│ When set?    │ At function definition           │ At object creation (with new)   │
│ Shared?      │ YES (by all instances)           │ NO (each object has own link)   │
└──────────────┴──────────────────────────────────┴─────────────────────────────────┘
`;

console.log(comparisonTable);

// ════════════════════════════════════════════════════════════════════════════════════
// INTERVIEW QUESTIONS & ANSWERS
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== COMMON INTERVIEW QUESTIONS ===\n");

// Q1: What's the difference between __proto__ and prototype?
// A: prototype is a property on functions used as a blueprint.
//    __proto__ is a property on objects that links to the prototype.

// Q2: Can you change __proto__ after object creation?
// A: Yes, using Object.setPrototypeOf(), but it's not recommended
//    for performance reasons.

// Q3: What is the prototype chain?
// A: The chain of __proto__ links that JavaScript follows to find
//    properties and methods on objects.

// Q4: Where does the prototype chain end?
// A: At Object.prototype.__proto__, which is null.

// Q5: What happens when you add a method to prototype after creating instances?
// A: All instances immediately get access to it because they share
//    the same prototype object via __proto__.

// Q6: How do you check if a property is own or inherited?
// A: Use hasOwnProperty() method.
//    obj.hasOwnProperty('prop') -> true if own, false if inherited

// ════════════════════════════════════════════════════════════════════════════════════
// VISUAL REPRESENTATION
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== VISUAL REPRESENTATION ===\n");

/*

Constructor Function:
┌─────────────────┐
│    Person       │ (Function)
│  - prototype ───┼──┐
└─────────────────┘  │
                     │
                     ▼
              ┌──────────────┐
              │   Object     │ (Person.prototype)
              │ - sayHello() │
              │ - getAge()   │
              └──────────────┘
                     ▲
                     │
                     │ __proto__ link
                     │
              ┌──────────────┐
              │   praveen    │ (Instance)
              │ - name: "P"  │
              └──────────────┘


Key Points:
1. Person.prototype is the BLUEPRINT
2. praveen.__proto__ points to Person.prototype
3. praveen can access sayHello() via the __proto__ link

*/

// ════════════════════════════════════════════════════════════════════════════════════
// BEST PRACTICES
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== BEST PRACTICES ===\n");

// DO: Use prototype to add shared methods
function Employee(name) {
  this.name = name;
}
Employee.prototype.work = function () {
  return `${this.name} is working`;
};

// DO: Use Object.getPrototypeOf() instead of __proto__
const emp = new Employee("John");
const proto = Object.getPrototypeOf(emp);
console.log("Prototype:", proto === Employee.prototype);

// DON'T: Avoid modifying __proto__ directly (performance hit)
// emp.__proto__ = {}; // BAD

// DON'T: Don't add properties to prototype that should be unique
// Employee.prototype.id = 123; // BAD - all instances share this!

// DO: Add unique properties in constructor
function BetterEmployee(name, id) {
  this.name = name;
  this.id = id;  // GOOD - each instance gets own id
}

console.log("\nRemember:");
console.log("- prototype -> Blueprint for what to inherit (on functions)");
console.log("- __proto__ -> Link to what was inherited (on objects)");
console.log("- Use Object.getPrototypeOf() in production code");

// ════════════════════════════════════════════════════════════════════════════════════
// QUICK MEMORIZATION TRICK
// ════════════════════════════════════════════════════════════════════════════════════

/*

Think of it like a family tree:

prototype  = The family genes (DNA blueprint on the parent)
__proto__  = The genetic link (connection from child to parent)

When you ask a child for a trait:
1. Check if child has it directly (own property)
2. If not, follow __proto__ to parent's prototype
3. Keep going up the chain until found or reach null

GOLDEN RULE for interviews:
"prototype defines, __proto__ connects"

*/
