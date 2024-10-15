// In JavaScript, deep copy and shallow copy refer to ways of copying objects or arrays, but they handle nested objects differently.

// Shallow Copy:
// A shallow copy creates a new object or array, but it only copies the references of nested objects or arrays, not the actual data. So, if the original or copied object is modified, changes in the nested parts affect both copies.


const original = { name: "Alice", details: { age: 25 } };
const shallowCopy = { ...original }; // Shallow copy

shallowCopy.details.age = 30;
console.log(original.details.age); // Output: 30 (both objects share the same nested 'details')


// Deep Copy:
// A deep copy creates a completely independent copy of an object, including all nested objects. Changes in the copied object do not affect the original.


const originalArr = { name: "Alice", details: { age: 25 } };
const deepCopy = JSON.parse(JSON.stringify(originalArr)); 

deepCopy.details.age = 30;
console.log(original.details.age); // Output: 25 (nested object is not shared)



// Summary:
// Shallow copy: Only the top-level values are copied. Nested objects/arrays are shared between the original and the copy.
// Deep copy: Everything, including nested objects/arrays, is copied independently. Changes in the copy won’t affect the original.