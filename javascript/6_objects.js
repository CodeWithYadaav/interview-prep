/**
 * ============================================================================
 * CHEAT SHEET: Objects in JavaScript (Basics, Advanced, & Interview Questions)
 * ============================================================================
 *
 * CORE MEMORY RULES:
 *  1. Objects are reference types (variables store memory addresses, not actual values).
 *  2. Primitive values compare by value (`1 === 1`), objects compare by reference (`{} !== {}`).
 *  3. Keys are always converted to strings or Symbols under the hood.
 */

/* ============================================================================
 * 1. OBJECT BASICS & KEY CONSTRAINTS
 * ============================================================================
 */

// Basic creation, modification, and deletion
const userBasics = {
  name: "praveen",
  age: 30
};

userBasics.name = 'yadav';
console.log(userBasics.name); // 'yadav'

delete userBasics.age;
console.log(userBasics); // { name: 'yadav' }


// ----------------------------------------------------------------------------
// TRICK QUESTION: Deleting local variables vs object properties
// ----------------------------------------------------------------------------
const func = (function (a) {
  delete a; // ❌ `delete` only works on object properties, NOT local variables/arguments!
  return a;
})(5);

console.log(func);
// 🎯 Output: 5
// 💡 Explanation: `delete` has no effect on local function parameters/variables. It returns `false` silently in non-strict mode.


// ----------------------------------------------------------------------------
// Multi-word Properties & Square Bracket Access
// ----------------------------------------------------------------------------
const userMulti = {
  name: "praveen",
  age: 30,
  "like the video": true // Multi-word key must be enclosed in quotes
};

// Accessing multi-word properties
console.log(userMulti['like the video']); // true

// Deleting multi-word properties
console.log(delete userMulti['like the video']); // true
console.log(userMulti); // { name: 'praveen', age: 30 }


// ----------------------------------------------------------------------------
// Adding Dynamic Properties (Computed Property Names)
// ----------------------------------------------------------------------------
const property = 'firstName';
const nameVal = 'praveen';

// ❌ Incorrect: Treats 'property' literally as the key
const userStatic = {
  property: nameVal
};
console.log(userStatic); // { property: 'praveen' }

// ✅ Correct: Using computed property syntax `[key]`
const userDynamic = {
  [property]: nameVal
};
console.log(userDynamic); // { firstName: 'praveen' }


// ----------------------------------------------------------------------------
// Looping over Objects (for...in)
// ----------------------------------------------------------------------------
const userLoop = {
  name: "praveen",
  age: 30,
  isTotallyAwesome: true
};

for (let key in userLoop) {
  console.log(key);          // Logs key names: "name", "age", "isTotallyAwesome"
  console.log(userLoop[key]); // Logs values: "praveen", 30, true
}


/* ============================================================================
 * 2. OBJECT DESTRUCTURING & REST PARAMETERS
 * ============================================================================
 */

let userDestruct = {
  name: "praveen",
  age: 30
};

// Basic destructuring
const { name } = userDestruct;
console.log(name); // "praveen"

// Renaming during destructuring
const nameConflict = "yadav";
const { name: username } = userDestruct; // Renames 'name' to 'username'
console.log(username); // "praveen"

// Nested Destructuring
let userNested = {
  name: "praveen yadav",
  age: 30,
  fullName: {
    first: "praveen",
    last: "yadav"
  }
};

const { fullName: { first } } = userNested;
console.log(first); // "praveen"


// ----------------------------------------------------------------------------
// TRICK QUESTION: Rest Parameter Placement
// ----------------------------------------------------------------------------

// ❌ SyntaxError: Rest parameter must be the LAST parameter in a function signature
/*
function getItemsInvalid(fruitList, ...args, favoriteFruits) {
    return [...fruitList, ...args, favoriteFruits]
}
*/

// ✅ Correct Syntax:
function getItems(fruitList, favoriteFruits, ...args) {
  return [...fruitList, favoriteFruits, ...args];
}

console.log(getItems(['banana', 'apple'], 'pear', 'orange', 'cherry'));
// 🎯 Output: ['banana', 'apple', 'pear', 'orange', 'cherry']


/* ============================================================================
 * 3. COPYING OBJECTS: SHALLOW VS DEEP COPY
 * ============================================================================
 */

let userCopy = {
  name: "praveen",
  age: 30
};

// 1. Shallow Copy (using Object.assign or Spread Operator)
// Copies top-level primitive values. Nested objects still share references!
const shallowClone = Object.assign({}, userCopy);
shallowClone.name = "yadav";
console.log(userCopy.name);    // "praveen" (Original untouched)
console.log(shallowClone.name); // "yadav"

// 2. Deep Copy (using JSON serialization)
// Creates a completely independent copy, breaking all nested references.
// (Note: Strips functions, undefined, and Symbol values)
const deepClone = JSON.parse(JSON.stringify(userCopy));
deepClone.name = 'pika';
console.log(userCopy.name);  // "praveen"
console.log(deepClone.name); // "pika"


/* ============================================================================
 * 4. OUTPUT-BASED INTERVIEW QUESTIONS
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// Q1: Duplicate Keys in Object Literals
// ----------------------------------------------------------------------------
const objDuplicate = {
  a: "one",
  b: "two",
  a: "three"
};

console.log(objDuplicate);

/*
 * 🎯 Output: { a: "three", b: "two" }
 * 💡 Explanation: If two keys have the same name, the last specified key overwrites
 *    the previous one. The key position stays where it was first defined.
 */


// ----------------------------------------------------------------------------
// Q2: Multiply Numeric Properties by 2
// ----------------------------------------------------------------------------
let nums = {
  a: 100,
  b: 200,
  title: "My Nums"
};

function multiplyNumeric(obj) {
  for (let key in obj) {
    if (typeof obj[key] === "number") {
      obj[key] *= 2;
    }
  }
}

multiplyNumeric(nums);
console.log(nums);

/*
 * 🎯 Output: { a: 200, b: 400, title: "My Nums" }
 * 💡 Explanation: Iterates through keys, checks if value is a number using `typeof`,
 *    and mutates the numeric values directly.
 */


// ----------------------------------------------------------------------------
// Q3: Object Keys Coercion to String (`[object Object]`)
// ----------------------------------------------------------------------------
const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a[b]);

/*
 * 🎯 Output: 456
 * 💡 Explanation: Object keys MUST be strings or Symbols. When passing an object
 *    as a key (`a[b]`), JS converts it to a string via `.toString()`, yielding `"[object Object]"`.
 *    Therefore:
 *      a[b] -> a["[object Object]"] = 123
 *      a[c] -> a["[object Object]"] = 456 (overwrites 123!)
 *    So `a[b]` retrieves `a["[object Object]"]`, which is 456.
 */


// ----------------------------------------------------------------------------
// Q4: JSON.stringify and JSON.parse Use Case
// ----------------------------------------------------------------------------
const userJSON = {
  name: "praveen",
  age: 30
};

const strObj = JSON.stringify(userJSON); // Convert Object to JSON String
console.log(strObj); // '{"name":"praveen","age":30}'

const parsedObj = JSON.parse(strObj);   // Convert JSON String back to Object
console.log(parsedObj); // { name: 'praveen', age: 30 }

/*
 * 💡 Use Case: LocalStorage can only store strings. Objects must be stringified
 *    before storing (`localStorage.setItem('user', JSON.stringify(user))`)
 *    and parsed upon retrieval.
 */


// ----------------------------------------------------------------------------
// Q5: String Spreading
// ----------------------------------------------------------------------------
console.log([... 'Lydia']);

/*
 * 🎯 Output: ['L', 'y', 'd', 'i', 'a']
 * 💡 Explanation: Strings are iterable. The spread operator (`...`) unpacks
 *    each character into individual array elements.
 */


// ----------------------------------------------------------------------------
// Q6: Object Spreading & Merging
// ----------------------------------------------------------------------------
const userBase = { name: "praveen", age: 30 };
const admin = { admin: true, ...userBase };
console.log(admin);

/*
 * 🎯 Output: { admin: true, name: "praveen", age: 30 }
 * 💡 Explanation: Spreads the properties of `userBase` directly into the `admin` object.
 */


// ----------------------------------------------------------------------------
// Q7: JSON.stringify Replacer Array Filter
// ----------------------------------------------------------------------------
const setting = {
  username: "praveen",
  level: 10,
  health: 98
};

const data = JSON.stringify(setting, ['level', 'health']);
console.log(data);

/*
 * 🎯 Output: '{"level":10,"health":98}'
 * 💡 Explanation: The 2nd argument of `JSON.stringify` acts as a replacer filter.
 *    Passing an array of keys stringifies ONLY the properties specified in that array.
 */


// ----------------------------------------------------------------------------
// Q8: `this` Keyword: Method vs Arrow Function
// ----------------------------------------------------------------------------
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius
};

console.log(shape.diameter());
console.log(shape.perimeter());

/*
 * 🎯 Output:
 *    20
 *    NaN
 *
 * 💡 Explanation:
 *  - `shape.diameter()` uses a standard function, so `this` points to `shape`. (`10 * 2 = 20`)
 *  - `shape.perimeter` uses an arrow function. Arrow functions do NOT have their own `this`;
 *    they inherit `this` from the outer (global/window) scope. In global scope, `this.radius`
 *    is `undefined`, resulting in `2 * Math.PI * undefined = NaN`.
 */


// ----------------------------------------------------------------------------
// Q9: Object Reference Assignment
// ----------------------------------------------------------------------------
let cRef = { greeting: "Hey!" };
let dRef;

dRef = cRef; // Copies memory reference, NOT value
cRef.greeting = "Hello";

console.log(dRef.greeting);

/*
 * 🎯 Output: "Hello"
 * 💡 Explanation: Both `cRef` and `dRef` point to the exact same object in memory.
 *    Modifying the object via `cRef` reflects on `dRef`.
 */


// ----------------------------------------------------------------------------
// Q10: Object Comparison by Reference
// ----------------------------------------------------------------------------
console.log({ a: 1 } == { a: 1 });
console.log({ a: 1 } === { a: 1 });

/*
 * 🎯 Output:
 *    false
 *    false
 *
 * 💡 Explanation: In JavaScript, objects are compared by memory reference, not by structure
 *    or contents. Even though both objects look identical, they occupy two distinct memory locations.
 */


// ----------------------------------------------------------------------------
// Q11: Reassigning Variables vs Array References
// ----------------------------------------------------------------------------
let person = { name: "lydia" };
const member = [person];
person = null;

console.log(member);

/*
 * 🎯 Output: [{ name: "lydia" }]
 * 💡 Explanation: `member[0]` holds a reference to the actual object `{ name: "lydia" }`.
 *    Reassigning `person = null` merely breaks the `person` variable's link to the object;
 *    it does NOT destroy the object in memory or affect `member[0]`.
 */


// ----------------------------------------------------------------------------
// Q12: Default Parameters & Object References
// ----------------------------------------------------------------------------
const value = { number: 10 };

const multiply = (x = { ...value }) => {
  console.log((x.number *= 2));
};

multiply();
multiply();
multiply(value);
multiply(value);

/*
 * 🎯 Output:
 *    20
 *    20
 *    20
 *    40
 *
 * 💡 Breakdown:
 *  1. `multiply()` -> No arg passed, uses default parameter `{ ...value }` (fresh shallow copy). Logs 20.
 *  2. `multiply()` -> No arg passed, creates ANOTHER fresh default copy `{ ...value }`. Logs 20.
 *  3. `multiply(value)` -> Passes the actual `value` reference. `value.number` becomes 20. Logs 20.
 *  4. `multiply(value)` -> Passes `value` reference again (`value.number` is already 20). `20 * 2 = 40`. Logs 40.
 */


// ----------------------------------------------------------------------------
// Q13: Mutating Properties vs Reassigning Parameters
// ----------------------------------------------------------------------------
function changeAgeAndReference(personObj) {
  personObj.age = 25; // Mutates original object property!
  personObj = {       // Reassigns local parameter to a NEW object in memory
    name: "praveen",
    age: 50
  };
  return personObj;
}

const personObj1 = {
  name: "alex",
  age: 30
};

const personObj2 = changeAgeAndReference(personObj1);

console.log(personObj1);
console.log(personObj2);

/*
 * 🎯 Output:
 *    { name: "alex", age: 25 }
 *    { name: "praveen", age: 50 }
 *
 * 💡 Explanation: `personObj.age = 25` mutates the underlying object (`personObj1`).
 *    However, `personObj = { ... }` rebinds the local variable `personObj` to a brand new object,
 *    which is returned as `personObj2` without altering `personObj1` further.
 */
