// https://roadsidecoder.hashnode.dev/javascript-interview-questions-on-var-let-and-const
// ════════════════════════════════════════════════════════════════════════════════════
// VAR vs LET vs CONST - Simple & Complete Guide
// ════════════════════════════════════════════════════════════════════════════════════

// QUICK SUMMARY:
// var   -> Old way (avoid in modern JS)
// let   -> Use when value will CHANGE
// const -> Use when value stays SAME (preferred!)

// ════════════════════════════════════════════════════════════════════════════════════
// 1. SCOPE - Where can you access the variable?
// ════════════════════════════════════════════════════════════════════════════════════

// Two types of scope:
// - Block scope: Inside { } (if, for, while, etc.)
// - Function scope: Inside function

console.log("\n=== 1. SCOPE ===");

// Example 1: var ignores block scope
{
  var name = "Praveen";
  console.log("Inside block (var):", name); // Works
}
console.log("Outside block (var):", name); // Still works! (var leaks out)

// Example 2: let respects block scope
{
  let age = 25;
  console.log("Inside block (let):", age); // Works
}
// console.log("Outside block (let):", age); // Error! age is not defined

// SIMPLE RULE:
// var  -> Can escape from { } blocks
// let  -> Stays inside { } blocks
// const -> Stays inside { } blocks

// ════════════════════════════════════════════════════════════════════════════════════
// 2. REDECLARATION - Can you declare same variable twice?
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 2. REDECLARATION ===");

// var allows redeclaration (bad!)
var city = "Mumbai";
var city = "Delhi"; // No error (but confusing!)
console.log("City (var):", city); // "Delhi"

// let does NOT allow redeclaration (good!)
let country = "India";
// let country = "USA"; // Error! Already declared

// SIMPLE RULE:
// var   -> Can declare multiple times (causes bugs)
// let   -> Cannot redeclare (prevents bugs)
// const -> Cannot redeclare (prevents bugs)

// ════════════════════════════════════════════════════════════════════════════════════
// 3. REASSIGNMENT - Can you change the value?
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 3. REASSIGNMENT ===");

var score1 = 10;
score1 = 20; // Works
console.log("score1 (var):", score1);

let score2 = 30;
score2 = 40; // Works
console.log("score2 (let):", score2);

const score3 = 50;
// score3 = 60; // Error! Cannot reassign const

// IMPORTANT: const with objects
const person = { name: "Praveen" };
person.name = "Ravi"; // Works! (changing property is allowed)
console.log("person (const):", person);
// person = {}; // Error! Cannot reassign the entire object

// SIMPLE RULE:
// var   -> Can reassign
// let   -> Can reassign
// const -> CANNOT reassign (but can modify object properties)

// ════════════════════════════════════════════════════════════════════════════════════
// 4. INITIALIZATION - Must you assign a value immediately?
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 4. INITIALIZATION ===");

var a; // Works (value is undefined)
let b; // Works (value is undefined)
// const c; // Error! Must assign value immediately

const c = 10; // Correct way

console.log("a (var):", a); // undefined
console.log("b (let):", b); // undefined
console.log("c (const):", c); // 10

// SIMPLE RULE:
// var   -> Can declare without value
// let   -> Can declare without value
// const -> MUST assign value immediately

// ════════════════════════════════════════════════════════════════════════════════════
// 5. VARIABLE SHADOWING - Same name in different scopes
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 5. VARIABLE SHADOWING ===");

function testShadowing() {
  let message = "Outer";
  console.log("1. Outer scope:", message); // "Outer"

  if (true) {
    let message = "Inner"; // Different variable (shadows outer one)
    console.log("2. Inner scope:", message); // "Inner"
  }

  console.log("3. Outer scope again:", message); // "Outer" (unchanged)
}

testShadowing();

// SIMPLE RULE:
// Variables with same name in different blocks are SEPARATE variables

// ════════════════════════════════════════════════════════════════════════════════════
// 6. ILLEGAL SHADOWING - var cannot shadow let
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 6. ILLEGAL SHADOWING ===");

// Legal: let can shadow var
function legal1() {
  var x = 10;
  {
    let x = 20; // Works
    console.log("Inner (let shadowing var):", x); // 20
  }
  console.log("Outer (var):", x); // 10
}
legal1();

// Legal: let can shadow let
function legal2() {
  let y = 10;
  {
    let y = 20; // Works
    console.log("Inner (let shadowing let):", y); // 20
  }
  console.log("Outer (let):", y); // 10
}
legal2();

// Illegal: var CANNOT shadow let
function illegal() {
  let z = 10;
  {
    // var z = 20; // Error! var cannot shadow let
  }
}

// SIMPLE RULE:
// let can shadow var     -> YES
// let can shadow let     -> YES
// var CANNOT shadow let  -> NO

// ════════════════════════════════════════════════════════════════════════════════════
// 7. HOISTING - Can you use variable before declaring?
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 7. HOISTING ===");

// Think of the Execution Context like a 2‑column diagram:
//
// CREATION PHASE (happens first, before your code runs line by line)
// 1️⃣ Create Global Object  ->  window (browser) / global (Node)
// 2️⃣ Create Memory Space   ->  reserve space for all variables & functions
// 3️⃣ Initialize:
//      - var        ->  undefined
//      - function   ->  full function is stored
//      - let/const  ->  created BUT in TDZ (cannot use yet)
//
// EXECUTION PHASE (second pass, runs your code top‑to‑bottom)
// - Values are read/updated inside that memory created above.
// - You finally get real values instead of undefined.
//
// Small mental picture:
//  Creation Phase:  a: undefined,  b: undefined,  multiply: function() { ... }
//  Execution Phase: a: 10,         b: 100,        multiply: function() { ... }
function hoistExample() {
  // Using var before declaration returns undefined (it is hoisted)
  console.log("var before declaration:", sampleVar); // undefined

  // Uncommenting next line would throw ReferenceError because let is in TDZ
  // console.log("let before declaration:", sampleLet); // ❌ TDZ crash

  var sampleVar = 10;
  let sampleLet = 20;

  // Execution Phase: after declarations run, values are available
  console.log("var after declaration:", sampleVar); // 10
  console.log("let after declaration:", sampleLet); // 20
}

hoistExample();

// SIMPLE RULE:
// var   -> Hoisted (value is undefined)
// let   -> In Temporal Dead Zone (cannot access)
// const -> In Temporal Dead Zone (cannot access)

// ════════════════════════════════════════════════════════════════════════════════════
// 8. TEMPORAL DEAD ZONE (TDZ) - The danger zone!
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 8. TEMPORAL DEAD ZONE ===");

function showTDZ() {
  // TDZ starts here for 'temp'
  // console.log(temp); // Error! temp is in TDZ

  let temp = "Safe now"; // TDZ ends here
  console.log("temp:", temp); // Works
}

showTDZ();

// SIMPLE RULE:
// TDZ = Time between entering scope and variable declaration
// During TDZ, you CANNOT access let/const variables

// ════════════════════════════════════════════════════════════════════════════════════
// COMPARISON TABLE
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== COMPARISON TABLE ===\n");

const table = `
┌────────────────────┬─────────┬─────────┬─────────┐
│ Feature            │   var   │   let   │  const  │
├────────────────────┼─────────┼─────────┼─────────┤
│ Scope              │ Function│  Block  │  Block  │
│ Redeclare          │   YES   │   NO    │   NO    │
│ Reassign           │   YES   │   YES   │   NO    │
│ Hoisted            │   YES   │   NO    │   NO    │
│ Initialize Later   │   YES   │   YES   │   NO    │
│ Temporal Dead Zone │   NO    │   YES   │   YES   │
│ Use in Modern JS   │   NO    │   YES   │  BEST   │
└────────────────────┴─────────┴─────────┴─────────┘
`;

console.log(table);

// ════════════════════════════════════════════════════════════════════════════════════
// INTERVIEW QUESTIONS & ANSWERS
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== COMMON INTERVIEW QUESTIONS ===\n");

// Q1: What's the difference between var, let, and const?
// A: var is function-scoped and can be redeclared.
//    let is block-scoped and can be reassigned but not redeclared.
//    const is block-scoped and cannot be reassigned or redeclared.

// Q2: When should you use const?
// A: Always use const by default. Only use let when you need to reassign.
//    Never use var in modern JavaScript.

// Q3: Can you change properties of a const object?
// A: Yes! const prevents reassignment, not mutation.
//    const obj = {a: 1}; obj.a = 2; -> Works
//    obj = {}; -> Error

// Q4: What is Temporal Dead Zone?
// A: Period between entering scope and variable declaration where let/const
//    variables exist but cannot be accessed.

// Q5: What is hoisting?
// A: JavaScript moves declarations to the top of their scope.
//    var is hoisted as undefined.
//    let/const are hoisted but in TDZ (cannot access).

// Q6: Can var shadow let?
// A: No! var cannot shadow let because var tries to redeclare in the
//    same function scope, which conflicts with let.

// ════════════════════════════════════════════════════════════════════════════════════
// BEST PRACTICES
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== BEST PRACTICES ===\n");

// DO: Use const by default
const PI = 3.14159;
const CONFIG = { api: "https://api.example.com" };

// DO: Use let when value will change
let counter = 0;
for (let i = 0; i < 5; i++) {
  counter += i;
}

// DON'T: Use var (outdated!)
// var oldWay = "Don't use this";

// DO: Use descriptive names with const
const MAX_USERS = 100;
const API_KEY = "abc123";

// DO: Use let in loops
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("Loop index:", j), 100);
}
// Each iteration has its own 'j'

// DON'T: Use var in loops (causes bugs!)
for (var k = 0; k < 3; k++) {
  // All iterations share the same 'k'
}

console.log("\nRemember: const > let > never var!");

// ════════════════════════════════════════════════════════════════════════════════════
// QUICK MEMORIZATION TRICK
// ════════════════════════════════════════════════════════════════════════════════════

/*

Think of variables like containers:

var   = Old leaky bucket (water spills everywhere)
let   = Regular box (you can swap contents)
const = Locked safe (contents are fixed)

GOLDEN RULE for interviews:
"Use const by default, let when needed, var never!"

*/
