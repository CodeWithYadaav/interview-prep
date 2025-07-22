// What is optional chaining (?.) and nullish coalescing (??) in TypeScript?
// Provide an example where both features would be useful in handling nullable or undefined values.



// ✅ Optional Chaining (?.)
// It safely accesses a property without throwing an error if an intermediate value is null or undefined.

const user = {
  name: "Praveen",
  address: {
    city: "Mumbai",
  },
};

console.log(user.address?.city); // "Mumbai"
console.log(user.contact?.phone); // undefined (no error thrown)



// ✅ Nullish Coalescing (??)
// It returns the right-hand value only if the left-hand side is null or undefined (not '', 0, or false).

const input = null;
const fallback = input ?? "Default value"; // "Default value"



//Combined
// type User = {
//   profile?: {
//     email?: string;
//   };
// };

// const user1: User = {};
// const user2: User = {
//   profile: {
//     email: ""
//   }
// };

// const email1 = user1.profile?.email ?? "No email provided"; // -> "No email provided"
// const email2 = user2.profile?.email ?? "No email provided"; // -> "" (empty string is NOT nullish)

// console.log(email1); // "No email provided"
// console.log(email2); // ""






// 🧠 Why Use Both?
// Using ?. avoids crashing when accessing deep nested optional properties.
// Using ?? gives you precise control over "missing or unset" values.









