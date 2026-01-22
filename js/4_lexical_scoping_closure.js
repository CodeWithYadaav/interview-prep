// ════════════════════════════════════════════════════════════════════════════════════
// LEXICAL SCOPING & CLOSURES - Simple & Complete Guide
// ════════════════════════════════════════════════════════════════════════════════════

// QUICK SUMMARY:
// Lexical Scope -> Where a function is WRITTEN determines what it can access
// Closure       -> Inner function remembering outer function's variables

// ════════════════════════════════════════════════════════════════════════════════════
// 1. WHAT IS LEXICAL SCOPE?
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 1. LEXICAL SCOPE BASICS ===\n");

// Lexical scope means inner functions can access variables from outer functions
// based on WHERE they are written (not where they are called)

var username = "Praveen";  // Global scope

function greet() {
  // greet can access username because it's in outer scope
  console.log("Hello, " + username);
}

greet();  // "Hello, Praveen"

// Example: Nested scopes
function outer() {
  var outerVar = "I'm outer";

  function inner() {
    var innerVar = "I'm inner";

    // inner can access both innerVar and outerVar
    console.log(innerVar);   // Works
    console.log(outerVar);   // Works (lexical scope)
  }

  inner();
  // console.log(innerVar); // Error! outer cannot access inner's variables
}

outer();

// SIMPLE RULE:
// Inner functions can access outer variables
// Outer functions CANNOT access inner variables
// This is determined by where the code is written (lexical = written position)

// ════════════════════════════════════════════════════════════════════════════════════
// 2. SCOPE CHAIN
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 2. SCOPE CHAIN ===\n");

var global = "Global";

function level1() {
  var level1Var = "Level 1";

  function level2() {
    var level2Var = "Level 2";

    function level3() {
      var level3Var = "Level 3";

      // level3 can access ALL outer variables
      console.log("Accessing from level3:");
      console.log("- level3Var:", level3Var);  // Own scope
      console.log("- level2Var:", level2Var);  // Parent scope
      console.log("- level1Var:", level1Var);  // Grandparent scope
      console.log("- global:", global);        // Global scope
    }

    level3();
  }

  level2();
}

level1();

// Scope chain lookup order:
// 1. Local scope (own variables)
// 2. Outer function scope
// 3. Outer-outer function scope
// 4. ... continues up to global scope

// SIMPLE RULE:
// JavaScript looks for variables starting from current scope
// and moves UP the chain until found or reaches global scope

// ════════════════════════════════════════════════════════════════════════════════════
// 3. WHAT IS A CLOSURE?
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 3. CLOSURE BASICS ===\n");

// A closure is when an inner function remembers variables from its outer function
// even AFTER the outer function has finished executing

function subscribe() {
  var name = "Praveen";  // Outer variable

  function displayName() {
    // Inner function accessing outer variable
    console.log("Subscriber:", name);
  }

  displayName();
}

subscribe();  // "Subscriber: Praveen"

// Real closure example: Return inner function
function makeGreeter() {
  var greeting = "Hello";

  return function (name) {
    // This function "closes over" the greeting variable
    console.log(greeting + ", " + name);
  };
}

const greetPerson = makeGreeter();
// makeGreeter has finished executing, but greeting is still accessible!
greetPerson("Alice");  // "Hello, Alice"
greetPerson("Bob");    // "Hello, Bob"

// SIMPLE RULE:
// Closure = Inner function + Variables it references from outer scope
// The inner function "remembers" outer variables even after outer function returns

// ════════════════════════════════════════════════════════════════════════════════════
// 4. PRACTICAL CLOSURE EXAMPLES
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 4. PRACTICAL CLOSURES ===\n");

// Example 1: Counter with private variable
function createCounter() {
  var count = 0;  // Private variable

  return {
    increment: function () {
      count++;
      console.log("Count:", count);
    },
    decrement: function () {
      count--;
      console.log("Count:", count);
    },
    getCount: function () {
      return count;
    }
  };
}

const counter = createCounter();
counter.increment();  // Count: 1
counter.increment();  // Count: 2
counter.decrement();  // Count: 1
console.log("Current count:", counter.getCount());  // 1
// console.log(counter.count); // undefined (count is private!)

// Example 2: Function factory
function createBase(baseNumber) {
  return function (innerNumber) {
    return baseNumber + innerNumber;
  };
}

const addSix = createBase(6);
console.log("\nFunction factory:");
console.log("addSix(10):", addSix(10));  // 16
console.log("addSix(21):", addSix(21));  // 27

const addTen = createBase(10);
console.log("addTen(5):", addTen(5));    // 15

// Example 3: Private variables and methods
function bankAccount(initialBalance) {
  var balance = initialBalance;  // Private

  return {
    deposit: function (amount) {
      balance += amount;
      console.log("Deposited:", amount, "| New balance:", balance);
    },
    withdraw: function (amount) {
      if (amount <= balance) {
        balance -= amount;
        console.log("Withdrawn:", amount, "| New balance:", balance);
      } else {
        console.log("Insufficient funds!");
      }
    },
    getBalance: function () {
      return balance;
    }
  };
}

console.log("\nBank account:");
const account = bankAccount(1000);
account.deposit(500);   // Deposited: 500 | New balance: 1500
account.withdraw(300);  // Withdrawn: 300 | New balance: 1200
console.log("Final balance:", account.getBalance());  // 1200
// account.balance is NOT accessible (private)

// ════════════════════════════════════════════════════════════════════════════════════
// 5. CLOSURE WITH MULTIPLE LEVELS
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 5. MULTI-LEVEL CLOSURES ===\n");

var globalVar = 10;

function sum(a) {
  return function (b) {
    return function (c) {
      return function (d) {
        // All nested functions close over their parent variables
        return a + b + c + d + globalVar;
      };
    };
  };
}

console.log("sum(1)(2)(3)(4):", sum(1)(2)(3)(4));  // 20 (1+2+3+4+10)

// Breaking it down
const step1 = sum(1);       // Closes over a=1
const step2 = step1(2);     // Closes over a=1, b=2
const step3 = step2(3);     // Closes over a=1, b=2, c=3
const result = step3(4);    // Has access to all: a, b, c, d, globalVar
console.log("Step by step result:", result);  // 20

// ════════════════════════════════════════════════════════════════════════════════════
// 6. CLOSURE INTERVIEW QUESTIONS
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 6. COMMON INTERVIEW QUESTIONS ===\n");

// Question 1: What will this print?
console.log("Question 1:");
let count = 0;
(function printCount() {
  if (count === 0) {
    let count = 1;  // New variable in inner scope (shadowing)
    console.log("Inner count:", count);  // 1
  }
  console.log("Outer count:", count);  // 0 (original count)
})();

// Explanation: Inner 'count' shadows outer 'count' inside the if block

// Question 2: Loop with closures (classic problem)
console.log("\nQuestion 2 - Loop problem:");

// WRONG WAY - var is function-scoped
console.log("Using var (wrong):");
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("var i:", i);  // Prints 3, 3, 3 (all reference same i)
  }, 100);
}

// RIGHT WAY - let is block-scoped
setTimeout(() => {
  console.log("\nUsing let (correct):");
  for (let j = 0; j < 3; j++) {
    setTimeout(function () {
      console.log("let j:", j);  // Prints 0, 1, 2 (each iteration has own j)
    }, 200);
  }
}, 150);

// Question 3: Create private counter
console.log("\nQuestion 3 - Private counter:");
function privateCounter() {
  var _counter = 0;  // Private (underscore convention)

  return {
    increment: function (val = 1) {
      _counter += val;
    },
    getValue: function () {
      return _counter;
    }
  };
}

const myCounter = privateCounter();
myCounter.increment();
myCounter.increment(5);
console.log("Private counter value:", myCounter.getValue());  // 6

// Question 4: Module pattern
console.log("\nQuestion 4 - Module pattern:");
const Calculator = (function () {
  // Private variables
  var result = 0;

  // Private function
  function log(operation, value) {
    console.log(`${operation} ${value}, result: ${result}`);
  }

  // Public API
  return {
    add: function (num) {
      result += num;
      log("Added", num);
      return this;  // For chaining
    },
    subtract: function (num) {
      result -= num;
      log("Subtracted", num);
      return this;
    },
    getResult: function () {
      return result;
    },
    reset: function () {
      result = 0;
      console.log("Reset");
      return this;
    }
  };
})();

Calculator.add(10).add(5).subtract(3);
console.log("Calculator result:", Calculator.getResult());  // 12

// ════════════════════════════════════════════════════════════════════════════════════
// 7. CLOSURE USE CASES
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 7. REAL-WORLD USE CASES ===\n");

// Use Case 1: Data Privacy (Encapsulation)
function User(name, age) {
  // Private variables
  var _name = name;
  var _age = age;

  // Public methods (closure over private variables)
  return {
    getName: function () {
      return _name;
    },
    getAge: function () {
      return _age;
    },
    setAge: function (newAge) {
      if (newAge > 0 && newAge < 150) {
        _age = newAge;
      } else {
        console.log("Invalid age!");
      }
    }
  };
}

const user = User("Praveen", 25);
console.log("User name:", user.getName());
user.setAge(26);
console.log("User age:", user.getAge());
// user._name is not accessible (truly private)

// Use Case 2: Event handlers
function attachEventHandlers() {
  var count = 0;

  return function handleClick() {
    count++;
    console.log("Button clicked", count, "times");
  };
}

const clickHandler = attachEventHandlers();
clickHandler();  // Button clicked 1 times
clickHandler();  // Button clicked 2 times
clickHandler();  // Button clicked 3 times

// Use Case 3: Memoization (caching)
function memoize(fn) {
  var cache = {};  // Closure over cache

  return function (...args) {
    var key = JSON.stringify(args);

    if (cache[key]) {
      console.log("Returning from cache");
      return cache[key];
    }

    console.log("Computing result");
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const expensiveOperation = memoize(function (a, b) {
  // Simulate expensive calculation
  return a * b;
});

console.log("\nMemoization example:");
console.log("Result:", expensiveOperation(5, 10));  // Computing result: 50
console.log("Result:", expensiveOperation(5, 10));  // Returning from cache: 50

// Use Case 4: Function factories
function createMultiplier(multiplier) {
  return function (num) {
    return num * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log("\nFunction factory:");
console.log("double(5):", double(5));    // 10
console.log("triple(5):", triple(5));    // 15

// ════════════════════════════════════════════════════════════════════════════════════
// 8. COMMON PITFALLS & SOLUTIONS
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 8. COMMON PITFALLS ===\n");

// Pitfall 1: Loop with var
console.log("Pitfall 1 - Loop closure:");
var functions = [];
for (var i = 0; i < 3; i++) {
  functions.push(function () {
    return i;  // All reference same i
  });
}
console.log("functions[0]():", functions[0]());  // 3 (not 0!)
console.log("functions[1]():", functions[1]());  // 3 (not 1!)

// Solution 1: Use let
var betterFunctions = [];
for (let i = 0; i < 3; i++) {
  betterFunctions.push(function () {
    return i;  // Each iteration has own i
  });
}
console.log("\nSolution with let:");
console.log("betterFunctions[0]():", betterFunctions[0]());  // 0
console.log("betterFunctions[1]():", betterFunctions[1]());  // 1

// Solution 2: IIFE (Immediately Invoked Function Expression)
var iifeFunctions = [];
for (var i = 0; i < 3; i++) {
  iifeFunctions.push((function (index) {
    return function () {
      return index;  // Closes over index (copy of i)
    };
  })(i));
}
console.log("\nSolution with IIFE:");
console.log("iifeFunctions[0]():", iifeFunctions[0]());  // 0
console.log("iifeFunctions[1]():", iifeFunctions[1]());  // 1

// ════════════════════════════════════════════════════════════════════════════════════
// COMPARISON TABLE
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== COMPARISON TABLE ===\n");

const table = `
┌──────────────────────┬────────────────────────────────────────────────────┐
│      Concept         │                  Description                       │
├──────────────────────┼────────────────────────────────────────────────────┤
│ Lexical Scope        │ Where code is written determines access            │
│ Closure              │ Inner function remembers outer variables           │
│ Scope Chain          │ Lookup order: Local -> Outer -> Global             │
│ Private Variables    │ Variables in closure not accessible from outside   │
│ Use Cases            │ Data privacy, factories, memoization, modules      │
│ Memory               │ Closures keep references (watch for memory leaks)  │
└──────────────────────┴────────────────────────────────────────────────────┘
`;

console.log(table);

// ════════════════════════════════════════════════════════════════════════════════════
// INTERVIEW QUESTIONS & ANSWERS
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== INTERVIEW Q&A ===\n");

// Q1: What is a closure?
// A: A closure is when an inner function has access to variables from its
//    outer function, even after the outer function has returned.

// Q2: What is lexical scope?
// A: Lexical scope means the accessibility of variables is determined by
//    where the code is written, not where it's executed.

// Q3: What are closures used for?
// A: 1. Data privacy (private variables)
//    2. Function factories
//    3. Callbacks and event handlers
//    4. Memoization (caching)
//    5. Module pattern

// Q4: Can closures cause memory leaks?
// A: Yes, closures keep references to outer variables. If not managed properly,
//    they can prevent garbage collection.

// Q5: What's the difference between closure and scope?
// A: Scope determines variable accessibility at write-time.
//    Closure is when a function remembers its scope even after outer function exits.

// ════════════════════════════════════════════════════════════════════════════════════
// BEST PRACTICES
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== BEST PRACTICES ===\n");

// DO: Use closures for data privacy
function goodPrivacy() {
  var secret = "hidden";
  return {
    getSecret: () => secret
  };
}

// DO: Use let in loops to avoid closure issues
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log("Good loop:", i), 500);
}

// DON'T: Create unnecessary closures in loops (memory)
// Bad: Creating closure in every iteration unnecessarily

// DON'T: Forget that closures keep references
// Can prevent garbage collection if not careful

console.log("\nRemember:");
console.log("- Closures remember outer variables");
console.log("- Use for data privacy and function factories");
console.log("- Be careful with loops and var");
console.log("- Watch for memory leaks with large closures");

// ════════════════════════════════════════════════════════════════════════════════════
// QUICK MEMORIZATION TRICK
// ════════════════════════════════════════════════════════════════════════════════════

/*

Think of closure like a backpack:

When a function is created, it packs a "backpack" with all variables
it can access from outer scopes.

Even when the function goes somewhere else (returned, passed as callback),
it carries that backpack with it.

The function can always reach into its backpack to get those variables,
even if the place where it was created no longer exists.

Lexical Scope = What you can put in the backpack (based on where you are)
Closure = Carrying the backpack wherever you go

GOLDEN RULE for interviews:
"Closure = Inner function + Its lexical environment"

*/




