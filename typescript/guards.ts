// What are Type Guards in TypeScript? How do they work?
// Write a function that uses a type guard to determine if a parameter is a string or a number.

// What are Type Guards in TypeScript?
// Type Guards are techniques used in TypeScript to narrow down the type of a variable within a conditional block, making code type-safe and more precise.
// They help TypeScript understand the actual type of a variable at runtime so you can safely access properties or methods specific to that type.

// 🔧 How Do Type Guards Work?

// Type Guards usually take the form of:
// typeof checks (for primitives)
// instanceof checks (for class instances)
// Custom type guard functions
// in operator (for property checks)

//---------------------------------------------------------------------------------------------------------------------
// 🔹 1. typeof Type Guard

function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // id is string here
  } else {
    console.log(id.toFixed(2)); // id is number here
  }
}

//---------------------------------------------------------------------------------------------------------------------
// 🔹 2. instanceof Type Guard

class Dog {
  bark() {
    console.log("Woof");
  }
}

class Cat {
  meow() {
    console.log("Meow");
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // animal is Dog here
  } else {
    animal.meow(); // animal is Cat here
  }
}

//---------------------------------------------------------------------------------------------------------------------
// 🔹 3. Custom Type Guard Function
type Admin = { role: "admin"; accessLevel: number };
type User = { role: "user"; name: string };

function isAdmin(person: Admin | User): person is Admin {
  return (person as Admin).accessLevel !== undefined;
}

function getPermissions(person: Admin | User) {
  if (isAdmin(person)) {
    console.log(`Admin access level: ${person.accessLevel}`);
  } else {
    console.log(`User name: ${person.name}`);
  }
}

// person is Admin is a type predicate that tells TypeScript "inside this block, person is definitely of type Admin".

//---------------------------------------------------------------------------------------------------------------------
// 🔹 4. in Operator

function handleEntity(entity: { id: number } | { name: string }) {
  if ("id" in entity) {
    console.log("It's an ID:", entity.id);
  } else {
    console.log("It's a Name:", entity.name);
  }
}

//---------------------------------------------------------------------------------------------------------------------
// | Type Guard      | Works For        | Example                          |
// | --------------- | ---------------- | -------------------------------- |
// | `typeof`        | Primitives       | `typeof value === "string"`      |
// | `instanceof`    | Class instances  | `obj instanceof MyClass`         |
// | Custom guard fn | Complex types    | `function isX(val): val is X {}` |
// | `in` operator   | Properties check | `"prop" in obj`                  |
