// ════════════════════════════════════════════════════════════════════════════════════
// ERROR HANDLING - Simple & Complete Guide
// ════════════════════════════════════════════════════════════════════════════════════

// QUICK SUMMARY:
// try-catch     -> Handle errors gracefully
// throw         -> Create custom errors
// finally       -> Always execute cleanup code
// Error types   -> Different error categories

// ════════════════════════════════════════════════════════════════════════════════════
// 1. BASIC ERROR HANDLING - TRY-CATCH
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 1. TRY-CATCH BASICS ===\n");

// Without error handling - program crashes
console.log("Without try-catch:");
try {
  console.log("Starting program...");
  // JSON.parse("invalid json");  // This would crash
  console.log("This won't run if error occurs");
} catch (error) {
  console.log("Caught an error!");
}

// With error handling - program continues
console.log("\nWith try-catch:");
try {
  console.log("Attempting to parse JSON...");
  const data = JSON.parse('{"name": "Praveen"}');
  console.log("Success:", data);
} catch (error) {
  console.log("Error occurred:", error.message);
}
console.log("Program continues running");

// SIMPLE RULE:
// try    -> Code that might fail
// catch  -> Handle the error
// Program continues after catch block

// ════════════════════════════════════════════════════════════════════════════════════
// 2. ERROR OBJECT
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 2. ERROR OBJECT PROPERTIES ===\n");

try {
  throw new Error("Something went wrong!");
} catch (error) {
  console.log("Error properties:");
  console.log("- name:", error.name);           // "Error"
  console.log("- message:", error.message);     // "Something went wrong!"
  console.log("- stack:", error.stack.split('\n')[0]);  // Stack trace
}

// Different ways to access error info
try {
  const obj = null;
  obj.method();  // TypeError
} catch (e) {
  console.log("\nError details:");
  console.log("Type:", e.name);
  console.log("Message:", e.message);
  console.log("Full error:", e.toString());
}

// SIMPLE RULE:
// error.name    -> Type of error
// error.message -> Description
// error.stack   -> Where it happened

// ════════════════════════════════════════════════════════════════════════════════════
// 3. BUILT-IN ERROR TYPES
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 3. BUILT-IN ERROR TYPES ===\n");

// 1. SyntaxError - Invalid syntax
try {
  eval("const x = ;");  // Invalid syntax
} catch (error) {
  console.log("1. SyntaxError:", error.name);
}

// 2. ReferenceError - Variable doesn't exist
try {
  console.log(nonExistentVariable);
} catch (error) {
  console.log("2. ReferenceError:", error.name);
}

// 3. TypeError - Wrong type
try {
  const num = 123;
  num.toUpperCase();  // Numbers don't have toUpperCase
} catch (error) {
  console.log("3. TypeError:", error.name);
}

// 4. RangeError - Number out of range
try {
  const arr = new Array(-1);  // Negative length
} catch (error) {
  console.log("4. RangeError:", error.name);
}

// 5. URIError - Invalid URI
try {
  decodeURIComponent('%');  // Invalid URI component
} catch (error) {
  console.log("5. URIError:", error.name);
}

// 6. EvalError - Error in eval() (rarely used)
console.log("6. EvalError: (deprecated, rarely seen)");

console.log("\nCommon error types:");
console.log("- SyntaxError: Invalid code syntax");
console.log("- ReferenceError: Variable not found");
console.log("- TypeError: Wrong data type");
console.log("- RangeError: Value out of range");
console.log("- URIError: Invalid URI encoding");

// ════════════════════════════════════════════════════════════════════════════════════
// 4. THROWING ERRORS
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 4. THROWING ERRORS ===\n");

// Throw simple error
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero!");
  }
  return a / b;
}

try {
  console.log("10 / 2 =", divide(10, 2));
  console.log("10 / 0 =", divide(10, 0));  // Throws error
} catch (error) {
  console.log("Caught:", error.message);
}

// Throw specific error types
function validateAge(age) {
  if (typeof age !== 'number') {
    throw new TypeError("Age must be a number");
  }
  if (age < 0 || age > 150) {
    throw new RangeError("Age must be between 0 and 150");
  }
  return true;
}

try {
  validateAge("25");  // TypeError
} catch (error) {
  console.log("\nValidation error:", error.name, "-", error.message);
}

try {
  validateAge(200);  // RangeError
} catch (error) {
  console.log("Validation error:", error.name, "-", error.message);
}

// You can throw any value (not just Error objects)
try {
  throw "Simple string error";
} catch (error) {
  console.log("\nThrew string:", error);
}

try {
  throw { code: 404, message: "Not found" };
} catch (error) {
  console.log("Threw object:", error);
}

// SIMPLE RULE:
// throw new Error("message") -> Best practice
// throw "string" -> Works but not recommended
// Always throw Error objects for better debugging

// ════════════════════════════════════════════════════════════════════════════════════
// 5. FINALLY BLOCK
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 5. FINALLY BLOCK ===\n");

// finally always executes (cleanup code)
function processData(data) {
  console.log("Opening database connection...");

  try {
    console.log("Processing:", data);
    if (!data) {
      throw new Error("No data provided");
    }
    console.log("Data processed successfully");
    return "Success";
  } catch (error) {
    console.log("Error:", error.message);
    return "Failed";
  } finally {
    console.log("Closing database connection...");
    // Always runs, even with return statements
  }
}

console.log("Result:", processData("test data"));
console.log("\nResult:", processData(null));

// finally runs even with return in try
function testFinally() {
  try {
    console.log("\nIn try block");
    return "From try";
  } finally {
    console.log("Finally runs even with return!");
  }
}

console.log("Returned:", testFinally());

// SIMPLE RULE:
// finally -> ALWAYS executes
// Use for cleanup (close files, connections, etc.)
// Runs even if there's a return statement

// ════════════════════════════════════════════════════════════════════════════════════
// 6. CUSTOM ERROR CLASSES
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 6. CUSTOM ERROR CLASSES ===\n");

// Create custom error class
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class DatabaseError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "DatabaseError";
    this.code = code;
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
    this.statusCode = 401;
  }
}

// Using custom errors
function validateUser(user) {
  if (!user.name) {
    throw new ValidationError("Name is required");
  }
  if (!user.email) {
    throw new ValidationError("Email is required");
  }
  return true;
}

try {
  validateUser({ name: "Praveen" });  // Missing email
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("Validation failed:", error.message);
  } else {
    console.log("Unknown error:", error);
  }
}

// Database error example
function queryDatabase(query) {
  if (!query) {
    throw new DatabaseError("Query cannot be empty", "DB001");
  }
  // Simulate database query
  return "Results";
}

try {
  queryDatabase("");
} catch (error) {
  if (error instanceof DatabaseError) {
    console.log(`Database error [${error.code}]:`, error.message);
  }
}

// SIMPLE RULE:
// Extend Error class for custom errors
// Add custom properties (code, statusCode, etc.)
// Use instanceof to check error type

// ════════════════════════════════════════════════════════════════════════════════════
// 7. ASYNC ERROR HANDLING
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 7. ASYNC ERROR HANDLING ===\n");

// Promises with .catch()
function fetchData(url) {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject(new Error("URL is required"));
    } else {
      resolve({ data: "Sample data" });
    }
  });
}

fetchData("https://api.example.com")
  .then(result => console.log("Promise success:", result))
  .catch(error => console.log("Promise error:", error.message));

fetchData("")
  .then(result => console.log("This won't run"))
  .catch(error => console.log("Promise error:", error.message));

// Async/await with try-catch
async function getData() {
  try {
    console.log("\nAsync/await example:");
    const result = await fetchData("https://api.example.com");
    console.log("Async success:", result);
  } catch (error) {
    console.log("Async error:", error.message);
  }
}

getData();

// Multiple async operations
async function processMultiple() {
  try {
    console.log("\nProcessing multiple operations:");
    const data1 = await fetchData("url1");
    console.log("Got data1:", data1);

    const data2 = await fetchData("url2");
    console.log("Got data2:", data2);

    return "All done";
  } catch (error) {
    console.log("Error in process:", error.message);
    throw error;  // Re-throw if needed
  }
}

processMultiple();

// SIMPLE RULE:
// Promises -> Use .catch()
// Async/await -> Use try-catch
// Always handle rejected promises

// ════════════════════════════════════════════════════════════════════════════════════
// 8. ERROR HANDLING PATTERNS
// ════════════════════════════════════════════════════════════════════════════════════

setTimeout(() => {
  console.log("\n=== 8. ERROR HANDLING PATTERNS ===\n");

  // Pattern 1: Early return for validation
  function createUser(userData) {
    if (!userData) {
      throw new Error("User data is required");
    }
    if (!userData.email) {
      throw new Error("Email is required");
    }
    if (!userData.password) {
      throw new Error("Password is required");
    }

    // All validations passed
    return { id: 1, ...userData };
  }

  try {
    const user = createUser({ email: "test@example.com", password: "123" });
    console.log("User created:", user);
  } catch (error) {
    console.log("Creation failed:", error.message);
  }

  // Pattern 2: Error wrapper function
  function safeExecute(fn, fallbackValue) {
    try {
      return fn();
    } catch (error) {
      console.log("Error in safeExecute:", error.message);
      return fallbackValue;
    }
  }

  const result = safeExecute(() => JSON.parse("invalid"), {});
  console.log("\nSafe execute result:", result);

  // Pattern 3: Retry logic
  async function retryOperation(operation, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await operation();
      } catch (error) {
        console.log(`Attempt ${i + 1} failed:`, error.message);
        if (i === maxRetries - 1) {
          throw error;  // Last attempt failed
        }
      }
    }
  }

  // Pattern 4: Error logging
  function logError(error, context = {}) {
    console.log("\n[ERROR LOG]");
    console.log("Time:", new Date().toISOString());
    console.log("Message:", error.message);
    console.log("Type:", error.name);
    console.log("Context:", context);
    console.log("Stack:", error.stack.split('\n').slice(0, 3).join('\n'));
  }

  try {
    throw new Error("Test error");
  } catch (error) {
    logError(error, { userId: 123, action: "login" });
  }

  // Pattern 5: Error boundary (React-like concept)
  class ErrorBoundary {
    constructor() {
      this.errors = [];
    }

    wrap(fn) {
      return (...args) => {
        try {
          return fn(...args);
        } catch (error) {
          this.errors.push(error);
          console.log("Error caught by boundary:", error.message);
          return null;
        }
      };
    }

    getErrors() {
      return this.errors;
    }
  }

  const boundary = new ErrorBoundary();
  const safeFunction = boundary.wrap(() => {
    throw new Error("Wrapped error");
  });

  safeFunction();
  console.log("\nBoundary errors:", boundary.getErrors().length);

}, 100);

// ════════════════════════════════════════════════════════════════════════════════════
// 9. REAL-WORLD EXAMPLES
// ════════════════════════════════════════════════════════════════════════════════════

setTimeout(() => {
  console.log("\n=== 9. REAL-WORLD EXAMPLES ===\n");

  // Example 1: API call with error handling
  async function callAPI(endpoint) {
    try {
      console.log("Example 1: API Call");

      // Simulate API call
      if (!endpoint) {
        throw new Error("Endpoint is required");
      }

      // Simulate network error
      if (endpoint === "/error") {
        throw new Error("Network error");
      }

      console.log("API call successful");
      return { status: 200, data: { message: "Success" } };

    } catch (error) {
      console.error("API Error:", error.message);

      // Log to monitoring service
      // logToSentry(error);

      // Return user-friendly error
      return {
        status: 500,
        error: "Something went wrong. Please try again."
      };
    }
  }

  callAPI("/users");

  // Example 2: Form validation
  function validateForm(formData) {
    console.log("\nExample 2: Form Validation");
    const errors = [];

    try {
      if (!formData.email || !formData.email.includes('@')) {
        errors.push("Invalid email address");
      }

      if (!formData.password || formData.password.length < 8) {
        errors.push("Password must be at least 8 characters");
      }

      if (errors.length > 0) {
        throw new ValidationError(errors.join(', '));
      }

      console.log("Form is valid");
      return true;

    } catch (error) {
      console.log("Validation errors:", error.message);
      return false;
    }
  }

  validateForm({ email: "test", password: "123" });

  // Example 3: File operations
  function readFile(filename) {
    console.log("\nExample 3: File Operations");

    try {
      if (!filename) {
        throw new Error("Filename is required");
      }

      if (!filename.endsWith('.txt')) {
        throw new Error("Only .txt files are supported");
      }

      console.log("Reading file:", filename);
      return "File contents";

    } catch (error) {
      console.error("File error:", error.message);
      return null;
    } finally {
      console.log("File operation completed");
    }
  }

  readFile("document.txt");

  // Example 4: Database transaction
  async function performTransaction() {
    console.log("\nExample 4: Database Transaction");

    try {
      console.log("Starting transaction...");

      // Begin transaction
      console.log("- Inserting user");
      // await db.insert(user);

      console.log("- Updating account");
      // await db.update(account);

      console.log("- Committing transaction");
      // await db.commit();

      console.log("Transaction successful");

    } catch (error) {
      console.log("Transaction failed:", error.message);
      console.log("Rolling back...");
      // await db.rollback();
      throw error;
    }
  }

  performTransaction();

  // Example 5: Graceful degradation
  function getFeature() {
    console.log("\nExample 5: Graceful Degradation");

    try {
      // Try to use new feature
      console.log("Trying new feature...");
      // return newFeature();
      throw new Error("Feature not available");

    } catch (error) {
      console.log("Falling back to old feature");
      // return oldFeature();
      return "Fallback result";
    }
  }

  console.log("Feature result:", getFeature());

}, 200);

// ════════════════════════════════════════════════════════════════════════════════════
// COMPARISON TABLE
// ════════════════════════════════════════════════════════════════════════════════════

setTimeout(() => {
  console.log("\n=== COMPARISON TABLE ===\n");

  const table = `
┌──────────────────────┬────────────────────────────────────────────────────┐
│    Error Type        │                  When It Occurs                    │
├──────────────────────┼────────────────────────────────────────────────────┤
│ SyntaxError          │ Invalid JavaScript syntax                          │
│ ReferenceError       │ Variable doesn't exist                             │
│ TypeError            │ Value is wrong type                                │
│ RangeError           │ Value out of acceptable range                      │
│ URIError             │ Invalid URI encoding/decoding                      │
│ Custom Error         │ Application-specific errors                        │
└──────────────────────┴────────────────────────────────────────────────────┘
`;

  console.log(table);
}, 300);

// ════════════════════════════════════════════════════════════════════════════════════
// INTERVIEW QUESTIONS & ANSWERS
// ════════════════════════════════════════════════════════════════════════════════════

setTimeout(() => {
  console.log("\n=== INTERVIEW Q&A ===\n");

  // Q1: What is the difference between throw and return?
  // A: throw stops execution and jumps to catch block.
  //    return stops execution and returns a value normally.

  // Q2: When should you use finally?
  // A: Use finally for cleanup code that must run regardless of success/failure,
  //    like closing files, database connections, or releasing resources.

  // Q3: Can you catch errors in async functions?
  // A: Yes, use try-catch with async/await or .catch() with promises.

  // Q4: What happens if you don't catch an error?
  // A: Uncaught errors crash the program (or log to console in browsers).
  //    In Node.js, they can crash the entire process.

  // Q5: How do you create custom errors?
  // A: Extend the Error class and set custom properties.

  // Q6: What's the difference between Error and Exception?
  // A: In JavaScript, they're the same. "Exception" is the general term,
  //    "Error" is the JavaScript implementation.

  console.log("Q1: throw vs return?");
  console.log("A: throw stops and jumps to catch, return exits normally\n");

  console.log("Q2: When to use finally?");
  console.log("A: For cleanup code that must always run\n");

  console.log("Q3: Catch errors in async functions?");
  console.log("A: Yes, use try-catch with async/await or .catch()\n");

  console.log("Q4: What if error not caught?");
  console.log("A: Program crashes or logs to console\n");

  console.log("Q5: How to create custom errors?");
  console.log("A: Extend Error class and add custom properties\n");

}, 400);

// ════════════════════════════════════════════════════════════════════════════════════
// BEST PRACTICES
// ════════════════════════════════════════════════════════════════════════════════════

setTimeout(() => {
  console.log("\n=== BEST PRACTICES ===\n");

  console.log("DO:");
  console.log("- Always catch errors in async code");
  console.log("- Use specific error types (TypeError, ValidationError)");
  console.log("- Log errors with context (user ID, timestamp, etc.)");
  console.log("- Use finally for cleanup code");
  console.log("- Create custom error classes for your app");
  console.log("- Provide user-friendly error messages");
  console.log("- Re-throw errors if you can't handle them\n");

  console.log("DON'T:");
  console.log("- Don't swallow errors (empty catch blocks)");
  console.log("- Don't expose sensitive info in error messages");
  console.log("- Don't catch errors you can't handle");
  console.log("- Don't use try-catch for control flow");
  console.log("- Don't forget to log errors");
  console.log("- Don't throw strings (use Error objects)");

  // Good example
  console.log("\nGood Example:");
  console.log(`
try {
  const data = await fetchData();
  return processData(data);
} catch (error) {
  logger.error('Failed to process', { error, userId });
  throw new ProcessingError('Unable to process data');
}
  `);

  // Bad example
  console.log("Bad Example:");
  console.log(`
try {
  const data = await fetchData();
  return processData(data);
} catch (error) {
  // Empty catch - error is lost!
}
  `);

}, 500);

// ════════════════════════════════════════════════════════════════════════════════════
// QUICK MEMORIZATION TRICK
// ════════════════════════════════════════════════════════════════════════════════════

setTimeout(() => {
  console.log("\n=== MEMORIZATION TRICK ===\n");

  console.log(`
Think of error handling like a safety net:

TRY = Tightrope walker attempting a trick
- Risky operation that might fail
- You hope it succeeds

CATCH = Safety net below
- Catches the fall
- Prevents disaster
- Handles the problem

FINALLY = Cleanup crew
- Always shows up
- Cleans up regardless of success/failure
- Closes resources, logs events

THROW = Deliberately jumping off
- You decide something is wrong
- Create an error on purpose
- Signal that something failed

GOLDEN RULE:
"Try risky code, Catch failures, Finally cleanup, Throw when needed"
  `);

  console.log("\nAll examples completed!");

}, 600);

