// ════════════════════════════════════════════════════════════════════════════════════
// EVENT PROPAGATION - Simple & Complete Guide
// ════════════════════════════════════════════════════════════════════════════════════

// QUICK SUMMARY:
// Event Bubbling  -> Events travel UP from target to root (child -> parent)
// Event Capturing -> Events travel DOWN from root to target (parent -> child)
// Event Delegation -> Use parent to handle events for multiple children

// ════════════════════════════════════════════════════════════════════════════════════
// 1. WHAT IS EVENT PROPAGATION?
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 1. EVENT PROPAGATION BASICS ===\n");

// Event propagation is the order in which events are received on the page
// When you click an element, the event doesn't just happen on that element
// It propagates through the DOM tree

// Three phases:
// 1. CAPTURING PHASE (top to bottom)
// 2. TARGET PHASE (the element itself)
// 3. BUBBLING PHASE (bottom to top)

console.log("Three phases of event propagation:");
console.log("1. CAPTURING: window -> document -> html -> body -> ... -> target");
console.log("2. TARGET: The element that triggered the event");
console.log("3. BUBBLING: target -> ... -> body -> html -> document -> window");

// SIMPLE RULE:
// Events travel DOWN during capturing (rarely used)
// Events travel UP during bubbling (most common)

// ════════════════════════════════════════════════════════════════════════════════════
// 2. EVENT BUBBLING (Most Common)
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 2. EVENT BUBBLING ===\n");

// Event bubbling means events "bubble up" from child to parent
// Like bubbles rising in water

// HTML Structure (imagine):
// <div id="grandparent">
//   <div id="parent">
//     <button id="child">Click Me</button>
//   </div>
// </div>

// Simulating event bubbling
console.log("Simulating click on button:");

function simulateBubbling() {
  console.log("1. Button (child) clicked");
  console.log("2. Event bubbles to parent div");
  console.log("3. Event bubbles to grandparent div");
  console.log("4. Event bubbles to body");
  console.log("5. Event bubbles to html");
  console.log("6. Event bubbles to document");
  console.log("7. Event bubbles to window");
}

simulateBubbling();

// Real example (would work in browser):
/*
const child = document.getElementById('child');
const parent = document.getElementById('parent');
const grandparent = document.getElementById('grandparent');

child.addEventListener('click', () => {
  console.log('Child clicked');
});

parent.addEventListener('click', () => {
  console.log('Parent clicked');
});

grandparent.addEventListener('click', () => {
  console.log('Grandparent clicked');
});

// Clicking child button outputs:
// "Child clicked"
// "Parent clicked"
// "Grandparent clicked"
*/

// SIMPLE RULE:
// By default, events bubble UP from child to parent
// All parent handlers are triggered automatically

// ════════════════════════════════════════════════════════════════════════════════════
// 3. EVENT CAPTURING (Less Common)
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 3. EVENT CAPTURING ===\n");

// Event capturing is the opposite of bubbling
// Events travel DOWN from root to target
// Also called "trickling"

console.log("Simulating capturing phase:");

function simulateCapturing() {
  console.log("1. Window receives event first");
  console.log("2. Document receives event");
  console.log("3. HTML receives event");
  console.log("4. Body receives event");
  console.log("5. Grandparent div receives event");
  console.log("6. Parent div receives event");
  console.log("7. Button (target) receives event");
}

simulateCapturing();

// To use capturing, set third parameter to true
/*
element.addEventListener('click', handler, true);  // Capturing
element.addEventListener('click', handler, false); // Bubbling (default)
element.addEventListener('click', handler);        // Bubbling (default)
*/

// Real example:
/*
grandparent.addEventListener('click', () => {
  console.log('Grandparent (capturing)');
}, true);  // true = capturing phase

parent.addEventListener('click', () => {
  console.log('Parent (capturing)');
}, true);

child.addEventListener('click', () => {
  console.log('Child (target)');
});

// Clicking child button outputs:
// "Grandparent (capturing)"
// "Parent (capturing)"
// "Child (target)"
*/

// SIMPLE RULE:
// Capturing goes DOWN (parent to child)
// Rarely used, but available with third parameter = true

// ════════════════════════════════════════════════════════════════════════════════════
// 4. STOPPING PROPAGATION
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 4. STOPPING PROPAGATION ===\n");

// Sometimes you want to stop the event from bubbling up
// Use event.stopPropagation()

console.log("Without stopPropagation:");
console.log("Child -> Parent -> Grandparent (all triggered)");

console.log("\nWith stopPropagation on child:");
console.log("Child (stops here, parent and grandparent not triggered)");

// Example:
/*
child.addEventListener('click', (event) => {
  console.log('Child clicked');
  event.stopPropagation();  // Stop bubbling here
});

parent.addEventListener('click', () => {
  console.log('Parent clicked');  // This won't run
});

grandparent.addEventListener('click', () => {
  console.log('Grandparent clicked');  // This won't run
});
*/

// stopImmediatePropagation vs stopPropagation
console.log("\nstopPropagation vs stopImmediatePropagation:");
console.log("- stopPropagation: Stops bubbling to parents");
console.log("- stopImmediatePropagation: Stops ALL handlers (including same element)");

// Example:
/*
child.addEventListener('click', (event) => {
  console.log('Handler 1');
  event.stopImmediatePropagation();  // Stops everything
});

child.addEventListener('click', () => {
  console.log('Handler 2');  // This won't run
});
*/

// SIMPLE RULE:
// stopPropagation() -> Stops bubbling to parents
// stopImmediatePropagation() -> Stops all handlers including siblings

// ════════════════════════════════════════════════════════════════════════════════════
// 5. EVENT.TARGET vs EVENT.CURRENTTARGET
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 5. TARGET vs CURRENTTARGET ===\n");

// event.target = The element that TRIGGERED the event (where you clicked)
// event.currentTarget = The element that has the EVENT LISTENER attached

console.log("Example: Click button inside div");
console.log("- event.target: button (what you clicked)");
console.log("- event.currentTarget: div (what has the listener)");

// Real example:
/*
<div id="container">
  <button id="btn">Click</button>
</div>

container.addEventListener('click', (event) => {
  console.log('target:', event.target.id);           // "btn"
  console.log('currentTarget:', event.currentTarget.id); // "container"
});
*/

// Practical use case:
function handleContainerClick(event) {
  console.log("\nClick event details:");
  console.log("- Clicked element:", event.target);
  console.log("- Listener attached to:", event.currentTarget);

  if (event.target.tagName === 'BUTTON') {
    console.log("User clicked a button!");
  } else if (event.target.tagName === 'INPUT') {
    console.log("User clicked an input!");
  }
}

// SIMPLE RULE:
// target = What you actually clicked
// currentTarget = What has the listener

// ════════════════════════════════════════════════════════════════════════════════════
// 6. EVENT DELEGATION (Important Pattern!)
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 6. EVENT DELEGATION ===\n");

// Event delegation uses bubbling to handle events efficiently
// Instead of adding listeners to many children, add ONE to the parent

console.log("Problem: 100 buttons, 100 event listeners (inefficient)");
console.log("Solution: 1 listener on parent, use event.target (efficient)");

// BAD: Adding listener to each item
/*
const items = document.querySelectorAll('.item');
items.forEach(item => {
  item.addEventListener('click', () => {
    console.log('Item clicked');
  });
});
// Problem: 100 items = 100 listeners (memory intensive)
*/

// GOOD: Event delegation
/*
const list = document.getElementById('list');
list.addEventListener('click', (event) => {
  if (event.target.classList.contains('item')) {
    console.log('Item clicked:', event.target.textContent);
  }
});
// Solution: 1 listener handles all items (efficient)
*/

// Simulating event delegation
console.log("\nSimulated event delegation:");

const itemList = {
  items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],

  handleClick: function(clickedItem) {
    console.log(`Clicked: ${clickedItem}`);
  },

  simulateClick: function(itemIndex) {
    // Simulating a click on an item
    const item = this.items[itemIndex];
    console.log(`User clicked: ${item}`);
    this.handleClick(item);
  }
};

itemList.simulateClick(2);  // Simulates clicking "Item 3"

// Benefits of event delegation:
console.log("\nBenefits of Event Delegation:");
console.log("1. Better performance (fewer listeners)");
console.log("2. Works with dynamically added elements");
console.log("3. Less memory usage");
console.log("4. Cleaner code");

// SIMPLE RULE:
// Event Delegation = One parent listener handles all children
// Use event.target to identify which child was clicked

// ════════════════════════════════════════════════════════════════════════════════════
// 7. PRACTICAL EXAMPLES
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 7. PRACTICAL EXAMPLES ===\n");

// Example 1: Todo list with delegation
console.log("Example 1: Todo List");

const todoList = {
  todos: ['Buy milk', 'Write code', 'Exercise'],

  init: function() {
    console.log("Todo list initialized with delegation");
    // In browser: this.container.addEventListener('click', this.handleClick.bind(this));
  },

  handleClick: function(event) {
    const target = event.target;

    if (target.classList && target.classList.contains('delete-btn')) {
      console.log("Delete button clicked");
      this.deleteTodo(target.dataset.id);
    } else if (target.classList && target.classList.contains('complete-btn')) {
      console.log("Complete button clicked");
      this.completeTodo(target.dataset.id);
    }
  },

  deleteTodo: function(id) {
    console.log(`Deleting todo: ${id}`);
  },

  completeTodo: function(id) {
    console.log(`Completing todo: ${id}`);
  }
};

todoList.init();

// Example 2: Modal with backdrop click
console.log("\nExample 2: Modal Close on Backdrop");

const modal = {
  isOpen: false,

  open: function() {
    this.isOpen = true;
    console.log("Modal opened");
  },

  close: function() {
    this.isOpen = false;
    console.log("Modal closed");
  },

  handleBackdropClick: function(event) {
    // Close only if clicked on backdrop, not modal content
    if (event.target.classList && event.target.classList.contains('modal-backdrop')) {
      console.log("Clicked backdrop, closing modal");
      this.close();
    } else {
      console.log("Clicked modal content, keeping open");
    }
  }
};

modal.open();
modal.handleBackdropClick({ target: { classList: { contains: () => true } } });

// Example 3: Form with nested elements
console.log("\nExample 3: Form Validation");

const form = {
  handleSubmit: function(event) {
    event.preventDefault();  // Prevent default form submission
    event.stopPropagation(); // Stop bubbling

    console.log("Form submitted");
    console.log("Validating fields...");
  },

  handleInputChange: function(event) {
    const input = event.target;
    console.log(`Input changed: ${input.name}`);
    // Validation logic here
  }
};

// Example 4: Dropdown menu
console.log("\nExample 4: Dropdown Menu");

const dropdown = {
  isOpen: false,

  toggle: function() {
    this.isOpen = !this.isOpen;
    console.log(`Dropdown ${this.isOpen ? 'opened' : 'closed'}`);
  },

  handleDocumentClick: function(event) {
    // Close dropdown if clicked outside
    if (!event.target.closest('.dropdown')) {
      if (this.isOpen) {
        console.log("Clicked outside, closing dropdown");
        this.isOpen = false;
      }
    }
  }
};

// ════════════════════════════════════════════════════════════════════════════════════
// 8. PREVENTING DEFAULT BEHAVIOR
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 8. PREVENTING DEFAULT BEHAVIOR ===\n");

// event.preventDefault() stops the browser's default action
// Different from stopPropagation()

console.log("Common use cases for preventDefault():");
console.log("1. Prevent form submission");
console.log("2. Prevent link navigation");
console.log("3. Prevent context menu");
console.log("4. Prevent drag and drop");

// Example: Custom form handling
/*
form.addEventListener('submit', (event) => {
  event.preventDefault();  // Don't submit form the default way

  // Custom validation and AJAX submission
  const formData = new FormData(event.target);
  console.log('Submitting via AJAX...');
});
*/

// Example: Prevent link navigation
/*
link.addEventListener('click', (event) => {
  event.preventDefault();  // Don't navigate

  // Custom routing logic
  console.log('Custom navigation logic');
});
*/

// preventDefault vs stopPropagation
console.log("\npreventDefault vs stopPropagation:");
console.log("- preventDefault: Stops browser's default action");
console.log("- stopPropagation: Stops event from bubbling");
console.log("- You can use both together if needed");

// SIMPLE RULE:
// preventDefault() -> Stops default browser behavior
// stopPropagation() -> Stops event bubbling

// ════════════════════════════════════════════════════════════════════════════════════
// 9. COMMON PATTERNS & BEST PRACTICES
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== 9. COMMON PATTERNS ===\n");

// Pattern 1: Check if element matches selector
function matches(element, selector) {
  return element.matches ? element.matches(selector) : false;
}

// Pattern 2: Find closest parent matching selector
function closest(element, selector) {
  return element.closest ? element.closest(selector) : null;
}

// Pattern 3: Delegated event handler
function delegate(parent, selector, eventType, handler) {
  parent.addEventListener(eventType, (event) => {
    const target = event.target.closest(selector);
    if (target) {
      handler.call(target, event);
    }
  });
}

console.log("Pattern 1: Check if element matches selector");
console.log("Pattern 2: Find closest parent matching selector");
console.log("Pattern 3: Delegated event handler helper");

// Pattern 4: Debounced scroll with delegation
console.log("\nPattern 4: Combining delegation with debouncing");

function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

const scrollHandler = {
  handleScroll: debounce(function(event) {
    console.log("Scroll event processed");
  }, 200)
};

// Pattern 5: Event delegation with data attributes
console.log("\nPattern 5: Using data attributes");

const dataAttributeHandler = {
  handleClick: function(event) {
    const action = event.target.dataset.action;

    switch(action) {
      case 'delete':
        console.log("Delete action");
        break;
      case 'edit':
        console.log("Edit action");
        break;
      case 'save':
        console.log("Save action");
        break;
      default:
        console.log("Unknown action");
    }
  }
};

// ════════════════════════════════════════════════════════════════════════════════════
// COMPARISON TABLE
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== COMPARISON TABLE ===\n");

const table = `
┌──────────────────────┬────────────────────────────────────────────────────┐
│      Concept         │                  Description                       │
├──────────────────────┼────────────────────────────────────────────────────┤
│ Event Bubbling       │ Events travel UP from child to parent (default)    │
│ Event Capturing      │ Events travel DOWN from parent to child (rare)     │
│ Event Delegation     │ Parent handles events for all children             │
│ event.target         │ Element that triggered the event                   │
│ event.currentTarget  │ Element with the event listener                    │
│ stopPropagation()    │ Stops event from bubbling to parents               │
│ preventDefault()     │ Prevents browser's default action                  │
└──────────────────────┴────────────────────────────────────────────────────┘
`;

console.log(table);

// ════════════════════════════════════════════════════════════════════════════════════
// INTERVIEW QUESTIONS & ANSWERS
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== INTERVIEW Q&A ===\n");

// Q1: What is event bubbling?
// A: Event bubbling is when an event propagates from the target element
//    up through its ancestors to the root. It's the default behavior.

// Q2: What is event delegation?
// A: Event delegation is a pattern where you attach a single event listener
//    to a parent element to handle events for all children, using bubbling.

// Q3: What's the difference between target and currentTarget?
// A: target is the element that triggered the event (what you clicked).
//    currentTarget is the element that has the listener attached.

// Q4: When would you use event.stopPropagation()?
// A: When you want to prevent an event from bubbling up to parent elements,
//    like preventing a modal from closing when clicking inside it.

// Q5: What are the benefits of event delegation?
// A: 1. Better performance (fewer listeners)
//    2. Works with dynamically added elements
//    3. Less memory usage
//    4. Cleaner code

// Q6: What's the difference between preventDefault and stopPropagation?
// A: preventDefault stops the browser's default action (like form submission).
//    stopPropagation stops the event from bubbling to parent elements.

console.log("Q1: What is event bubbling?");
console.log("A: Events travel UP from child to parent (default behavior)\n");

console.log("Q2: What is event delegation?");
console.log("A: Parent handles events for all children using bubbling\n");

console.log("Q3: target vs currentTarget?");
console.log("A: target = what you clicked, currentTarget = what has listener\n");

console.log("Q4: When to use stopPropagation?");
console.log("A: When you want to prevent event from bubbling to parents\n");

console.log("Q5: Benefits of event delegation?");
console.log("A: Performance, works with dynamic elements, less memory\n");

// ════════════════════════════════════════════════════════════════════════════════════
// BEST PRACTICES
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== BEST PRACTICES ===\n");

console.log("DO:");
console.log("- Use event delegation for lists and dynamic content");
console.log("- Check event.target to identify clicked element");
console.log("- Use preventDefault() for custom form handling");
console.log("- Use stopPropagation() sparingly (can cause bugs)");
console.log("- Clean up event listeners when removing elements\n");

console.log("DON'T:");
console.log("- Don't add listeners to every child element");
console.log("- Don't overuse stopPropagation() (breaks bubbling)");
console.log("- Don't forget to check if element matches selector");
console.log("- Don't attach too many listeners to document/window");
console.log("- Don't forget preventDefault() can be undone with returnValue");

// Example: Good event delegation
console.log("\nGood Example:");
console.log("parent.addEventListener('click', (e) => {");
console.log("  if (e.target.matches('.button')) {");
console.log("    // Handle button click");
console.log("  }");
console.log("});");

// Example: Bad - too many listeners
console.log("\nBad Example:");
console.log("buttons.forEach(btn => {");
console.log("  btn.addEventListener('click', handler);");
console.log("});");
console.log("// Creates N listeners instead of 1");

// ════════════════════════════════════════════════════════════════════════════════════
// QUICK MEMORIZATION TRICK
// ════════════════════════════════════════════════════════════════════════════════════

console.log("\n=== MEMORIZATION TRICK ===\n");

console.log(`
Think of event propagation like a building:

EVENT BUBBLING = Taking the elevator UP
- Start at ground floor (child element)
- Go up floor by floor (parent elements)
- Reach the roof (window)
- Default behavior

EVENT CAPTURING = Coming down the stairs
- Start at roof (window)
- Come down floor by floor (parent elements)
- Reach ground floor (target element)
- Rarely used

EVENT DELEGATION = Reception desk at entrance
- One receptionist (parent listener)
- Handles all visitors (child events)
- Asks "Which floor?" (checks event.target)
- Efficient and scalable

GOLDEN RULE:
"Bubbling goes UP, Capturing goes DOWN, Delegation uses ONE"
`);

console.log("\nAll examples completed!");

