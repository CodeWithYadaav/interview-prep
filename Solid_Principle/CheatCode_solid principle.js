
// 🔹 S — Single Responsibility Principle (SRP)
// ❌ One class/function doing too many jobs
// ✅ One job, one reason to change



// ❌ Bad: Mixing validation and creation
// ✅ Good: Split into clear roles
function validateUser(name, pass, email) {
  return name && pass && email;
}

function createUser({ name, pass, email }) {
  console.log(`User created: ${name} - ${email}`);
}

if (validateUser("Praveen", "admin", "mail@test.com")) {
  createUser({ name: "Praveen", pass: "admin", email: "mail@test.com" });
}
// 🧠 Tip: Think of SRP as "One Job, One Hat."



// -------------------------------------------------------------------------------------------------------------------------------
// 🔹 O — Open/Closed Principle (OCP)
// ❌ Code should not change every time you add something
// ✅ Code should be open to extension, closed to modification

const roles = ["ADMIN", "USER"];

function checkRole(user) {
  return roles.includes(user.role);
}

function addRole(newRole) {
  roles.push(newRole);
}

addRole("DEV");
console.log(checkRole({ role: "DEV" })); // ✅ True
// 🧠 Tip: Extend it like a plugin, don’t touch the core.





// -----------------------------------------------------------------------------------------------------------------------------------------------
// 🔹 L — Liskov Substitution Principle (LSP)
// ❌ Subclass should not break parent rules
// ✅ Subtypes should behave like their parent

class Bird {
  layEgg() {
    console.log("Laying egg...");
  }
}

class FlyingBird extends Bird {
  fly() {
    console.log("Flying...");
  }
}

class SwimmingBird extends Bird {
  swim() {
    console.log("Swimming...");
  }
}
// 🧠 Tip: “If it walks like a bird, it must work like one” — no broken promises.








// -----------------------------------------------------------------------------------------------------------------------------------------------
// 🔹 I — Interface Segregation Principle (ISP)
// ❌ Don't force a class to implement things it doesn't use
// ✅ Split interfaces so classes only get what they need


class User {
  constructor(name, pass, shouldValidate) {
    this.name = name;
    this.pass = pass;
    if (shouldValidate) this.validate();
  }

  validate() {
    console.log("Validating user...");
  }
}
// 🧠 Tip: No "all-in-one interface" — divide as needed.















// -----------------------------------------------------------------------------------------------------------------------------------------------
// 🔹 D — Dependency Inversion Principle (DIP)
// ❌ High-level modules depend on low-level modules
// ✅ Both depend on abstractions


class Petrol {
  getEnergy() {
    return "Petrol power!";
  }
}

class Car {
  constructor(fuel) {
    this.fuel = fuel;
  }

  run() {
    console.log(this.fuel.getEnergy());
  }
}

const myCar = new Car(new Petrol());
myCar.run(); // ✅ Petrol power!
// 🧠 Tip: High-level code asks what it needs, not how it’s made.





// -----------------------------------------------------------------------------------------------------------------------------------------------
// | Principle | One-Liner                                  |
// | --------- | ------------------------------------------ |
// | **S**     | One job per function/class                 |
// | **O**     | Extend, don’t rewrite                      |
// | **L**     | Child classes should honor parent promises |
// | **I**     | Don’t force what you don’t use             |
// | **D**     | Depend on abstractions, not concretes      |
