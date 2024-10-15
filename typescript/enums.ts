// What is an enum in TypeScript? When would you use it?
// Write an example of how to define and use an enum in TypeScript.

// Explain some of the common utility types like Partial, Pick, Omit, and Readonly in TypeScript.
// Write examples demonstrating how each of these utility types can be used.

// How does TypeScript’s type inference work?
// When would you need to explicitly define types instead of relying on TypeScript’s type inference?

// How does TypeScript handle object-oriented programming with classes?
// Write an example of a class with properties, methods, and inheritance in TypeScript.
// How would you implement method overriding in TypeScript?






// What is an enum in TypeScript?

// An enum (short for "enumeration") is a way to define a set of named constants that can have either numeric or string values. It provides a convenient way to group related values and gives these values meaningful names, making the code more readable and easier to manage.

// Enums are used when you have a collection of related values that you want to represent as distinct, named values.

// When would you use an enum?
// You would use an enum when:

// You need to define a set of constant values that represent something meaningful (e.g., days of the week, user roles, or status codes).
// You want to improve code readability by giving meaningful names to these constant values instead of using hard-coded numbers or strings.


// Define an enum for user roles
enum UserRole {
    Admin = 1,
    Moderator = 2,
    User = 3
  }
  
  // Using the enum
  const currentUserRole: UserRole = UserRole.Admin;
  
  if (currentUserRole === UserRole.Admin) {
    console.log("You have admin privileges.");
  }

  


//   String Enum:

  // Define an enum for status codes
enum Status {
    Success = "SUCCESS",
    Failure = "FAILURE",
    Pending = "PENDING"
  }
  
  // Using the enum
  const currentStatus: Status = Status.Success;
  
  if (currentStatus === Status.Success) {
    console.log("Operation was successful.");
  }
  