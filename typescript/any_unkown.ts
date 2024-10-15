// What is the difference between the any and unknown types in TypeScript? When would you use one over the other?
// Provide examples where any and unknown behave differently in TypeScript.



// In TypeScript, any and unknown are both used to describe variables whose types are not known at the time of writing the code, but they behave quite differently in terms of safety and usage.

// 1. any:
// Behavior: When a variable is of type any, TypeScript essentially turns off type checking for that variable. You can perform any operation on it without getting type errors.
// Use Case: It's often used for backward compatibility or when you don’t want TypeScript to check types.
// Downside: Using any can be unsafe because it allows you to perform operations without any restrictions, leading to potential runtime errors.


let value: any = "Hello";
value = 10;  // No type errors
value.toUpperCase();  // No error, but it can crash at runtime if 'value' isn't a string.




// unknown:
// Behavior: unknown is a safer alternative to any. It still represents a value with an unknown type, but you must check its type before performing any operation on it. TypeScript will prevent you from directly using it unless you narrow the type.
// Use Case: It's a good choice when you're unsure about a value’s type but want to enforce type safety.
// Benefit: Ensures type checks, making your code less error-prone.



let values: unknown = "Hello";
value = 10;  // No error

// Cannot directly call methods without a type check
// value.toUpperCase(); // Error: Object is of type 'unknown'

// Type checking
if (typeof values === 'string') {
    value.toUpperCase();  // Safe now
}



// Key Differences:
// any: No type checking. You can do anything with it, but it's unsafe.
// unknown: You must check the type before using it. It’s safer and encourages better practices.
// Using unknown is recommended when the type isn’t known but you still want to enforce safe type handling.