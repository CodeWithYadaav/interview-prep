// What are generics in TypeScript, and why are they useful?
// Write a generic function that accepts an array of any type and returns the first element of the array.
// Can you have multiple generics in a TypeScript function? If so, provide an example.



// Generics in TypeScript are a way to create reusable components that can work with any type while maintaining strong type safety. Instead of specifying a specific type up front, you define a placeholder (often called T for "type") that gets replaced with a concrete type when the function, class, or interface is used.

// Generics allow for flexibility in code while still enforcing type checks, ensuring that functions or classes can work with different types without losing type safety.


// Type Safety: They ensure that operations performed on a type are valid for that type.
// Reusability: They allow the same function or class to handle different types, avoiding code duplication.
// Flexibility: You can work with different types while still enforcing constraints.



// Example


// A generic function that works with any type of data
function identity<T>(value: T): T {
    return value;
  }
  
  // Using the generic function with different types
  const num = identity<number>(42);   // T is replaced with number
  const str = identity<string>("Hello");  // T is replaced with string
  
  console.log(num);  // Output: 42
  console.log(str);  // Output: "Hello"
  