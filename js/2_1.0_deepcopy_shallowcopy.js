// ════════════════════════════════════════════════════════════════════════════════════
// SHALLOW COPY vs DEEP COPY - Simple & Complete Guide
// ════════════════════════════════════════════════════════════════════════════════════

// QUICK SUMMARY:
// Shallow Copy -> Copies top level only, nested objects are SHARED (references)
// Deep Copy    -> Copies everything, completely INDEPENDENT copy

// ════════════════════════════════════════════════════════════════════════════════════
// 1. SHALLOW COPY - Top Level Only
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 1. SHALLOW COPY BASICS ===\n");

// Original object with nested structure
const person1 = {
  name: "Alice",
  age: 25,
  address: {
    city: "Mumbai",
    country: "India"
  }
};

console.log("Original:", person1);

// Method 1: Spread operator (...)
const shallowCopy1 = { ...person1 };

// Method 2: Object.assign()
const shallowCopy2 = Object.assign({}, person1);

// Modify top-level property
shallowCopy1.name = "Bob";
console.log("\nAfter changing name:");
console.log("Original name:", person1.name);      // "Alice" (unchanged)
console.log("Copy name:", shallowCopy1.name);     // "Bob" (changed)

// Modify nested property
shallowCopy1.address.city = "Delhi";
console.log("\nAfter changing nested city:");
console.log("Original city:", person1.address.city);      // "Delhi" (CHANGED!)
console.log("Copy city:", shallowCopy1.address.city);     // "Delhi" (changed)

// SIMPLE RULE:
// Shallow copy creates new object but SHARES nested objects
// Top-level: Independent
// Nested: Shared (both point to same object)

// ════════════════════════════════════════════════════════════════════════════════════
// 2. DEEP COPY - Everything Independent
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 2. DEEP COPY BASICS ===\n");

const person2 = {
  name: "Charlie",
  age: 30,
  address: {
    city: "Bangalore",
    country: "India"
  }
};

console.log("Original:", person2);

// Method: JSON.parse + JSON.stringify
const deepCopy = JSON.parse(JSON.stringify(person2));

// Modify top-level property
deepCopy.name = "David";
console.log("\nAfter changing name:");
console.log("Original name:", person2.name);      // "Charlie" (unchanged)
console.log("Deep copy name:", deepCopy.name);    // "David" (changed)

// Modify nested property
deepCopy.address.city = "Hyderabad";
console.log("\nAfter changing nested city:");
console.log("Original city:", person2.address.city);      // "Bangalore" (UNCHANGED!)
console.log("Deep copy city:", deepCopy.address.city);    // "Hyderabad" (changed)

// SIMPLE RULE:
// Deep copy creates completely independent copy
// Top-level: Independent
// Nested: Independent (separate objects)

// ════════════════════════════════════════════════════════════════════════════════════
// 3. VISUAL COMPARISON
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 3. VISUAL COMPARISON ===\n");

const original = {
  name: "Eve",
  score: 100,
  meta: { level: 5 }
};

// Shallow copy
const shallow = { ...original };

// Deep copy
const deep = JSON.parse(JSON.stringify(original));

console.log("Before modification:");
console.log("Original:", original);
console.log("Shallow:", shallow);
console.log("Deep:", deep);

// Modify nested object
shallow.meta.level = 10;
deep.meta.level = 20;

console.log("\nAfter modification:");
console.log("Original meta.level:", original.meta.level);  // 10 (affected by shallow!)
console.log("Shallow meta.level:", shallow.meta.level);    // 10
console.log("Deep meta.level:", deep.meta.level);          // 20 (independent)

// Why?
console.log("\nReference check:");
console.log("original.meta === shallow.meta:", original.meta === shallow.meta);  // true (same object)
console.log("original.meta === deep.meta:", original.meta === deep.meta);        // false (different objects)

// ════════════════════════════════════════════════════════════════════════════════════
// 4. SHALLOW COPY METHODS
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 4. SHALLOW COPY METHODS ===\n");

const data = {
  id: 1,
  info: { status: "active" }
};

// Method 1: Spread operator
const copy1 = { ...data };
console.log("Spread operator:", copy1);

// Method 2: Object.assign()
const copy2 = Object.assign({}, data);
console.log("Object.assign:", copy2);

// Method 3: Array spread (for arrays)
const arr = [1, 2, { nested: 3 }];
const arrCopy1 = [...arr];
console.log("Array spread:", arrCopy1);

// Method 4: Array.slice() (for arrays)
const arrCopy2 = arr.slice();
console.log("Array slice:", arrCopy2);

// All are shallow copies
arrCopy1[2].nested = 999;
console.log("\nAfter modifying nested in array copy:");
console.log("Original array:", arr);       // nested is 999 (affected!)
console.log("Copy array:", arrCopy1);

// ════════════════════════════════════════════════════════════════════════════════════
// 5. DEEP COPY METHODS
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 5. DEEP COPY METHODS ===\n");

const complex = {
  name: "Test",
  nested: {
    deep: {
      value: 42
    }
  },
  array: [1, 2, 3]
};

// Method 1: JSON.parse + JSON.stringify (most common)
const deepCopy1 = JSON.parse(JSON.stringify(complex));
console.log("JSON method:", deepCopy1);

// Method 2: structuredClone (modern browsers & Node 17+)
const deepCopy2 = structuredClone(complex);
console.log("structuredClone:", deepCopy2);

// Method 3: Recursive function (custom implementation)
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  const cloned = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

const deepCopy3 = deepClone(complex);
console.log("Custom recursive:", deepCopy3);

// Verify independence
deepCopy1.nested.deep.value = 100;
deepCopy2.nested.deep.value = 200;
deepCopy3.nested.deep.value = 300;

console.log("\nAfter modifications:");
console.log("Original:", complex.nested.deep.value);   // 42 (unchanged)
console.log("Copy1:", deepCopy1.nested.deep.value);    // 100
console.log("Copy2:", deepCopy2.nested.deep.value);    // 200
console.log("Copy3:", deepCopy3.nested.deep.value);    // 300

// ════════════════════════════════════════════════════════════════════════════════════
// 6. JSON METHOD LIMITATIONS
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 6. JSON METHOD LIMITATIONS ===\n");

const problematic = {
  date: new Date(),
  func: function () { return "hello"; },
  undef: undefined,
  symbol: Symbol("test"),
  nan: NaN,
  infinity: Infinity
};

console.log("Original:", problematic);

const jsonCopy = JSON.parse(JSON.stringify(problematic));
console.log("JSON copy:", jsonCopy);

console.log("\nWhat happened?");
console.log("date became:", typeof jsonCopy.date);           // string (not Date object)
console.log("func became:", jsonCopy.func);                  // undefined (lost!)
console.log("undef became:", jsonCopy.undef);                // undefined (lost!)
console.log("symbol became:", jsonCopy.symbol);              // undefined (lost!)
console.log("nan became:", jsonCopy.nan);                    // null
console.log("infinity became:", jsonCopy.infinity);          // null

// JSON.stringify CANNOT handle:
// - Functions
// - undefined
// - Symbols
// - Dates (converts to string)
// - NaN/Infinity (converts to null)
// - Circular references

// SIMPLE RULE:
// JSON method works for plain objects with simple data types only

// ════════════════════════════════════════════════════════════════════════════════════
// 7. HANDLING CIRCULAR REFERENCES
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 7. CIRCULAR REFERENCES ===\n");

const circular = { name: "Circular" };
circular.self = circular;  // Points to itself

console.log("Object with circular reference:", circular.name);

// JSON.stringify fails with circular references
try {
  JSON.parse(JSON.stringify(circular));
} catch (error) {
  console.log("JSON error:", error.message);  // Converting circular structure to JSON
}

// structuredClone handles circular references
const circularCopy = structuredClone(circular);
console.log("structuredClone works:", circularCopy.name);
console.log("Circular preserved:", circularCopy.self === circularCopy);  // true

// ════════════════════════════════════════════════════════════════════════════════════
// 8. PRACTICAL EXAMPLES
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 8. PRACTICAL EXAMPLES ===\n");

// Example 1: State management (use deep copy to avoid mutation)
const appState = {
  user: { name: "John", role: "admin" },
  settings: { theme: "dark", notifications: true }
};

function updateUserName(state, newName) {
  // Deep copy to avoid mutating original state
  const newState = JSON.parse(JSON.stringify(state));
  newState.user.name = newName;
  return newState;
}

const updatedState = updateUserName(appState, "Jane");
console.log("Original state:", appState.user.name);    // "John" (unchanged)
console.log("New state:", updatedState.user.name);     // "Jane"

// Example 2: Array of objects (shopping cart)
const cart = [
  { id: 1, product: "Laptop", price: 1000 },
  { id: 2, product: "Mouse", price: 50 }
];

// Shallow copy array (items still shared)
const cartCopy1 = [...cart];
cartCopy1[0].price = 1200;
console.log("\nShallow copy effect:");
console.log("Original cart price:", cart[0].price);      // 1200 (affected!)

// Deep copy array (complete independence)
const cart2 = [
  { id: 1, product: "Laptop", price: 1000 },
  { id: 2, product: "Mouse", price: 50 }
];
const cartCopy2 = JSON.parse(JSON.stringify(cart2));
cartCopy2[0].price = 1500;
console.log("Deep copy effect:");
console.log("Original cart2 price:", cart2[0].price);    // 1000 (unchanged)

// ════════════════════════════════════════════════════════════════════════════════════
// COMPARISON TABLE
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== COMPARISON TABLE ===\n");

const table = `
┌─────────────────────┬──────────────────────┬──────────────────────┐
│      Feature        │    Shallow Copy      │      Deep Copy       │
├─────────────────────┼──────────────────────┼──────────────────────┤
│ Top-level props     │ Copied (independent) │ Copied (independent) │
│ Nested objects      │ Shared (reference)   │ Copied (independent) │
│ Speed               │ Fast                 │ Slower               │
│ Memory usage        │ Less                 │ More                 │
│ Syntax              │ {...obj}             │ JSON.parse(...)      │
│ Alternative         │ Object.assign()      │ structuredClone()    │
│ Use when            │ No nested mutation   │ Need full isolation  │
└─────────────────────┴──────────────────────┴──────────────────────┘
`;

console.log(table);

// ════════════════════════════════════════════════════════════════════════════════════
// INTERVIEW QUESTIONS & ANSWERS
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== COMMON INTERVIEW QUESTIONS ===\n");

// Q1: What's the difference between shallow and deep copy?
// A: Shallow copy only copies the first level. Nested objects are shared.
//    Deep copy creates a completely independent copy of all levels.

// Q2: Which method would you use for deep copying in production?
// A: structuredClone() for modern environments (best performance)
//    JSON.parse(JSON.stringify()) for simple objects
//    Libraries like lodash's _.cloneDeep() for complex cases

// Q3: What are the limitations of JSON.stringify for deep copy?
// A: Cannot handle functions, undefined, symbols, dates (converts to string),
//    NaN/Infinity (converts to null), and circular references.

// Q4: When would you use shallow copy?
// A: When you only need to modify top-level properties and nested objects
//    don't need to be changed, or when performance is critical.

// Q5: How do you deep copy an array of objects?
// A: JSON.parse(JSON.stringify(arr)) or structuredClone(arr)

// Q6: What happens if you shallow copy and modify nested property?
// A: The original object's nested property also changes because they share
//    the same reference.

// ════════════════════════════════════════════════════════════════════════════════════
// BEST PRACTICES
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== BEST PRACTICES ===\n");

// DO: Use shallow copy when nested objects don't need modification
const config = { api: "url", settings: { timeout: 5000 } };
const configCopy = { ...config };  // Fast and efficient

// DO: Use deep copy when working with state in React/Redux
const state = { user: { name: "Test" }, data: [1, 2, 3] };
const newState = JSON.parse(JSON.stringify(state));  // Safe for state updates

// DO: Use structuredClone for modern applications
if (typeof structuredClone !== "undefined") {
  const modernCopy = structuredClone(state);
  console.log("Using structuredClone (recommended)");
}

// DON'T: Don't use JSON method for objects with functions or dates
const withFunction = { fn: () => { } };
// const bad = JSON.parse(JSON.stringify(withFunction)); // fn will be lost!

// DON'T: Don't shallow copy when you need to modify nested data
const userData = { profile: { age: 25 } };
const badCopy = { ...userData };
// badCopy.profile.age = 30; // This affects original!

console.log("\nRemember:");
console.log("- Shallow copy: Fast, but nested objects are shared");
console.log("- Deep copy: Slower, but completely independent");
console.log("- Choose based on your use case and data structure");

// ════════════════════════════════════════════════════════════════════════════════════
// QUICK MEMORIZATION TRICK
// ════════════════════════════════════════════════════════════════════════════════════

/*

Think of copying a house:

Shallow Copy = Copy the house address
- You get a new address card
- But both cards point to the SAME house
- Changes inside the house affect everyone

Deep Copy = Build a completely new house
- Exact replica of the original
- But it's a SEPARATE building
- Changes in one house don't affect the other

GOLDEN RULE for interviews:
"Shallow shares nested, deep duplicates everything"

*/
