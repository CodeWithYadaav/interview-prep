// ════════════════════════════════════════════════════════════════════════════════════
// CURRYING - Simple & Complete Guide
// ════════════════════════════════════════════════════════════════════════════════════

// QUICK SUMMARY:
// Currying -> Transform f(a, b, c) into f(a)(b)(c)
// Takes one argument at a time and returns a function for the next argument

// ════════════════════════════════════════════════════════════════════════════════════
// 1. WHAT IS CURRYING?
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 1. BASIC CURRYING ===\n");

// Normal function (takes all arguments at once)
function normalAdd(a, b) {
  return a + b;
}

console.log("Normal function:", normalAdd(5, 3));  // 8

// Curried function (takes one argument at a time)
function curriedAdd(a) {
  return function (b) {
    return a + b;
  };
}

console.log("Curried function:", curriedAdd(5)(3));  // 8

// You can also store intermediate results
const addFive = curriedAdd(5);
console.log("Partial application:", addFive(3));  // 8
console.log("Partial application:", addFive(10)); // 15

// SIMPLE RULE:
// Currying breaks down a function that takes multiple arguments
// into a series of functions that each take a single argument

// ════════════════════════════════════════════════════════════════════════════════════
// 2. WHY USE CURRYING?
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 2. BENEFITS OF CURRYING ===\n");

// Benefit 1: Reusability - Create specialized functions
function multiply(a) {
  return function (b) {
    return a * b;
  };
}

const multiplyBy2 = multiply(2);
const multiplyBy5 = multiply(5);

console.log("Benefit 1 - Reusability:");
console.log("2 x 3 =", multiplyBy2(3));   // 6
console.log("2 x 10 =", multiplyBy2(10)); // 20
console.log("5 x 3 =", multiplyBy5(3));   // 15
console.log("5 x 10 =", multiplyBy5(10)); // 50

// Benefit 2: Function composition
function addTax(taxRate) {
  return function (price) {
    return price + (price * taxRate);
  };
}

const addGST = addTax(0.18);  // 18% GST
const addVAT = addTax(0.20);  // 20% VAT

console.log("\nBenefit 2 - Specialized functions:");
console.log("Price with GST:", addGST(1000));  // 1180
console.log("Price with VAT:", addVAT(1000));  // 1200

// Benefit 3: Avoiding repetition
function greet(greeting) {
  return function (name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHello = greet("Hello");
const sayHi = greet("Hi");

console.log("\nBenefit 3 - Avoid repetition:");
console.log(sayHello("Praveen"));  // "Hello, Praveen!"
console.log(sayHello("Ravi"));     // "Hello, Ravi!"
console.log(sayHi("Alice"));       // "Hi, Alice!"

// SIMPLE RULE:
// Use currying when you need to:
// 1. Create specialized versions of functions
// 2. Reuse logic with different configurations
// 3. Build complex operations from simple ones

// ════════════════════════════════════════════════════════════════════════════════════
// 3. MULTIPLE LEVEL CURRYING
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 3. MULTIPLE ARGUMENTS ===\n");

// Curry function with 3 arguments
function sum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log("Sum of 2, 5, 1:", sum(2)(5)(1));  // 8

// Store intermediate results
const sumWith2 = sum(2);
const sumWith2And5 = sumWith2(5);
console.log("Partial results:", sumWith2And5(1));  // 8

// Using arrow functions (cleaner syntax)
const sumArrow = a => b => c => a + b + c;
console.log("Arrow function:", sumArrow(2)(5)(1));  // 8

// More complex example
function calculatePrice(basePrice) {
  return function (discount) {
    return function (taxRate) {
      const discounted = basePrice - (basePrice * discount);
      return discounted + (discounted * taxRate);
    };
  };
}

const laptopPrice = calculatePrice(1000);
const afterDiscount = laptopPrice(0.10);  // 10% discount
const finalPrice = afterDiscount(0.18);   // 18% tax
console.log("\nFinal laptop price:", finalPrice);  // 1062

// ════════════════════════════════════════════════════════════════════════════════════
// 4. PRACTICAL EXAMPLE - EVALUATE FUNCTION
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 4. EVALUATE OPERATIONS ===\n");

// Build a calculator using currying
function evaluate(operation) {
  return function (a) {
    return function (b) {
      switch (operation) {
        case 'sum':
          return a + b;
        case 'multiply':
          return a * b;
        case 'divide':
          return a / b;
        case 'subtract':
          return a - b;
        case 'power':
          return Math.pow(a, b);
        default:
          return "Invalid operation";
      }
    };
  };
}

console.log("evaluate('sum')(4)(2):", evaluate('sum')(4)(2));           // 6
console.log("evaluate('multiply')(4)(2):", evaluate('multiply')(4)(2)); // 8
console.log("evaluate('divide')(4)(2):", evaluate('divide')(4)(2));     // 2
console.log("evaluate('subtract')(4)(2):", evaluate('subtract')(4)(2)); // 2
console.log("evaluate('power')(4)(2):", evaluate('power')(4)(2));       // 16

// Create specialized calculators
const sumCalculator = evaluate('sum');
const multiplyCalculator = evaluate('multiply');

console.log("\nSpecialized calculators:");
console.log("Sum 10 + 5:", sumCalculator(10)(5));        // 15
console.log("Multiply 10 x 5:", multiplyCalculator(10)(5)); // 50

// ════════════════════════════════════════════════════════════════════════════════════
// 5. INFINITE CURRYING
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 5. INFINITE CURRYING ===\n");

// Keep accepting arguments until no more are provided
function add(a) {
  return function (b) {
    if (b !== undefined) {
      return add(a + b);  // Keep currying
    }
    return a;  // Return final result
  };
}

console.log("add(1)(2)():", add(1)(2)());              // 3
console.log("add(1)(2)(3)():", add(1)(2)(3)());        // 6
console.log("add(1)(2)(3)(4)():", add(1)(2)(3)(4)()); // 10
console.log("add(5)(10)(15)(20)():", add(5)(10)(15)(20)()); // 50

// Alternative implementation using toString
function multiply(a) {
  return function (b) {
    if (b !== undefined) {
      return multiply(a * b);
    }
    return a;
  };
}

console.log("\nmultiply chain:");
console.log("multiply(2)(3)():", multiply(2)(3)());           // 6
console.log("multiply(2)(3)(4)():", multiply(2)(3)(4)());     // 24

// SIMPLE RULE:
// Infinite currying checks if next argument exists
// If yes -> continue currying
// If no -> return accumulated result

// ════════════════════════════════════════════════════════════════════════════════════
// 6. CURRYING vs PARTIAL APPLICATION
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 6. CURRYING vs PARTIAL APPLICATION ===\n");

// Currying: One argument at a time
const curriedFunction = a => b => c => a + b + c;
console.log("Currying:", curriedFunction(1)(2)(3));  // 6

// Partial Application: Some arguments now, rest later
function partialAdd(a, b, c) {
  return a + b + c;
}

// Create partial application manually
function partial(fn, ...fixedArgs) {
  return function (...remainingArgs) {
    return fn(...fixedArgs, ...remainingArgs);
  };
}

const addToFive = partial(partialAdd, 5);
console.log("Partial application:", addToFive(2, 3));  // 10

// SIMPLE RULE:
// Currying -> Always one argument at a time: f(a)(b)(c)
// Partial -> Some now, rest later: f(a, b) then later (c)

// ════════════════════════════════════════════════════════════════════════════════════
// 7. CONVERTING NORMAL TO CURRIED FUNCTION
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 7. GENERIC CURRY FUNCTION ===\n");

// Universal curry function
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      // All arguments provided, execute function
      return fn.apply(this, args);
    } else {
      // Return function waiting for more arguments
      return function (...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

// Normal function
function volume(length, width, height) {
  return length * width * height;
}

// Convert to curried version
const curriedVolume = curry(volume);

console.log("All at once:", curriedVolume(2, 3, 4));      // 24
console.log("One by one:", curriedVolume(2)(3)(4));       // 24
console.log("Mixed:", curriedVolume(2, 3)(4));            // 24
console.log("Partial then rest:", curriedVolume(2)(3, 4)); // 24

// Another example
function joinStrings(a, b, c, d) {
  return `${a}-${b}-${c}-${d}`;
}

const curriedJoin = curry(joinStrings);
console.log("\nCurried join:", curriedJoin("Hello")("World")("From")("Currying"));

// ════════════════════════════════════════════════════════════════════════════════════
// 8. REAL-WORLD EXAMPLES
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 8. REAL-WORLD EXAMPLES ===\n");

// Example 1: API request builder
function buildRequest(method) {
  return function (url) {
    return function (data) {
      return {
        method: method,
        url: url,
        body: JSON.stringify(data)
      };
    };
  };
}

const postRequest = buildRequest('POST');
const createUser = postRequest('/api/users');
const createProduct = postRequest('/api/products');

console.log("Create user request:");
console.log(createUser({ name: "Praveen", age: 25 }));

console.log("\nCreate product request:");
console.log(createProduct({ name: "Laptop", price: 1000 }));

// Example 2: Event handler creator
function handleEvent(eventType) {
  return function (selector) {
    return function (callback) {
      console.log(`Attaching ${eventType} to ${selector}`);
      // document.querySelector(selector).addEventListener(eventType, callback);
      return `Handler attached`;
    };
  };
}

const onClick = handleEvent('click');
const onButtonClick = onClick('button');
console.log("\nEvent handler:", onButtonClick(() => console.log('Clicked')));

// Example 3: Logger with levels
function createLogger(level) {
  return function (module) {
    return function (message) {
      const timestamp = new Date().toISOString();
      return `[${timestamp}] [${level}] [${module}] ${message}`;
    };
  };
}

const errorLog = createLogger('ERROR');
const authError = errorLog('AUTH');
const dbError = errorLog('DATABASE');

console.log("\nLogger examples:");
console.log(authError('Invalid credentials'));
console.log(dbError('Connection timeout'));

// Example 4: Discount calculator
function discount(category) {
  return function (membershipType) {
    return function (price) {
      const categoryDiscount = category === 'electronics' ? 0.10 : 0.05;
      const memberDiscount = membershipType === 'premium' ? 0.15 : 0.05;
      const totalDiscount = categoryDiscount + memberDiscount;
      return price - (price * totalDiscount);
    };
  };
}

const electronicsPrice = discount('electronics');
const premiumElectronics = electronicsPrice('premium');

console.log("\nDiscount calculator:");
console.log("Premium electronics (1000):", premiumElectronics(1000)); // 750

// ════════════════════════════════════════════════════════════════════════════════════
// COMPARISON TABLE
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== COMPARISON TABLE ===\n");

const table = `
┌──────────────────────┬────────────────────────┬────────────────────────┐
│      Feature         │   Normal Function      │   Curried Function     │
├──────────────────────┼────────────────────────┼────────────────────────┤
│ Arguments            │ All at once            │ One at a time          │
│ Syntax               │ f(a, b, c)             │ f(a)(b)(c)             │
│ Reusability          │ Limited                │ High (partial apply)   │
│ Flexibility          │ Low                    │ High                   │
│ Function composition │ Hard                   │ Easy                   │
│ Code size            │ Smaller                │ Larger                 │
│ Use case             │ Simple operations      │ Configurable functions │
└──────────────────────┴────────────────────────┴────────────────────────┘
`;

console.log(table);

// ════════════════════════════════════════════════════════════════════════════════════
// INTERVIEW QUESTIONS & ANSWERS
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== COMMON INTERVIEW QUESTIONS ===\n");

// Q1: What is currying?
// A: Currying is transforming a function with multiple arguments into a
//    sequence of functions, each taking a single argument.

// Q2: What's the difference between currying and partial application?
// A: Currying always takes one argument at a time: f(a)(b)(c)
//    Partial application can take multiple: f(a, b) then later (c)

// Q3: How do you implement infinite currying?
// A: Check if next argument exists. If yes, recursively curry with accumulated
//    value. If no, return the final result.

// Q4: What are the benefits of currying?
// A: 1. Code reusability (create specialized functions)
//    2. Function composition
//    3. Avoid repeating arguments
//    4. Better abstraction

// Q5: Convert sum(a,b,c) to curried version
// A: const sum = a => b => c => a + b + c;

// Q6: Write a curry function that works for any function
// A: Check args.length vs fn.length. If enough args, execute.
//    Otherwise, return function waiting for more args.

// ════════════════════════════════════════════════════════════════════════════════════
// BEST PRACTICES
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== BEST PRACTICES ===\n");

// DO: Use arrow functions for cleaner curry syntax
const cleanCurry = a => b => c => a + b + c;
console.log("Clean syntax:", cleanCurry(1)(2)(3));

// DO: Create reusable specialized functions
const applyDiscount = percentage => price => price - (price * percentage);
const apply10Percent = applyDiscount(0.10);
console.log("Reusable function:", apply10Percent(1000));

// DO: Use currying for configuration
const log = level => module => message => `[${level}] [${module}] ${message}`;
const errorLogger = log('ERROR');
console.log("Configured logger:", errorLogger('AUTH')('Failed login'));

// DON'T: Overcomplicate simple functions
// Bad: const add = a => b => a + b; (for just addition)
// Good: const add = (a, b) => a + b; (simpler is better)

// DON'T: Forget to document curried functions
// Bad: const x = a => b => c => a + b + c;
// Good:
// Calculate sum of three numbers (curried)
// Usage: sum(1)(2)(3) or partial: sum(1)(2) then later (3)
const documentedSum = a => b => c => a + b + c;

console.log("\nRemember:");
console.log("- Use currying for reusability and composition");
console.log("- Arrow functions make currying cleaner");
console.log("- Don't overcomplicate simple functions");

// ════════════════════════════════════════════════════════════════════════════════════
// QUICK MEMORIZATION TRICK
// ════════════════════════════════════════════════════════════════════════════════════

/*

Think of currying like eating a sandwich:

Normal Function = Eat the whole sandwich at once
f(bread, filling, sauce) -> one big bite

Curried Function = Take one bite at a time
f(bread) -> returns function waiting for filling
f(bread)(filling) -> returns function waiting for sauce
f(bread)(filling)(sauce) -> done!

Each step prepares you for the next, and you can pause anytime.

GOLDEN RULE for interviews:
"Currying = One argument at a time, builds upon previous"

*/
