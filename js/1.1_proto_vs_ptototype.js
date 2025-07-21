// | Concept      | `__proto__`                                     | `prototype`                        |
// | ------------ | ----------------------------------------------- | ---------------------------------- |
// | Belongs to   | Any **object**                                  | Any **function (constructor)**     |
// | Purpose      | Points to the object's **prototype**            | Used to define what gets inherited |
// | Type         | Object property                                 | Function property                  |
// | Used for     | Inheritance lookup chain                        | Building the inheritance chain     |
// | Standard?    | ✅ Yes (`[[Prototype]]` under the hood)          | ✅ Yes                              |
// | Accessed via | `obj.__proto__` or `Object.getPrototypeOf(obj)` | `Function.prototype`               |



// prototype (property of a function)

// Exists on functions only.
// Used when you create new objects via constructor functions or classes.
// Anything assigned to Function.prototype becomes accessible to all instances created by that function.

function Person(name) {
    this.name = name;
}

Person.prototype.sayHello = function () {
    return `Hi, I'm ${this.name}`;
};

const p = new Person("Praveen");
console.log(p.sayHello()); // "Hi, I'm Praveen"

// ➡️ Here, sayHello is part of Person.prototype, and p gets it via inheritance.

// --------------------------------------------------------------------------------------------
// __proto__ (internal link to the prototype)
// Exists on all objects (except the base object created with Object.create(null)).
// Points to the prototype of the constructor function that created the object.

console.log(p.__proto__ === Person.prototype); // true

// ➡️ __proto__ is the hidden link that allows prototype chain lookup.

// -----------------------------------------------------------------------------------------------

const p1 = new Person("Praveen");
p.__proto__ === Person.prototype // true

// That’s what enables p.sayHello() to work — JS checks if sayHello is on p, doesn’t find it, then looks up the chain using __proto__.




// | Term        | Where?       | What it does                                  |
// | ----------- | ------------ | --------------------------------------------- |
// | `prototype` | On functions | Blueprint for instances (used in inheritance) |
// | `__proto__` | On objects   | Points to the prototype it inherited from     |
