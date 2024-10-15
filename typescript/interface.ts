// What is the difference between interface and type in TypeScript?
// When should you prefer using one over the other?
// How would you extend an interface in TypeScript? Can you do the same with a type?
// What are union and intersection types in TypeScript?
// Provide an example where union types are used, and another example for intersection types.


// In TypeScript, both interface and type are used to define the shape of objects, but they have some differences in functionality and usage.

// 1. Purpose:
// Interface: Primarily used to describe the structure of an object or a class. It is often used for object-oriented programming patterns.
// Type: More versatile. Can define not only object structures but also union types, intersection types, and more.


// Object Types:
interface User {
    name: string;
    age: number;
  }
  
  type UserType = {
    name: string;
    age: number;
  };


// Extending/Inheritance:
// Interface: Can be extended by other interfaces or classes, making it easy to create complex types.

interface Person {
    name: string;
  }
  
  interface Employee extends Person {
    employeeId: number;
  }
  
  

//   Extending/Inheritance:
//   Interface: Can be extended by other interfaces or classes, making it easy to create complex types.

  type Persons = {
    name: string;
  };
  
  type Employees = Persons & {
    employeeId: number;
  };
  