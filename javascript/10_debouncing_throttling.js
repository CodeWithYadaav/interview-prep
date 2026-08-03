// ════════════════════════════════════════════════════════════════════════════════════
// DEBOUNCING & THROTTLING - Simple & Complete Guide
// ════════════════════════════════════════════════════════════════════════════════════

// QUICK SUMMARY:
// Debouncing -> Wait until user STOPS doing something, then execute once
// Throttling -> Execute at REGULAR INTERVALS while user is doing something

// ════════════════════════════════════════════════════════════════════════════════════
// 1. THE PROBLEM - Too Many Function Calls
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 1. THE PROBLEM ===\n");

// Imagine a search box that calls API on every keystroke
let callCount = 0;

function expensiveSearch(query) {
  callCount++;
  console.log(`API call ${callCount}: Searching for "${query}"`);
}

// Without optimization - calls on EVERY keystroke
console.log("Without optimization (typing 'hello'):");
expensiveSearch("h");
expensiveSearch("he");
expensiveSearch("hel");
expensiveSearch("hell");
expensiveSearch("hello");
console.log(`Total API calls: ${callCount}`);  // 5 calls!

// Problem: Too many unnecessary API calls
// Solution: Debouncing or Throttling

// SIMPLE RULE:
// Without optimization -> Function called on EVERY event
// With optimization -> Function called LESS frequently

// ════════════════════════════════════════════════════════════════════════════════════
// 2. WHAT IS DEBOUNCING?
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 2. DEBOUNCING BASICS ===\n");

// Debouncing delays function execution until user STOPS triggering events
// If triggered again before delay ends, timer resets

function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    // Clear previous timer
    clearTimeout(timeoutId);

    // Set new timer
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Example: Search with debouncing
let searchCount = 0;
function search(query) {
  searchCount++;
  console.log(`Debounced search ${searchCount}: "${query}"`);
}

const debouncedSearch = debounce(search, 300);

console.log("With debouncing (300ms delay):");
console.log("Typing 'hello' quickly...");
debouncedSearch("h");
debouncedSearch("he");
debouncedSearch("hel");
debouncedSearch("hell");
debouncedSearch("hello");

// Wait for debounce to execute
setTimeout(() => {
  console.log(`Total debounced calls: ${searchCount}`);  // Only 1 call!
}, 400);

// SIMPLE RULE:
// Debouncing -> Wait for pause, then execute ONCE
// Timer resets on each new event

// ════════════════════════════════════════════════════════════════════════════════════
// 3. WHAT IS THROTTLING?
// ════════════════════════════════════════════════════════════════════════════════════

setTimeout(() => {
  console.log("\n=== 3. THROTTLING BASICS ===\n");

  // Throttling ensures function executes at REGULAR INTERVALS
  // Ignores events that happen too frequently

  function throttle(func, limit) {
    let inThrottle;

    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;

        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };
  }

  // Example: Scroll event with throttling
  let scrollCount = 0;
  function handleScroll(position) {
    scrollCount++;
    console.log(`Throttled scroll ${scrollCount}: position ${position}`);
  }

  const throttledScroll = throttle(handleScroll, 200);

  console.log("With throttling (200ms interval):");
  console.log("Simulating rapid scroll events...");

  // Simulate rapid scroll events
  throttledScroll(10);
  setTimeout(() => throttledScroll(20), 50);
  setTimeout(() => throttledScroll(30), 100);
  setTimeout(() => throttledScroll(40), 150);
  setTimeout(() => throttledScroll(50), 250);  // This will execute
  setTimeout(() => throttledScroll(60), 300);
  setTimeout(() => throttledScroll(70), 500);  // This will execute

  setTimeout(() => {
    console.log(`Total throttled calls: ${scrollCount}`);  // Only 3 calls
  }, 600);

  // SIMPLE RULE:
  // Throttling -> Execute at REGULAR INTERVALS
  // Ignores events during cooldown period

}, 500);

// ════════════════════════════════════════════════════════════════════════════════════
// 4. DEBOUNCING - DETAILED IMPLEMENTATION
// ════════════════════════════════════════════════════════════════════════════════════

setTimeout(() => {
  console.log("\n=== 4. DEBOUNCING IMPLEMENTATION ===\n");

  // Basic debounce function
  function debounceBasic(func, delay) {
    let timeoutId;

    return function (...args) {
      const context = this;

      // Clear existing timer
      clearTimeout(timeoutId);

      // Set new timer
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }

  // Advanced debounce with immediate option
  function debounceAdvanced(func, delay, immediate = false) {
    let timeoutId;

    return function (...args) {
      const context = this;
      const callNow = immediate && !timeoutId;

      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        timeoutId = null;
        if (!immediate) {
          func.apply(context, args);
        }
      }, delay);

      if (callNow) {
        func.apply(context, args);
      }
    };
  }

  // Example: Input field
  let inputCount = 0;
  function handleInput(value) {
    inputCount++;
    console.log(`Input handler ${inputCount}: "${value}"`);
  }

  const debouncedInput = debounceBasic(handleInput, 500);

  console.log("Debounced input (500ms):");
  debouncedInput("a");
  setTimeout(() => debouncedInput("ab"), 100);
  setTimeout(() => debouncedInput("abc"), 200);
  setTimeout(() => debouncedInput("abcd"), 300);

  setTimeout(() => {
    console.log(`Total input handlers: ${inputCount}`);  // 1
  }, 900);

}, 1200);

// ════════════════════════════════════════════════════════════════════════════════════
// 5. THROTTLING - DETAILED IMPLEMENTATION
// ════════════════════════════════════════════════════════════════════════════════════

setTimeout(() => {
  console.log("\n=== 5. THROTTLING IMPLEMENTATION ===\n");

  // Basic throttle function
  function throttleBasic(func, limit) {
    let inThrottle;

    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Advanced throttle with trailing call
  function throttleAdvanced(func, limit) {
    let inThrottle;
    let lastFunc;
    let lastRan;

    return function (...args) {
      const context = this;

      if (!inThrottle) {
        func.apply(context, args);
        lastRan = Date.now();
        inThrottle = true;

        setTimeout(() => {
          inThrottle = false;
        }, limit);
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }

  // Example: Button clicks
  let clickCount = 0;
  function handleClick() {
    clickCount++;
    console.log(`Click handler ${clickCount} executed`);
  }

  const throttledClick = throttleBasic(handleClick, 1000);

  console.log("Throttled clicks (1000ms):");
  throttledClick();  // Executes immediately
  setTimeout(() => throttledClick(), 200);   // Ignored
  setTimeout(() => throttledClick(), 400);   // Ignored
  setTimeout(() => throttledClick(), 600);   // Ignored
  setTimeout(() => throttledClick(), 1100);  // Executes (after 1000ms)

  setTimeout(() => {
    console.log(`Total click handlers: ${clickCount}`);  // 2
  }, 1500);

}, 2200);

// ════════════════════════════════════════════════════════════════════════════════════
// 6. REAL-WORLD USE CASES
// ════════════════════════════════════════════════════════════════════════════════════

setTimeout(() => {
  console.log("\n=== 6. REAL-WORLD USE CASES ===\n");

  // DEBOUNCING Use Cases:
  console.log("DEBOUNCING is best for:");
  console.log("1. Search box autocomplete");
  console.log("2. Form validation");
  console.log("3. Window resize events");
  console.log("4. Text input fields");
  console.log("5. API calls on user input");

  // Example 1: Search autocomplete
  function searchAPI(query) {
    console.log(`API: Searching for "${query}"`);
    // fetch(`/api/search?q=${query}`)
  }

  const debouncedSearchAPI = debounce(searchAPI, 500);

  console.log("\nExample: Search autocomplete");
  debouncedSearchAPI("java");
  setTimeout(() => debouncedSearchAPI("javascript"), 100);
  setTimeout(() => debouncedSearchAPI("javascript tutorial"), 200);

  // Example 2: Window resize
  function handleResize() {
    console.log("Recalculating layout...");
  }

  const debouncedResize = debounce(handleResize, 250);
  // window.addEventListener('resize', debouncedResize);

  console.log("\nTHROTTLING is best for:");
  console.log("1. Scroll events");
  console.log("2. Mouse move tracking");
  console.log("3. Game loop updates");
  console.log("4. Progress bar updates");
  console.log("5. Infinite scrolling");

  // Example 3: Scroll position tracking
  function trackScrollPosition() {
    const position = Math.floor(Math.random() * 1000);
    console.log(`Tracking scroll at: ${position}px`);
  }

  const throttledTrackScroll = throttle(trackScrollPosition, 1000);
  // window.addEventListener('scroll', throttledTrackScroll);

  // Example 4: Mouse move tracking
  function trackMousePosition(x, y) {
    console.log(`Mouse at: (${x}, ${y})`);
  }

  const throttledMouseMove = throttle((e) => {
    trackMousePosition(e.clientX, e.clientY);
  }, 100);
  // document.addEventListener('mousemove', throttledMouseMove);

}, 3800);

// ════════════════════════════════════════════════════════════════════════════════════
// 7. VISUAL COMPARISON
// ════════════════════════════════════════════════════════════════════════════════════

setTimeout(() => {
  console.log("\n=== 7. VISUAL COMPARISON ===\n");

  console.log("Scenario: User types 'hello' in search box\n");

  console.log("WITHOUT optimization:");
  console.log("h -> API call");
  console.log("he -> API call");
  console.log("hel -> API call");
  console.log("hell -> API call");
  console.log("hello -> API call");
  console.log("Total: 5 API calls\n");

  console.log("WITH DEBOUNCING (300ms):");
  console.log("h -> timer starts");
  console.log("he -> timer resets");
  console.log("hel -> timer resets");
  console.log("hell -> timer resets");
  console.log("hello -> timer resets");
  console.log("(300ms pause)");
  console.log("-> API call for 'hello'");
  console.log("Total: 1 API call\n");

  console.log("WITH THROTTLING (300ms):");
  console.log("h -> API call (immediate)");
  console.log("he -> ignored (within 300ms)");
  console.log("hel -> ignored (within 300ms)");
  console.log("hell -> ignored (within 300ms)");
  console.log("(300ms passes)");
  console.log("hello -> API call");
  console.log("Total: 2 API calls\n");

}, 4500);

// ════════════════════════════════════════════════════════════════════════════════════
// 8. PRACTICAL EXAMPLES WITH CODE
// ════════════════════════════════════════════════════════════════════════════════════

setTimeout(() => {
  console.log("\n=== 8. PRACTICAL EXAMPLES ===\n");

  // Example 1: Search with debouncing
  console.log("Example 1: Search Box");

  const searchBox = {
    value: "",
    search: debounce(function (query) {
      console.log(`Searching for: "${query}"`);
      // API call here
    }, 500),

    onInput: function (value) {
      this.value = value;
      this.search(value);
    }
  };

  searchBox.onInput("j");
  setTimeout(() => searchBox.onInput("ja"), 100);
  setTimeout(() => searchBox.onInput("jav"), 200);
  setTimeout(() => searchBox.onInput("java"), 300);

  // Example 2: Infinite scroll with throttling
  setTimeout(() => {
    console.log("\nExample 2: Infinite Scroll");

    const infiniteScroll = {
      page: 1,
      loadMore: throttle(function () {
        this.page++;
        console.log(`Loading page ${this.page}...`);
        // Load more items
      }, 1000),

      onScroll: function () {
        // Check if near bottom
        const nearBottom = true; // Simplified
        if (nearBottom) {
          this.loadMore();
        }
      }
    };

    infiniteScroll.onScroll();
    setTimeout(() => infiniteScroll.onScroll(), 200);
    setTimeout(() => infiniteScroll.onScroll(), 400);
    setTimeout(() => infiniteScroll.onScroll(), 1100);
  }, 600);

  // Example 3: Form validation with debouncing
  setTimeout(() => {
    console.log("\nExample 3: Form Validation");

    const form = {
      validateEmail: debounce(function (email) {
        const isValid = email.includes("@");
        console.log(`Email "${email}" is ${isValid ? "valid" : "invalid"}`);
      }, 500),

      onEmailInput: function (email) {
        this.validateEmail(email);
      }
    };

    form.onEmailInput("user");
    setTimeout(() => form.onEmailInput("user@"), 100);
    setTimeout(() => form.onEmailInput("user@example"), 200);
    setTimeout(() => form.onEmailInput("user@example.com"), 300);
  }, 1300);

}, 5500);

// ════════════════════════════════════════════════════════════════════════════════════
// COMPARISON TABLE
// ════════════════════════════════════════════════════════════════════════════════════

setTimeout(() => {
  console.log("\n=== COMPARISON TABLE ===\n");

  const table = `
┌─────────────────────┬──────────────────────────┬──────────────────────────┐
│      Feature        │       Debouncing         │       Throttling         │
├─────────────────────┼──────────────────────────┼──────────────────────────┤
│ Execution           │ After pause              │ At regular intervals     │
│ Timer behavior      │ Resets on each event     │ Fixed interval           │
│ First call          │ Delayed (or immediate)   │ Immediate                │
│ Subsequent calls    │ Ignored until pause      │ Ignored during cooldown  │
│ Best for            │ Search, validation       │ Scroll, mouse move       │
│ Use when            │ Wait for user to stop    │ Limit execution rate     │
│ Example             │ Search autocomplete      │ Infinite scroll          │
└─────────────────────┴──────────────────────────┴──────────────────────────┘
`;

  console.log(table);
}, 7500);

// ════════════════════════════════════════════════════════════════════════════════════
// INTERVIEW QUESTIONS & ANSWERS
// ════════════════════════════════════════════════════════════════════════════════════

setTimeout(() => {
  console.log("\n=== INTERVIEW Q&A ===\n");

  // Q1: What is debouncing?
  // A: Debouncing delays function execution until after a pause in events.
  //    Timer resets on each new event. Executes once after user stops.

  // Q2: What is throttling?
  // A: Throttling ensures function executes at most once per time interval.
  //    Ignores events during cooldown period.

  // Q3: When to use debouncing vs throttling?
  // A: Debouncing: When you want to wait for user to finish (search, validation)
  //    Throttling: When you want regular updates (scroll, mouse tracking)

  // Q4: Implement a debounce function
  // A: (See implementation in section 4)

  // Q5: What's the difference in execution pattern?
  // A: Debouncing: Executes ONCE after pause
  //    Throttling: Executes MULTIPLE times at intervals

  // Q6: Can you combine debouncing and throttling?
  // A: Yes, but rarely needed. Example: Throttle scroll events, then debounce
  //    the final calculation when scrolling stops.

  console.log("Q1: What is debouncing?");
  console.log("A: Delays execution until user stops triggering events\n");

  console.log("Q2: What is throttling?");
  console.log("A: Executes at regular intervals, ignoring extra events\n");

  console.log("Q3: When to use which?");
  console.log("A: Debouncing -> Wait for pause (search, validation)");
  console.log("   Throttling -> Regular updates (scroll, mouse move)\n");

}, 8000);

// ════════════════════════════════════════════════════════════════════════════════════
// BEST PRACTICES
// ════════════════════════════════════════════════════════════════════════════════════

setTimeout(() => {
  console.log("\n=== BEST PRACTICES ===\n");

  // DO: Use debouncing for search inputs
  const goodSearch = debounce((query) => {
    console.log("Good: Debounced search for", query);
  }, 300);

  // DO: Use throttling for scroll events
  const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  const goodScroll = throttle(() => {
    console.log("Good: Throttled scroll handler");
  }, 200);

  // DO: Choose appropriate delay times
  // Search: 300-500ms (balance between UX and API calls)
  // Scroll: 100-200ms (smooth but not too frequent)
  // Resize: 250-500ms (wait for user to finish)

  // DON'T: Use debouncing for scroll (will only fire when scrolling stops)
  // DON'T: Use throttling for search (will fire too frequently)

  // DON'T: Set delays too short (defeats the purpose)
  const tooShort = debounce(() => { }, 10);  // Too short!

  // DON'T: Set delays too long (poor UX)
  const tooLong = debounce(() => { }, 5000);  // Too long!

  console.log("DO:");
  console.log("- Debounce search inputs (300-500ms)");
  console.log("- Throttle scroll events (100-200ms)");
  console.log("- Choose appropriate delays");
  console.log("- Test with real user behavior\n");

  console.log("DON'T:");
  console.log("- Use debouncing for continuous events");
  console.log("- Use throttling for one-time inputs");
  console.log("- Set delays too short or too long");
  console.log("- Forget to clean up timers");

}, 8500);

// ════════════════════════════════════════════════════════════════════════════════════
// QUICK MEMORIZATION TRICK
// ════════════════════════════════════════════════════════════════════════════════════

setTimeout(() => {
  console.log("\n=== MEMORIZATION TRICK ===\n");

  console.log(`
Think of an elevator:

DEBOUNCING = Elevator waiting for more people
- Door opens
- Person enters
- Timer starts (5 seconds)
- Another person enters
- Timer RESETS (5 seconds again)
- Keeps resetting until no one enters
- Finally closes and moves

THROTTLING = Elevator with fixed schedule
- Leaves every 5 minutes
- No matter how many people come
- If you miss it, wait for next one
- Regular, predictable intervals

GOLDEN RULE:
"Debouncing waits for pause, Throttling runs on schedule"
  `);

  console.log("\nAll examples completed!");

}, 9000);

