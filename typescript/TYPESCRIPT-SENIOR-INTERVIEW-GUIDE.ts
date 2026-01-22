// ════════════════════════════════════════════════════════════════════════════════════
// 📚 TYPESCRIPT SENIOR DEVELOPER INTERVIEW GUIDE
// ════════════════════════════════════════════════════════════════════════════════════
// 
// Goal: Master TypeScript concepts for senior-level interviews
// All explanations are simple, memorable, and interview-ready!
//
// ════════════════════════════════════════════════════════════════════════════════════




// ════════════════════════════════════════════════════════════════════════════════════
// 1️⃣ INTERFACE VS TYPE (Most Asked Question!)
// ════════════════════════════════════════════════════════════════════════════════════

// 🧠 SIMPLE EXPLANATION:
// Both define object shapes, but they have different superpowers!

// 🏢 REAL-WORLD ANALOGY:
// Interface = Contract (can be extended, like adding clauses)
// Type = Blueprint (more flexible, can be unions/intersections)

// 📊 COMPARISON TABLE:
/*
┌─────────────────────┬─────────────────┬─────────────────┐
│ Feature             │   Interface     │      Type       │
├─────────────────────┼─────────────────┼─────────────────┤
│ Object shapes       │ ✅ Yes          │ ✅ Yes          │
│ Extend              │ extends keyword │ & (intersection)│
│ Union types         │ ❌ No           │ ✅ Yes          │
│ Primitives          │ ❌ No           │ ✅ Yes          │
│ Tuples              │ ❌ No           │ ✅ Yes          │
│ Declaration merge   │ ✅ Yes          │ ❌ No           │
│ Computed properties │ ❌ No           │ ✅ Yes          │
└─────────────────────┴─────────────────┴─────────────────┘
*/

// 📝 CODE EXAMPLES:

// ─── Both can define object shapes ───
interface IUser {
  name: string;
  age: number;
}

type TUser = {
  name: string;
  age: number;
};


// ─── Extension (both can extend) ───
interface IPerson {
  name: string;
}

interface IEmployee extends IPerson {  // ✅ Interface extension
  employeeId: number;
}

type TPerson = {
  name: string;
};

type TEmployee = TPerson & {  // ✅ Type intersection
  employeeId: number;
};


// ─── Union Types (Type ONLY) ───
type Status = "pending" | "approved" | "rejected";  // ✅ Type can do this
// interface Status = "pending" | "approved";  ❌ Interface can't!

type ID = string | number;  // ✅ Union of primitives


// ─── Declaration Merging (Interface ONLY) ───
interface Window {
  title: string;
}

interface Window {  // ✅ Automatically merges!
  version: number;
}

// Now Window has both title AND version

// type Window = { title: string };
// type Window = { version: number };  ❌ Error: Duplicate identifier


// ─── Tuples (Type ONLY) ───
type Coordinates = [number, number];  // ✅ Type
type Response = [boolean, string];

// interface Coordinates extends Array<number> {}  ❌ Not as clean


// ─── Computed Properties (Type ONLY) ───
type Keys = "name" | "age";
type UserRecord = {
  [K in Keys]: string;  // ✅ Mapped type
};
// Results in: { name: string; age: string; }


// 🎯 WHEN TO USE WHICH?

// ✅ Use INTERFACE when:
// • Defining object shapes (especially for classes)
// • Working with APIs/libraries (declaration merging helps)
// • Creating public APIs that others might extend
// • Object-oriented patterns

// ✅ Use TYPE when:
// • Need union types (status: "pending" | "approved")
// • Need intersection types with primitives
// • Working with tuples
// • Need mapped/conditional types
// • Defining function types

// 🗣️ INTERVIEW ANSWER:
/*
"Both interface and type can define object shapes. The key differences:

1. Interface is better for object-oriented patterns and can be extended with 
   'extends' keyword. It also supports declaration merging.

2. Type is more versatile - it can represent unions, tuples, primitives, and 
   complex computed types that interface cannot.

My rule of thumb: Use interface for object shapes and public APIs, use type 
when you need unions, intersections, or advanced type features."
*/




// ════════════════════════════════════════════════════════════════════════════════════
// 2️⃣ ANY VS UNKNOWN (Critical for Type Safety!)
// ════════════════════════════════════════════════════════════════════════════════════

// 🧠 SIMPLE EXPLANATION:
// any = Turn off TypeScript (dangerous!)
// unknown = "I don't know the type, so be careful!" (safe)

// 🚦 REAL-WORLD ANALOGY:
// any = Driving without seatbelt (no safety)
// unknown = Driving with seatbelt BUT must check mirrors before turning (safe)

// 📝 CODE COMPARISON:

// ❌ BAD: any (No type safety)
let valueAny: any = "hello";
valueAny = 123;
valueAny.toUpperCase();  // ✅ TypeScript allows this
valueAny.nonExistentMethod();  // ✅ TypeScript allows this (but will crash!)
// TypeScript says: "Whatever, do what you want" 🤷

// ✅ GOOD: unknown (Type safety enforced)
let valueUnknown: unknown = "hello";
valueUnknown = 123;
// valueUnknown.toUpperCase();  ❌ Error: Must check type first!

// Correct way with unknown:
if (typeof valueUnknown === "string") {
  valueUnknown.toUpperCase();  // ✅ Now TypeScript knows it's safe
}

// 🎯 PRACTICAL EXAMPLE:

// Fetching data from API
async function fetchData(): Promise<unknown> {  // Unknown because we don't trust API
  const response = await fetch('/api/user');
  return response.json();
}

// ❌ BAD with any:
async function processAny() {
  const data: any = await fetchData();
  console.log(data.name.toUpperCase());  // Might crash if data.name doesn't exist!
}

// ✅ GOOD with unknown:
async function processUnknown() {
  const data: unknown = await fetchData();
  
  // Type guard: check structure
  if (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    typeof (data as any).name === "string"
  ) {
    console.log((data as { name: string }).name.toUpperCase());  // Safe!
  }
}

// 🗣️ INTERVIEW ANSWER:
/*
"'any' disables TypeScript's type checking completely - you can do anything 
with it, which defeats the purpose of TypeScript. It should be avoided.

'unknown' is the type-safe alternative. It says 'I don't know what type this 
is, so you must check it before using it.' This forces you to write type guards, 
making your code safer.

I use 'unknown' when dealing with external data (API responses, user input, 
JSON parsing) where the type is truly uncertain."
*/




// ════════════════════════════════════════════════════════════════════════════════════
// 3️⃣ GENERICS (Essential for Reusable Code!)
// ════════════════════════════════════════════════════════════════════════════════════

// 🧠 SIMPLE EXPLANATION:
// Generics = Placeholders for types (like function parameters, but for types!)

// 📦 REAL-WORLD ANALOGY:
// Non-generic = Box that ONLY holds shoes
// Generic = Box that holds ANYTHING, but remembers what's inside

// 📝 BASIC EXAMPLE:

// ❌ Without generics (repetitive):
function getFirstNumber(arr: number[]): number {
  return arr[0];
}

function getFirstString(arr: string[]): string {
  return arr[0];
}
// Need separate function for each type!

// ✅ With generics (reusable):
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const num = getFirst<number>([1, 2, 3]);      // T = number
const str = getFirst<string>(["a", "b"]);     // T = string
const bool = getFirst([true, false]);         // T inferred as boolean


// 📝 MULTIPLE GENERICS:

function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const result = pair<string, number>("age", 25);  // ["age", 25]
const auto = pair("name", "Praveen");  // Types inferred: [string, string]


// 📝 GENERIC CONSTRAINTS (Only accept types with certain properties):

// Without constraint:
function logLength<T>(item: T): void {
  // console.log(item.length);  ❌ Error: T might not have 'length'
}

// ✅ With constraint:
function logLengthSafe<T extends { length: number }>(item: T): void {
  console.log(item.length);  // ✅ Safe! T must have 'length'
}

logLengthSafe("hello");        // ✅ string has length
logLengthSafe([1, 2, 3]);      // ✅ array has length
// logLengthSafe(123);         ❌ Error: number doesn't have length


// 📝 GENERIC INTERFACES:

interface Box<T> {
  value: T;
  getValue: () => T;
}

const numberBox: Box<number> = {
  value: 42,
  getValue: () => 42
};

const stringBox: Box<string> = {
  value: "hello",
  getValue: () => "hello"
};


// 📝 REAL-WORLD EXAMPLE - API Response:

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
}

// Different endpoints return different data types
async function fetchUser(): Promise<ApiResponse<User>> {
  // Returns: { data: User, status: 200, message: "Success" }
}

async function fetchUsers(): Promise<ApiResponse<User[]>> {
  // Returns: { data: User[], status: 200, message: "Success" }
}


// 🗣️ INTERVIEW ANSWER:
/*
"Generics allow us to create reusable components that work with multiple types 
while maintaining type safety. Instead of writing separate functions for each 
type, we use a type parameter (usually T) as a placeholder.

For example, a generic getFirst<T>() function can work with arrays of any type 
without losing type information. We can also constrain generics to only accept 
types with specific properties using 'extends'.

I use generics heavily for utility functions, API response types, and reusable 
components to avoid code duplication while keeping strong typing."
*/




// ════════════════════════════════════════════════════════════════════════════════════
// 4️⃣ TYPE GUARDS (Runtime Type Checking)
// ════════════════════════════════════════════════════════════════════════════════════

// 🧠 SIMPLE EXPLANATION:
// Type Guards = Way to narrow down types at runtime

// 🚦 REAL-WORLD ANALOGY:
// Airport security checking if bag contains liquids or solids
// (Checking at runtime what type something actually is)

// 📝 FOUR TYPES OF TYPE GUARDS:

// ─── 1. typeof (for primitives) ───
function processValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());  // TypeScript knows: value is string
  } else {
    console.log(value.toFixed(2));     // TypeScript knows: value is number
  }
}


// ─── 2. instanceof (for classes) ───
class Dog {
  bark() { console.log("Woof!"); }
}

class Cat {
  meow() { console.log("Meow!"); }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();  // TypeScript knows: animal is Dog
  } else {
    animal.meow();  // TypeScript knows: animal is Cat
  }
}


// ─── 3. in operator (for properties) ───
type Admin = { role: "admin"; accessLevel: number };
type User = { role: "user"; email: string };

function greet(person: Admin | User) {
  if ("accessLevel" in person) {
    console.log(`Admin with level ${person.accessLevel}`);  // person is Admin
  } else {
    console.log(`User: ${person.email}`);  // person is User
  }
}


// ─── 4. Custom Type Guard (most powerful!) ───
interface Bird {
  fly: () => void;
  layEggs: () => void;
}

interface Fish {
  swim: () => void;
  layEggs: () => void;
}

// Custom type predicate function
function isFish(pet: Bird | Fish): pet is Fish {  // ← "pet is Fish" is the key!
  return (pet as Fish).swim !== undefined;
}

function move(pet: Bird | Fish) {
  if (isFish(pet)) {
    pet.swim();  // TypeScript knows: pet is Fish
  } else {
    pet.fly();   // TypeScript knows: pet is Bird
  }
}


// 📝 REAL-WORLD EXAMPLE - API Response Validation:

type SuccessResponse = {
  status: "success";
  data: any;
};

type ErrorResponse = {
  status: "error";
  message: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;

// Type guard function
function isSuccess(response: ApiResponse): response is SuccessResponse {
  return response.status === "success";
}

function handleResponse(response: ApiResponse) {
  if (isSuccess(response)) {
    console.log("Data:", response.data);  // Safe to access .data
  } else {
    console.log("Error:", response.message);  // Safe to access .message
  }
}


// 🗣️ INTERVIEW ANSWER:
/*
"Type guards are techniques to narrow down union types at runtime. TypeScript 
has four main approaches:

1. 'typeof' for primitives (string, number, boolean)
2. 'instanceof' for class instances
3. 'in' operator to check if a property exists
4. Custom type predicates with 'is' keyword for complex types

Custom type guards are most powerful - you write a function that returns 
'value is Type' which tells TypeScript the exact type in that code branch. 
I use these heavily when validating API responses or handling polymorphic data."
*/




// ════════════════════════════════════════════════════════════════════════════════════
// 5️⃣ UTILITY TYPES (Built-in Type Helpers)
// ════════════════════════════════════════════════════════════════════════════════════

// 🧠 SIMPLE EXPLANATION:
// Built-in functions that transform types (like Array.map, but for types!)

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// ─── Partial<T> - Make all properties optional ───
// Use case: Update operations (don't need all fields)
function updateUser(id: number, updates: Partial<User>) {
  // updates can have: { name?: string, email?: string, ... }
}

updateUser(1, { name: "New Name" });  // ✅ Only updating name


// ─── Required<T> - Make all properties required ───
type OptionalUser = {
  name?: string;
  age?: number;
};

type RequiredUser = Required<OptionalUser>;
// Results in: { name: string; age: number; }  ← No more optional!


// ─── Pick<T, K> - Select specific properties ───
// Use case: Return only safe properties (hide password)
type UserPublic = Pick<User, "id" | "name" | "email">;
// Results in: { id: number; name: string; email: string; }

function getPublicUser(): UserPublic {
  return { id: 1, name: "Praveen", email: "test@email.com" };
}


// ─── Omit<T, K> - Remove specific properties ───
// Use case: Create new type without sensitive fields
type UserWithoutPassword = Omit<User, "password">;
// Results in: { id: number; name: string; email: string; }


// ─── Record<K, T> - Create object type with specific keys ───
// Use case: Mapping/dictionary structures
type Role = "admin" | "user" | "guest";
type Permissions = Record<Role, string[]>;
// Results in: { admin: string[]; user: string[]; guest: string[]; }

const permissions: Permissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"]
};


// ─── Readonly<T> - Make all properties read-only ───
type ReadonlyUser = Readonly<User>;
// All properties become: readonly id, readonly name, etc.

const user: ReadonlyUser = { id: 1, name: "Praveen", email: "test@test.com", password: "123" };
// user.name = "New";  ❌ Error: Cannot assign to 'name' because it is read-only


// ─── ReturnType<T> - Extract return type of function ───
function createUser() {
  return { id: 1, name: "Praveen" };
}

type UserType = ReturnType<typeof createUser>;
// Results in: { id: number; name: string; }


// ─── Exclude<T, U> - Remove types from union ───
type AllRoles = "admin" | "user" | "guest" | "superadmin";
type RegularRoles = Exclude<AllRoles, "superadmin">;
// Results in: "admin" | "user" | "guest"


// ─── Extract<T, U> - Extract types from union ───
type Events = "click" | "scroll" | "mousemove" | "keydown";
type MouseEvents = Extract<Events, "click" | "mousemove">;
// Results in: "click" | "mousemove"


// 📝 REAL-WORLD COMBO EXAMPLE:

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// For create: Omit auto-generated fields
type CreateProduct = Omit<Product, "id" | "createdAt" | "updatedAt">;

// For update: Make fields optional + omit id
type UpdateProduct = Partial<Omit<Product, "id">>;

// For public display: Pick only necessary fields
type ProductCard = Pick<Product, "id" | "name" | "price" | "inStock">;


// 🗣️ INTERVIEW ANSWER:
/*
"TypeScript provides utility types to transform existing types. The most common:

- Partial<T>: Makes all properties optional (useful for updates)
- Pick<T, K>: Select specific properties (useful for DTOs)
- Omit<T, K>: Remove properties (useful for hiding sensitive data)
- Record<K, T>: Create mapped types (useful for dictionaries)
- Readonly<T>: Make immutable

I use these constantly to avoid repeating type definitions. For example, I'll 
define a full User type, then use Pick for public profiles, Omit for safe DTOs, 
and Partial for update operations - all derived from the same base type."
*/




// ════════════════════════════════════════════════════════════════════════════════════
// 6️⃣ ENUMS (Named Constants)
// ════════════════════════════════════════════════════════════════════════════════════

// 🧠 SIMPLE EXPLANATION:
// Enum = Named set of constants (avoids magic strings/numbers)

// 🎨 REAL-WORLD ANALOGY:
// Traffic light colors: Instead of "red", "yellow", "green" strings everywhere,
// use TrafficLight.Red, TrafficLight.Yellow, TrafficLight.Green

// ─── Numeric Enum (default) ───
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right    // 3
}

const move = Direction.Up;  // 0

// Custom values:
enum StatusCode {
  Success = 200,
  NotFound = 404,
  ServerError = 500
}


// ─── String Enum (most common in real apps) ───
enum UserRole {
  Admin = "ADMIN",
  Moderator = "MODERATOR",
  User = "USER",
  Guest = "GUEST"
}

function checkPermission(role: UserRole) {
  if (role === UserRole.Admin) {
    console.log("Full access");
  }
}

checkPermission(UserRole.Admin);  // Type-safe!


// ⚠️ ENUM PITFALL & ALTERNATIVE:

// Problem with enums: They generate runtime code
enum Color { Red, Green, Blue }
// Compiles to JavaScript object - adds to bundle size

// ✅ ALTERNATIVE: Const Assertion (no runtime code!)
const ColorConst = {
  Red: "red",
  Green: "green",
  Blue: "blue"
} as const;

type ColorType = typeof ColorConst[keyof typeof ColorConst];
// ColorType = "red" | "green" | "blue"

// OR simpler:
type Status = "pending" | "approved" | "rejected";  // Union type (no enum needed)


// 🗣️ INTERVIEW ANSWER:
/*
"Enums define a set of named constants, improving readability and avoiding 
magic strings. String enums are most common in modern TypeScript apps because 
they're more debuggable (you see 'ADMIN' instead of 0 in logs).

However, enums generate runtime JavaScript code. For simpler cases, I prefer 
union types ('pending' | 'approved') or const objects with 'as const', which 
are type-only and don't add to bundle size.

I use enums when I need a true enumeration with bidirectional mapping or when 
working with external APIs that use numeric codes."
*/




// ════════════════════════════════════════════════════════════════════════════════════
// 7️⃣ CONDITIONAL TYPES (Advanced!)
// ════════════════════════════════════════════════════════════════════════════════════

// 🧠 SIMPLE EXPLANATION:
// If-else statements for types!

// 📝 BASIC SYNTAX:
type Result<T> = T extends string ? "It's a string" : "It's not a string";

type A = Result<string>;   // "It's a string"
type B = Result<number>;   // "It's not a string"


// 📝 PRACTICAL EXAMPLE - API Response Types:

// Depending on input type, return different response types
type ApiResponse<T> = T extends "user" 
  ? { id: number; name: string; }
  : T extends "post"
  ? { id: number; title: string; content: string; }
  : never;

type UserResponse = ApiResponse<"user">;  // { id: number; name: string; }
type PostResponse = ApiResponse<"post">;  // { id: number; title: string; content: string; }


// 📝 EXTRACT NON-NULLABLE TYPES:

type NonNullable<T> = T extends null | undefined ? never : T;

type Example = NonNullable<string | null | undefined>;  // string


// 📝 FLATTEN ARRAY TYPES:

type Flatten<T> = T extends Array<infer U> ? U : T;

type Str = Flatten<string[]>;  // string
type Num = Flatten<number>;    // number (not an array, so stays as-is)


// 🗣️ INTERVIEW ANSWER:
/*
"Conditional types let you create types that depend on a condition, similar 
to ternary operators. The syntax is: T extends U ? X : Y

They're powerful for creating utility types that behave differently based on 
input types. TypeScript's built-in NonNullable, Extract, and Exclude utilities 
all use conditional types under the hood.

I use them when building generic libraries or when I need type transformations 
that depend on the input type's structure."
*/




// ════════════════════════════════════════════════════════════════════════════════════
// 8️⃣ DISCRIMINATED UNIONS (Type-Safe State Machines)
// ════════════════════════════════════════════════════════════════════════════════════

// 🧠 SIMPLE EXPLANATION:
// Union types with a common "discriminator" property for type narrowing

// 🎯 REAL-WORLD ANALOGY:
// Package delivery status with different data per state:
// - "pending": No tracking info yet
// - "shipped": Has tracking number
// - "delivered": Has delivery date

// ❌ BAD: Optional properties everywhere (not type-safe)
interface Order {
  status: "pending" | "shipped" | "delivered";
  trackingNumber?: string;      // When is this present?
  deliveredAt?: Date;           // When is this present?
}

function showOrder(order: Order) {
  console.log(order.trackingNumber?.toUpperCase());  // Might be undefined!
}


// ✅ GOOD: Discriminated Union (type-safe!)
type PendingOrder = {
  status: "pending";
  // No tracking info
};

type ShippedOrder = {
  status: "shipped";
  trackingNumber: string;  // Always present when shipped!
};

type DeliveredOrder = {
  status: "delivered";
  trackingNumber: string;
  deliveredAt: Date;       // Always present when delivered!
};

type OrderState = PendingOrder | ShippedOrder | DeliveredOrder;

function showOrderSafe(order: OrderState) {
  // TypeScript knows exactly which properties exist based on 'status'
  switch (order.status) {
    case "pending":
      console.log("Order is pending");
      // order.trackingNumber  ❌ Error: Property doesn't exist on PendingOrder
      break;
      
    case "shipped":
      console.log("Tracking:", order.trackingNumber.toUpperCase());  // ✅ Safe!
      // order.deliveredAt  ❌ Error: Property doesn't exist on ShippedOrder
      break;
      
    case "delivered":
      console.log("Delivered on:", order.deliveredAt.toLocaleDateString());  // ✅ Safe!
      console.log("Tracking was:", order.trackingNumber);  // ✅ Also available!
      break;
  }
}


// 📝 ANOTHER EXAMPLE - API Response:

type LoadingState = {
  status: "loading";
};

type SuccessState<T> = {
  status: "success";
  data: T;
};

type ErrorState = {
  status: "error";
  error: string;
};

type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState;

function renderData<T>(state: AsyncState<T>) {
  switch (state.status) {
    case "loading":
      return "Loading...";
    case "success":
      return state.data;  // ✅ TypeScript knows .data exists here!
    case "error":
      return `Error: ${state.error}`;  // ✅ TypeScript knows .error exists here!
  }
}


// 🗣️ INTERVIEW ANSWER:
/*
"Discriminated unions use a common literal type property (called a discriminator) 
to safely narrow union types. Each variant has the same discriminator property 
with a different literal value.

This pattern is extremely useful for state machines, API responses, or any 
situation where an object's shape depends on a status field. TypeScript 
automatically narrows the type in switch statements or if checks, giving you 
complete type safety and autocomplete.

It's much better than using optional properties everywhere because it makes 
impossible states unrepresentable - you can't have a 'pending' order with a 
tracking number."
*/




// ════════════════════════════════════════════════════════════════════════════════════
// 9️⃣ OPTIONAL CHAINING (?.) & NULLISH COALESCING (??)
// ════════════════════════════════════════════════════════════════════════════════════

// 🧠 SIMPLE EXPLANATION:
// ?. = Safe property access (won't crash if null/undefined)
// ?? = Default value ONLY for null/undefined (not for 0, false, or "")

// ─── Optional Chaining (?.) ───

type User = {
  name: string;
  address?: {
    street?: string;
    city?: string;
  };
};

const user: User = { name: "Praveen" };

// ❌ Without optional chaining (crashes!):
// console.log(user.address.city.toUpperCase());  // TypeError: Cannot read property 'city' of undefined

// ✅ With optional chaining (safe):
console.log(user.address?.city?.toUpperCase());  // undefined (no crash!)


// ─── Nullish Coalescing (??) ───

// ❌ Problem with || operator:
const count1 = 0;
const result1 = count1 || 10;  // 10 (treats 0 as falsy!)

const message1 = "";
const result2 = message1 || "Default";  // "Default" (treats "" as falsy!)

// ✅ Solution with ?? (only null/undefined are "nullish"):
const count2 = 0;
const result3 = count2 ?? 10;  // 0 (0 is valid!)

const message2 = "";
const result4 = message2 ?? "Default";  // "" (empty string is valid!)

const value = null;
const result5 = value ?? "Default";  // "Default" (null is nullish!)


// 📝 COMBINED EXAMPLE:

type Config = {
  timeout?: number;
  retries?: number;
  endpoint?: {
    url?: string;
    port?: number;
  };
};

function connect(config: Config) {
  // Use provided value, or defaults ONLY if null/undefined
  const timeout = config.timeout ?? 5000;        // 0 is valid, use ?? not ||
  const retries = config.retries ?? 3;
  const url = config.endpoint?.url ?? "http://localhost";
  const port = config.endpoint?.port ?? 8080;    // 0 would be valid (weird but possible)
  
  console.log(`Connecting to ${url}:${port} (timeout: ${timeout}ms, retries: ${retries})`);
}

connect({});  // Uses all defaults
connect({ timeout: 0, retries: 0 });  // Uses 0 (not defaults!)


// 🗣️ INTERVIEW ANSWER:
/*
"Optional chaining (?.) safely accesses nested properties without throwing 
errors if an intermediate value is null or undefined. It short-circuits and 
returns undefined.

Nullish coalescing (??) provides default values specifically for null or 
undefined, unlike the || operator which treats 0, false, and empty strings as 
falsy. This is crucial when 0 or empty string are valid values.

I use ?. constantly when working with optional nested data (API responses, 
user profiles). I use ?? when providing defaults where 0 or false are valid 
values, like timeouts, page numbers, or boolean flags."
*/




// ════════════════════════════════════════════════════════════════════════════════════
// 🔟 ADVANCED TOPICS (Senior Level!)
// ════════════════════════════════════════════════════════════════════════════════════

// ─── 1. Mapped Types ───
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Optional<T> = {
  [P in keyof T]?: T[P];
};


// ─── 2. Template Literal Types ───
type HTTPMethod = "GET" | "POST";
type Endpoint = "/users" | "/posts";
type Route = `${HTTPMethod} ${Endpoint}`;
// Results in: "GET /users" | "GET /posts" | "POST /users" | "POST /posts"


// ─── 3. Const Assertions ───
const config = {
  endpoint: "https://api.example.com",
  timeout: 5000
} as const;
// config.endpoint is now type "https://api.example.com" (literal), not string


// ─── 4. Type Assertions ───
const someValue: unknown = "hello";
const strLength = (someValue as string).length;  // Type assertion


// ─── 5. Never Type (for exhaustiveness checking) ───
type Shape = Circle | Square | Triangle;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.size ** 2;
    case "triangle":
      return (shape.base * shape.height) / 2;
    default:
      const _exhaustive: never = shape;  // Compile error if we missed a case!
      return _exhaustive;
  }
}




// ════════════════════════════════════════════════════════════════════════════════════
// 🎯 MOST ASKED INTERVIEW QUESTIONS & ANSWERS
// ════════════════════════════════════════════════════════════════════════════════════

/*
Q1: "What's the difference between interface and type?"
A: "Both define object shapes. Interface is better for OOP patterns and supports 
    declaration merging. Type is more versatile - it can represent unions, tuples, 
    and advanced types. I use interface for public APIs and type for everything else."

Q2: "Why use unknown instead of any?"
A: "any disables type checking completely, unknown forces you to check the type 
    before using it. unknown is type-safe - perfect for API responses or user input 
    where the type is uncertain."

Q3: "What are generics and when do you use them?"
A: "Generics are type parameters that make components reusable across different types 
    while maintaining type safety. I use them for utility functions, API wrappers, 
    and any code that should work with multiple types without duplication."

Q4: "Explain type guards."
A: "Type guards narrow union types at runtime. Four types: typeof for primitives, 
    instanceof for classes, in for properties, and custom predicates with 'is'. 
    They're essential for working with union types safely."

Q5: "What utility types do you use most?"
A: "Partial for update operations, Pick for DTOs, Omit for hiding sensitive fields, 
    Record for dictionaries, and Readonly for immutable data. They help avoid 
    repeating type definitions."

Q6: "What are discriminated unions?"
A: "Union types with a common discriminator property (usually 'type' or 'status') 
    that enables type-safe narrowing. Perfect for state machines, API responses, 
    or Redux actions. Makes impossible states unrepresentable."

Q7: "When would you use enum vs union type?"
A: "Union types ('pending' | 'approved') are simpler and have no runtime cost. 
    I prefer them for most cases. Enums are useful when you need reverse mapping 
    (value to name) or working with numeric codes from external systems."

Q8: "How do you handle null/undefined safely?"
A: "Use strictNullChecks, optional chaining (?.) for nested access, nullish 
    coalescing (??) for defaults, and always type properties correctly with ? 
    for optional fields."

Q9: "What's the difference between type assertion and type casting?"
A: "TypeScript only has assertions (as keyword), not casting. Assertions tell 
    the compiler 'trust me, I know the type' but don't transform the value. 
    Use sparingly, prefer type guards instead."

Q10: "How do you make TypeScript work with third-party JS libraries?"
A: "@types packages from DefinitelyTyped, create .d.ts declaration files, or 
    use ambient declarations with 'declare module'."
*/




// ════════════════════════════════════════════════════════════════════════════════════
// 🎓 MEMORIZATION CHEATSHEET (Read Before Interview!)
// ════════════════════════════════════════════════════════════════════════════════════

/*
INTERFACE VS TYPE:
  Interface: OOP, extends, declaration merging
  Type: unions, tuples, primitives, mapped types
  Rule: Interface for objects, Type for everything else

ANY VS UNKNOWN:
  any: Turn off TypeScript (dangerous)
  unknown: Force type checking (safe)
  Rule: Never use any, prefer unknown

GENERICS:
  <T> = Type placeholder
  Use: Reusable code with type safety
  Rule: Use when function/class works with multiple types

TYPE GUARDS:
  typeof, instanceof, in, custom (value is Type)
  Use: Narrow union types at runtime
  Rule: Always check before using union types

UTILITY TYPES:
  Partial (optional), Pick (select), Omit (remove), Record (map)
  Use: Transform existing types
  Rule: DRY - derive types instead of duplicating

DISCRIMINATED UNIONS:
  Common discriminator property (status/type)
  Use: State machines, API responses
  Rule: Make impossible states impossible

OPTIONAL/NULLISH:
  ?. Safe access (no crash)
  ?? Default for null/undefined only
  Rule: Use both together for safe nested access
*/




// ════════════════════════════════════════════════════════════════════════════════════
// 🚀 FINAL TIPS FOR INTERVIEW
// ════════════════════════════════════════════════════════════════════════════════════

/*
1. ALWAYS MENTION REAL-WORLD USE CASES
   ✅ "I used discriminated unions for our API response handling..."
   ❌ "Discriminated unions are when you have a common property..."

2. SHOW TRADE-OFFS
   ✅ "Enums generate runtime code, so I prefer union types for simpler cases..."
   ❌ "Enums are the best way to define constants..."

3. CONNECT TO TYPE SAFETY
   ✅ "This prevents runtime errors by catching issues at compile time..."
   ❌ "This is how you write TypeScript..."

4. MENTION MODERN PRACTICES
   ✅ "We use strict mode with strictNullChecks..."
   ❌ "We sometimes use any when we're not sure..."

5. BE HONEST ABOUT COMPLEXITY
   ✅ "For complex conditional types, I reference the TypeScript docs..."
   ❌ "I write complex conditional types from scratch..."

GOOD LUCK! 🎉
*/

