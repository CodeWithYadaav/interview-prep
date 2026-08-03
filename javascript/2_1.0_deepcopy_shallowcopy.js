/**
 * ============================================================================
 * CHEAT SHEET: Shallow Copy vs. Deep Copy in JavaScript
 * ============================================================================
 *
 * GOLDEN RULE:
 *  - Shallow Copy -> Copies top-level properties; nested objects/arrays remain SHARED (by reference).
 *  - Deep Copy    -> Copies all levels recursively; creates a completely INDEPENDENT clone.
 */

/* ============================================================================
 * 1. SHALLOW COPY
 * ============================================================================
 * Top-level values are independent, but nested references point to the same memory space.
 */

const originalPerson = {
  name: "Alice", // Top-level
  address: { city: "Mumbai" } // Nested object
};

// Common Shallow Copy Methods:
const shallow1 = { ...originalPerson };                  // Object spread
const shallow2 = Object.assign({}, originalPerson);      // Object.assign
const arrShallow = [...[1, 2, { a: 3 }]];               // Array spread
const sliceShallow = [1, 2, 3].slice();                  // Array slice

// Modification Effect:
shallow1.name = "Bob";               // Top-level change -> Independent
shallow1.address.city = "Delhi";     // Nested change    -> MUTATES originalPerson too!


/* ============================================================================
 * 2. DEEP COPY
 * ============================================================================
 * Every level is duplicated; zero reference sharing.
 */

const originalComplex = {
  name: "Charlie",
  address: { city: "Bangalore" }
};

// Method A: JSON.parse(JSON.stringify(obj)) [Simple Objects]
const deep1 = JSON.parse(JSON.stringify(originalComplex));

// Method B: structuredClone(obj) [Modern JS / Node 17+ / Recommended]
const deep2 = structuredClone(originalComplex);

// Method C: Custom Recursive Deep Clone (Interview Implementation)
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(item => deepClone(item));

  const cloned = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}
const deep3 = deepClone(originalComplex);

// Modification Effect:
deep1.address.city = "Hyderabad";
// originalComplex.address.city remains "Bangalore" (Unchanged!)


/* ============================================================================
 * 3. LIMITATIONS OF JSON.stringify FOR DEEP COPY
 * ============================================================================
 * JSON serialization fails or drops specific data types:
 */

const problematicObj = {
  fn: function() {},         // Lost (becomes undefined / removed)
  undef: undefined,          // Lost (removed)
  sym: Symbol("test"),       // Lost (removed)
  date: new Date(),          // Converted to ISO String (loses Date instance)
  nanVal: NaN,               // Converted to null
  infVal: Infinity           // Converted to null
};

// Circular Reference Issue:
const circularObj = { name: "Loop" };
circularObj.self = circularObj;

// JSON.stringify(circularObj);
// ❌ THROWS ERROR: "TypeError: Converting circular structure to JSON"

// Fix for Circular References & Special Data Types:
const safeDeepCopy = structuredClone(circularObj); // ✅ Works natively!


/* ============================================================================
 * 4. QUICK COMPARISON MATRIX
 * ============================================================================
 *
 * | Feature          | Shallow Copy           | Deep Copy                   |
 * |------------------|------------------------|-----------------------------|
 * | Top-Level Props  | Independent            | Independent                 |
 * | Nested Objects   | Shared (Reference)     | Independent (New Copy)      |
 * | Performance      | Fast & Lightweight     | Slower (More memory usage)  |
 * | Preferred Syntax | `{ ...obj }`           | `structuredClone(obj)`      |
 * | Primary Use Case | Modifying top-level    | Immutable state updates     |
 */


/* ============================================================================
 * 5. TOP INTERVIEW QUESTIONS & QUICK ANSWERS
 * ============================================================================
 *
 * Q1: What happens when you shallow copy an array of objects and mutate an item?
 * A: The change reflects in the original array because array elements (objects)
 *    are held by reference.
 *
 * Q2: What is the modern standard way to deep copy in JavaScript?
 * A: `structuredClone()`. It natively supports circular references, TypedArrays,
 *    Sets, Maps, and Dates.
 *
 * Q3: When should you use shallow copy over deep copy?
 * A: When working with flat objects or when performance is critical and nested
 *    mutations will not occur.
 *
 * Q4: Why shouldn't you use JSON.parse(JSON.stringify()) for objects with methods?
 * A: Functions are not valid JSON data types, so `JSON.stringify()` silently drops them.
 */
