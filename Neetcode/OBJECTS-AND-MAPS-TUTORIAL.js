// ════════════════════════════════════════════════════════════════════════════════════
// JAVASCRIPT OBJECTS & MAPS - COMPLETE GROUND-UP TUTORIAL
// ════════════════════════════════════════════════════════════════════════════════════
//
// Goal: Build a ROCK-SOLID mental model so you NEVER get confused again!
// We'll move SLOWLY and VISUALLY through every concept.
//
// ════════════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════════
// PART 1: OBJECTS - WHAT YOU ALREADY KNOW (Foundation)
// ═══════════════════════════════════════════════════════════════════════════════════

//  REAL-WORLD ANALOGY: An object is like a FILING CABINET
//
//     ┌─────────────────┐
//     │  Filing Cabinet │
//     ├─────────────────┤
//     │ [name] drawer   │ ← Contains "Praveen"
//     ├─────────────────┤
//     │ [age] drawer    │ ← Contains 30
//     └─────────────────┘
//
// Each drawer has a LABEL (property name) and CONTENTS (property value)

const person = {
  name: "Praveen",
  age: 30
};

// TWO WAYS TO OPEN A DRAWER:

// Method 1: DOT NOTATION (when you KNOW the drawer label)
console.log(person.name);    // "Praveen"
console.log(person.age);     // 30

// Method 2: BRACKET NOTATION (when drawer label is a STRING)
console.log(person["name"]); // "Praveen"
console.log(person["age"]);  // 30

// KEY INSIGHT: Both do the SAME thing!
// person.name === person["name"]  ✅ TRUE


// ═══════════════════════════════════════════════════════════════════════════════════
// PART 2: WHY BRACKET NOTATION EXISTS (The "Aha!" Moment)
// ═══════════════════════════════════════════════════════════════════════════════════

// SCENARIO: What if the drawer label is stored in a VARIABLE?

const whichDrawer = "name";  // This is a STRING containing "name"

// ❌ WRONG: This looks for a drawer literally called "whichDrawer"
console.log(person.whichDrawer);  // undefined (no drawer with this label!)

// ✅ CORRECT: Brackets EVALUATE the variable first, then use its value
console.log(person[whichDrawer]);  // "Praveen"

// 🎬 MENTAL MOVIE: What JavaScript does step-by-step:
// Step 1: Look at whichDrawer variable → it contains "name"
// Step 2: Replace [whichDrawer] with ["name"]
// Step 3: Open the "name" drawer → get "Praveen"


// LET'S SEE THIS IN ACTION:

const key1 = "name";
const key2 = "age";

console.log(person[key1]);  // JavaScript: key1 is "name" → person["name"] → "Praveen"
console.log(person[key2]);  // JavaScript: key2 is "age" → person["age"] → 30


// RULE #1: Use DOT notation when you write the property name directly
//             Use BRACKET notation when the property name is in a variable


// ═══════════════════════════════════════════════════════════════════════════════════
// PART 3: CREATING PROPERTIES DYNAMICALLY (The Game Changer!)
// ═══════════════════════════════════════════════════════════════════════════════════

// REAL-WORLD ANALOGY: You're a LOCKER MANAGER at a gym
//
// People come in, and you assign them lockers based on their membership type:
// - "gold" members → locker in gold section
// - "silver" members → locker in silver section
//
// You don't know membership type in advance - it's DYNAMIC!

// Start with an EMPTY locker system
const lockers = {};

// Person 1 arrives: membership type = "gold"
const membershipType1 = "gold";

// Check: Does the "gold" section exist?
if (!lockers[membershipType1]) {
  // No! Create it (it's an empty array to hold locker numbers)
  lockers[membershipType1] = [];
}
// Add locker number to gold section
lockers[membershipType1].push(101);

console.log("After Person 1:", lockers);
// lockers = {
//   gold: [101]
// }

// Person 2 arrives: membership type = "silver"
const membershipType2 = "silver";

if (!lockers[membershipType2]) {
  lockers[membershipType2] = [];  // Create silver section
}
lockers[membershipType2].push(201);

console.log("After Person 2:", lockers);
// lockers = {
//   gold: [101],
//   silver: [201]
// }

// Person 3 arrives: membership type = "gold" (already exists!)
const membershipType3 = "gold";

if (!lockers[membershipType3]) {
  // This check is FALSE (gold already exists), so we skip this
}
lockers[membershipType3].push(102);  // Just add to existing array

console.log("After Person 3:", lockers);
// lockers = {
//   gold: [101, 102],    ← Person 1 and Person 3
//   silver: [201]         ← Person 2
// }


// KEY INSIGHT: lockers[membershipType] works because:
// 1. membershipType is a VARIABLE containing a STRING
// 2. JavaScript evaluates it FIRST, then uses that string as the property name


// ═══════════════════════════════════════════════════════════════════════════════════
// PART 4: THE GROUPING PATTERN (Main Confusion Point!)
// ═══════════════════════════════════════════════════════════════════════════════════

// REAL-WORLD EXAMPLE: Group students by their grade

const students = [
  { name: "Alice", grade: "A" },
  { name: "Bob", grade: "B" },
  { name: "Charlie", grade: "A" },
  { name: "David", grade: "C" },
  { name: "Eve", grade: "B" }
];

// GOAL: Create this structure:
// {
//   A: ["Alice", "Charlie"],
//   B: ["Bob", "Eve"],
//   C: ["David"]
// }

// STEP-BY-STEP WALKTHROUGH (Watch the object change!)

const groups = {};  // Empty object (filing cabinet with NO drawers yet)

console.log("Initial state:", groups);
// groups = {}


// ─────────────────────────────────────────────────────────────────────────
// ITERATION 1: Processing { name: "Alice", grade: "A" }
// ─────────────────────────────────────────────────────────────────────────

const item1 = students[0];  // { name: "Alice", grade: "A" }
const groupKey1 = item1.grade;  // "A"

console.log("\n--- ITERATION 1 ---");
console.log("Current item:", item1);
console.log("groupKey:", groupKey1);  // "A"
console.log("Does groups['A'] exist?", groups[groupKey1]);  // undefined (doesn't exist yet)

// Check if groups["A"] exists
if (!groups[groupKey1]) {  // !undefined is TRUE, so we enter this block
  console.log("Creating groups['A'] = []");
  groups[groupKey1] = [];  // Create a new drawer labeled "A" with an empty array
}

console.log("After creating:", groups);
// groups = { A: [] }

// Add Alice to the "A" group
groups[groupKey1].push(item1.name);
console.log("After adding Alice:", groups);
// groups = { A: ["Alice"] }


// ─────────────────────────────────────────────────────────────────────────
// ITERATION 2: Processing { name: "Bob", grade: "B" }
// ─────────────────────────────────────────────────────────────────────────

const item2 = students[1];  // { name: "Bob", grade: "B" }
const groupKey2 = item2.grade;  // "B"

console.log("\n--- ITERATION 2 ---");
console.log("Current item:", item2);
console.log("groupKey:", groupKey2);  // "B"
console.log("Does groups['B'] exist?", groups[groupKey2]);  // undefined

if (!groups[groupKey2]) {  // TRUE, "B" doesn't exist yet
  console.log("Creating groups['B'] = []");
  groups[groupKey2] = [];
}

console.log("After creating:", groups);
// groups = { A: ["Alice"], B: [] }

groups[groupKey2].push(item2.name);
console.log("After adding Bob:", groups);
// groups = { A: ["Alice"], B: ["Bob"] }


// ─────────────────────────────────────────────────────────────────────────
// ITERATION 3: Processing { name: "Charlie", grade: "A" }
// ─────────────────────────────────────────────────────────────────────────

const item3 = students[2];  // { name: "Charlie", grade: "A" }
const groupKey3 = item3.grade;  // "A"

console.log("\n--- ITERATION 3 ---");
console.log("Current item:", item3);
console.log("groupKey:", groupKey3);  // "A"
console.log("Does groups['A'] exist?", groups[groupKey3]);  // ["Alice"] (exists!)

if (!groups[groupKey3]) {  // FALSE! groups["A"] already has ["Alice"]
  // WE SKIP THIS - no need to create, it already exists
  console.log("groups['A'] already exists, skipping creation");
}

console.log("groups['A'] already exists:", groups[groupKey3]);  // ["Alice"]

// Just add Charlie to the existing "A" array
groups[groupKey3].push(item3.name);
console.log("After adding Charlie:", groups);
// groups = { A: ["Alice", "Charlie"], B: ["Bob"] }


// ─────────────────────────────────────────────────────────────────────────
// ITERATION 4 & 5: (Same pattern)
// ─────────────────────────────────────────────────────────────────────────
// David (grade "C") → creates groups["C"] = ["David"]
// Eve (grade "B") → adds to existing groups["B"] → ["Bob", "Eve"]


// FINAL RESULT:
console.log("\n=== FINAL RESULT ===");
console.log(groups);
// {
//   A: ["Alice", "Charlie"],
//   B: ["Bob", "Eve"],
//   C: ["David"]
// }


// THE COMPLETE PATTERN (What you see in DSA problems):

function groupByGrade(students) {
  const groups = {};  // Empty object

  for (let item of students) {
    const groupKey = item.grade;  // Extract the grouping key (dynamic!)

    // If this group doesn't exist, create it
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }

    // Add item to the group
    groups[groupKey].push(item.name);
  }

  return groups;
}


// WHY CAN'T WE USE DOT NOTATION?

// ❌ WRONG: This tries to access a property literally called "groupKey"
// groups.groupKey = [];  // Creates: { groupKey: [] }  ← WRONG!

// ✅ CORRECT: Brackets evaluate the variable first
// groups[groupKey] = [];  // Creates: { A: [] } or { B: [] } etc.


// MENTAL MODEL:
//
// groups[groupKey] means:
// 1. Look at what groupKey contains (let's say "A")
// 2. Replace groups[groupKey] with groups["A"]
// 3. Access or create the property "A" in the groups object
//
// It's like saying: "Open the drawer whose label is stored in this variable"


// ═══════════════════════════════════════════════════════════════════════════════════
// PART 5: REAL DSA EXAMPLE - GROUP ANAGRAMS
// ═══════════════════════════════════════════════════════════════════════════════════

// Problem: Group words that are anagrams
// Input: ["eat", "tea", "tan", "ate", "nat", "bat"]
// Output: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]

// Strategy: Sort each word's letters → use as grouping key
// "eat" → sorted = "aet"
// "tea" → sorted = "aet" (same key!)
// "ate" → sorted = "aet" (same key!)

function groupAnagrams(words) {
  const groups = {};

  for (let word of words) {
    // Create a unique key by sorting the word's letters
    const groupKey = word.split('').sort().join('');

    console.log(`Word: ${word} → Sorted key: ${groupKey}`);

    // If this key doesn't exist, create it
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }

    // Add word to its group
    groups[groupKey].push(word);
  }

  // Return just the groups (values), not the keys
  return Object.values(groups);
}

console.log("\n=== GROUP ANAGRAMS ===");
const result = groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
console.log(result);

// WHAT HAPPENS IN MEMORY:
//
// After "eat":   { aet: ["eat"] }
// After "tea":   { aet: ["eat", "tea"] }          ← same key!
// After "tan":   { aet: ["eat", "tea"], ant: ["tan"] }
// After "ate":   { aet: ["eat", "tea", "ate"], ant: ["tan"] }
// After "nat":   { aet: ["eat", "tea", "ate"], ant: ["tan", "nat"] }
// After "bat":   { aet: ["eat", "tea", "ate"], ant: ["tan", "nat"], abt: ["bat"] }


// ═══════════════════════════════════════════════════════════════════════════════════
// PART 6: INTRODUCING MAP (A Better Tool for Certain Jobs)
// ═══════════════════════════════════════════════════════════════════════════════════

// REAL-WORLD ANALOGY: Object vs Map
//
// OBJECT = Simple filing cabinet
//   - Drawer labels MUST be strings
//   - Easy to use for simple lookups
//
// MAP = High-tech storage system
//   - Labels can be ANYTHING (numbers, objects, arrays!)
//   - Has built-in methods (.get, .set, .has)
//   - Remembers insertion order
//   - Better for frequent additions/deletions

// 📝 CREATING A MAP

const phoneBook = new Map();

// Adding entries with .set(key, value)
phoneBook.set("Alice", "555-1234");
phoneBook.set("Bob", "555-5678");
phoneBook.set("Charlie", "555-9012");

console.log("\n=== MAP BASICS ===");
console.log("Full Map:", phoneBook);

// Getting values with .get(key)
console.log("Alice's number:", phoneBook.get("Alice"));  // "555-1234"
console.log("Bob's number:", phoneBook.get("Bob"));      // "555-5678"

// Checking if key exists with .has(key)
console.log("Has Alice?", phoneBook.has("Alice"));  // true
console.log("Has David?", phoneBook.has("David"));  // false

// Getting the size
console.log("Total entries:", phoneBook.size);  // 3


// 🔍 MAP vs OBJECT COMPARISON

// WITH OBJECT:
const obj = {};
obj["Alice"] = "555-1234";
const aliceNumber = obj["Alice"];
const hasAlice = "Alice" in obj;

// WITH MAP:
const map = new Map();
map.set("Alice", "555-1234");
const aliceNumberFromMap = map.get("Alice");
const hasAliceInMap = map.has("Alice");

// 💡 Map is cleaner and more explicit!


// ═══════════════════════════════════════════════════════════════════════════════════
// PART 7: TWO SUM PROBLEM WITH MAP (Step-by-Step Breakdown)
// ═══════════════════════════════════════════════════════════════════════════════════

// PROBLEM: Find two numbers that add up to target
// Input: nums = [2, 7, 11, 15], target = 9
// Output: [0, 1] (because nums[0] + nums[1] = 2 + 7 = 9)

// STRATEGY:
// For each number, check if we've seen its "complement" (target - number)
// Store each number with its index as we go

function twoSum(nums, target) {
  // Map will store: number → index
  // Key: the number itself
  // Value: its position in the array
  const map = new Map();

  console.log("\n=== TWO SUM WALKTHROUGH ===");
  console.log("nums:", nums, "target:", target);

  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i];
    const complement = target - currentNum;

    console.log(`\n--- Step ${i + 1} ---`);
    console.log(`Current number: ${currentNum} at index ${i}`);
    console.log(`Looking for complement: ${complement} (because ${currentNum} + ${complement} = ${target})`);

    // Check if we've seen the complement before
    if (map.has(complement)) {
      console.log(`✅ FOUND! Complement ${complement} exists in map!`);

      const complementIndex = map.get(complement);
      console.log(`Complement ${complement} is at index ${complementIndex}`);
      console.log(`Solution: [${complementIndex}, ${i}]`);

      return [complementIndex, i];
    }

    console.log(`Complement ${complement} not found. Storing ${currentNum} → ${i} in map`);
    // Store current number and its index for future lookups
    map.set(currentNum, i);

    console.log("Map state:", map);
  }

  return []; // No solution found
}


// DETAILED WALKTHROUGH: nums = [2, 7, 11, 15], target = 9

console.log("\n" + "=".repeat(70));
const nums = [2, 7, 11, 15];
const target = 9;
const answer = twoSum(nums, target);
console.log("\nFinal answer:", answer);


// MEMORY STATE AT EACH ITERATION:
//
// Iteration 0: i=0, currentNum=2
//   complement = 9 - 2 = 7
//   map.has(7)? NO
//   Store: map.set(2, 0)
//   Map: { 2 → 0 }
//
// Iteration 1: i=1, currentNum=7
//   complement = 9 - 7 = 2
//   map.has(2)? YES! ✅
//   map.get(2) returns 0
//   Return [0, 1] ← Found the answer!


// UNDERSTANDING map.get(complement):
//
// map.get(complement) means:
// 1. Look at what 'complement' contains (let's say 2)
// 2. Find the key '2' in the map
// 3. Return its VALUE (which is 0, the index)
//
// So: map.get(2) → 0


// UNDERSTANDING [map.get(complement), i]:
//
// This creates an ARRAY with two elements:
// [map.get(complement), i]
//   ↓                    ↓
//   Index where we       Current index
//   found complement
//
// Example: [0, 1]
//          ↓  ↓
//          |  Current position (i=1, number is 7)
//          |
//          Previous position (stored in map, number was 2)


// ═══════════════════════════════════════════════════════════════════════════════════
// PART 8: ANOTHER MAP EXAMPLE - FREQUENCY COUNTER
// ═══════════════════════════════════════════════════════════════════════════════════

// Count how many times each letter appears

function countLetters(str) {
  const map = new Map();

  console.log("\n=== COUNTING LETTERS ===");
  console.log("String:", str);

  for (let char of str) {
    console.log(`\nProcessing: '${char}'`);

    // Check if we've seen this letter before
    if (map.has(char)) {
      const currentCount = map.get(char);
      console.log(`'${char}' already exists with count ${currentCount}`);
      map.set(char, currentCount + 1);
      console.log(`Updated '${char}' to count ${currentCount + 1}`);
    } else {
      console.log(`'${char}' is new, setting count to 1`);
      map.set(char, 1);
    }

    console.log("Map state:", map);
  }

  return map;
}

const letterCounts = countLetters("hello");
console.log("\nFinal counts:", letterCounts);

// Result:
// Map {
//   'h' → 1,
//   'e' → 1,
//   'l' → 2,  ← appeared twice!
//   'o' → 1
// }


// ═══════════════════════════════════════════════════════════════════════════════════
// PART 9: OBJECT VS MAP - WHEN TO USE WHICH?
// ═══════════════════════════════════════════════════════════════════════════════════

console.log("\n" + "=".repeat(70));
console.log("OBJECT VS MAP COMPARISON");
console.log("=".repeat(70));

// ┌─────────────────┬──────────────────────┬──────────────────────┐
// │   Feature       │      Object {}       │      Map             │
// ├─────────────────┼──────────────────────┼──────────────────────┤
// │ Key Types       │ Strings only*        │ ANY type             │
// │ Get value       │ obj[key] or obj.key  │ map.get(key)         │
// │ Set value       │ obj[key] = val       │ map.set(key, val)    │
// │ Check exists    │ key in obj           │ map.has(key)         │
// │ Delete          │ delete obj[key]      │ map.delete(key)      │
// │ Get size        │ Object.keys().length │ map.size             │
// │ Iteration       │ for...in loop        │ for...of, forEach    │
// │ Order preserved │ Not guaranteed**     │ YES (insertion order)│
// │ Performance     │ Good for simple ops  │ Better for frequent  │
// │                 │                      │ add/delete           │
// └─────────────────┴──────────────────────┴──────────────────────┘
//
// * Objects convert keys to strings (numbers become "1", "2", etc.)
// ** Modern JS preserves order, but not guaranteed in spec


// 🎯 USE OBJECT WHEN:
// ✅ Keys are simple strings
// ✅ You need JSON serialization (JSON.stringify works with objects)
// ✅ You're doing simple lookups and grouping
// ✅ Example: Group anagrams, count characters

// 🎯 USE MAP WHEN:
// ✅ Keys might NOT be strings (numbers, objects, etc.)
// ✅ You need to preserve insertion order
// ✅ You need frequent additions/deletions
// ✅ You need the .size property
// ✅ Example: Two Sum (numeric keys), caching, LRU cache


// ═══════════════════════════════════════════════════════════════════════════════════
// PART 10: PRACTICE EXERCISES (Build Your Confidence!)
// ═══════════════════════════════════════════════════════════════════════════════════

console.log("\n" + "=".repeat(70));
console.log("PRACTICE EXERCISES");
console.log("=".repeat(70));

// EXERCISE 1: Group people by age
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 25 },
  { name: "David", age: 30 }
];

function groupByAge(people) {
  const groups = {};

  for (let person of people) {
    const groupKey = person.age;  // What's this? → a number (25 or 30)

    if (!groups[groupKey]) {      // groups[25] or groups[30]
      groups[groupKey] = [];
    }

    groups[groupKey].push(person.name);
  }

  return groups;
}

console.log("\nExercise 1 - Group by age:");
console.log(groupByAge(people));
// Result: { 25: ["Alice", "Charlie"], 30: ["Bob", "David"] }


// EXERCISE 2: Find first duplicate using Map
function findFirstDuplicate(nums) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    if (seen.has(num)) {
      // Found a duplicate!
      const firstIndex = seen.get(num);
      return { value: num, firstIndex: firstIndex, secondIndex: i };
    }

    seen.set(num, i);  // Store this number with its index
  }

  return null; // No duplicate found
}

console.log("\nExercise 2 - Find first duplicate:");
console.log(findFirstDuplicate([1, 2, 3, 2, 4]));
// Result: { value: 2, firstIndex: 1, secondIndex: 3 }


// ═══════════════════════════════════════════════════════════════════════════════════
// PART 11: CONFIDENCE-BUILDING SUMMARY
// ═══════════════════════════════════════════════════════════════════════════════════

console.log("\n" + "=".repeat(70));
console.log("KEY TAKEAWAYS - MEMORIZE THESE!");
console.log("=".repeat(70));

/*

1. BRACKET NOTATION IS DYNAMIC ACCESS
   ────────────────────────────────────
   obj[key] means: "Use whatever VALUE is in the 'key' variable"

   const key = "name";
   obj[key]  →  JavaScript replaces with obj["name"]


2. WHY NOT DOT NOTATION?
   ─────────────────────
   obj.key   → Looks for property literally called "key"
   obj[key]  → Uses the VALUE inside the key variable

   You MUST use brackets when the property name is in a variable!


3. THE GROUPING PATTERN (Master This!)
   ────────────────────────────────────
   const groups = {};
   for (let item of array) {
     const groupKey = /* some property */;

     if (!groups[groupKey]) {     // Does this group exist?
       groups[groupKey] = [];     // No? Create it!
     }

     groups[groupKey].push(item); // Add to group
//    } --> this is the end of the for loop


// 4. MAP.GET() RETURNS THE VALUE
//    ────────────────────────────── --> this is the end of the function
   map.set("Alice", 25);    // Store: "Alice" → 25
   map.get("Alice");        // Returns: 25

//    In Two Sum:
   map.set(2, 0);           // Store: number 2 at index 0
   map.get(2);              // Returns: 0 (the index)


// 5. [map.get(complement), i] IS AN ARRAY
//    ───────────────────────────────────── --> this is the end of the function
//    This creates: [index_where_complement_was_found, current_index]
//
//    Example: [0, 1]
//             ↓  ↓
//             |  Current position
//             |
//             Position where we found the complement


// 6. MENTAL MODEL FOR DYNAMIC ACCESS
//    ──────────────────────────────── --> this is the end of the function
//    groups[groupKey]
//
//    Step 1: What does groupKey contain? (let's say "A")
//    Step 2: Replace: groups["A"]
//    Step 3: Access or create property "A"
//
//    It's like: "Open the drawer whose name is written on this sticky note"


// 7. WHEN YOU SEE obj[something]:
//    ───────────────────────────── --> this is the end of the function
//    Ask yourself:
//   1. What is 'something'? (a variable)
//   2. What VALUE does it contain? (a string/number)
//   3. That value becomes the property name!


console.log("\n You now have a COMPLETE mental model!");
console.log("🔥 Practice these patterns and you'll NEVER forget them!");
console.log("\n" + "=".repeat(70));

