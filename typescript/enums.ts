// What is an enum in TypeScript? When to use it?
// Definition:
// enum is used to define a set of named constants. It improves readability and avoids magic strings/numbers.

// Use it when:
// You have related constant values — like user roles, order statuses, directions, etc.

// 🔹 Example – Numeric Enum:
enum UserRole {
  Admin = 1,
  Moderator,
  User,
}

const role: UserRole = UserRole.Admin;

if (role === UserRole.Admin) {
  console.log("Admin access");
}

// Example:

enum Status {
  Success = "SUCCESS",
  Failure = "FAILURE",
}

const status: Status = Status.Success;

if (status === Status.Success) {
  console.log("Operation successful");
}

// Utility Types in TypeScript
// Built-in helpers to transform existing types.

// 🔸 Partial<T>
// Makes all properties optional.

type User = { name: string; age: number };
const updateUser = (user: Partial<User>) => {
  // Can pass only some fields
  user.name = "Updated";
};




