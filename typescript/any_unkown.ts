// 🆚 any vs unknown in TypeScript
// Both any and unknown are used when you don't know the type of a variable — but they behave differently.

// ✅ any – Do anything, but not safe
// You can do anything with a variable typed as any.
// TypeScript won’t stop you, even if the code is wrong.
// It’s like turning off type checking.

let value: any = "Hello";
value = 10;
value.toUpperCase(); // ✅ No error, ❌ but could crash if value isn't a string

// 🔸 Use any when:
//     You're working with old JS code
//     You want zero restrictions (but be careful)

// -----------------------------------------------------------------------------------------------------

// ✅ unknown – Must check type first, safer
// unknown means: “I don’t know the type, but I want safety.”
// You can’t use it directly — TypeScript forces you to check the type first.

let values: unknown = "Hello";
// value.toUpperCase(); ❌ Error: You must check type

if (typeof values === "string") {
  values.toUpperCase(); // ✅ Safe
}

// 🔸 Use unknown when:
// The type is unclear (e.g., from user input, APIs)
// You want to enforce type checking
