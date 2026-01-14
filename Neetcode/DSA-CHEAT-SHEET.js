// ════════════════════════════════════════════════════════════════════════════════════
// 📚 DSA DATA STRUCTURE CHEAT SHEET - When to Use What?
// ════════════════════════════════════════════════════════════════════════════════════

// 🎯 QUICK DECISION TREE:
// 
// Need to count frequency? → Use Object {} or Map
// Need unique values only? → Use Set
// Need key-value with non-string keys? → Use Map
// Need ordered collection with index access? → Use Array []
// Need to check existence quickly? → Use Set or Map
// Need to maintain insertion order? → Use Map or Array


// ════════════════════════════════════════════════════════════════════════════════════
// 1️⃣ OBJECT {} - Simple Counting & Frequency Tracking
// ════════════════════════════════════════════════════════════════════════════════════

// ✅ When to Use:
// - Count character/element frequency
// - Cache/memoization (simple key-value)
// - Grouping items by a property
// - Keys are always strings

// ⚡ Time Complexity:
// Access: O(1) | Insert: O(1) | Delete: O(1) | Search: O(1)

// 📝 Common Patterns:

// Pattern 1: Frequency Counter (Valid Anagram, Group Anagrams)
function frequencyCounter(arr) {
    const freq = {};
    for (let item of arr) {
        freq[item] = (freq[item] || 0) + 1;
    }
    return freq;
}
// Example: "hello" → { h: 1, e: 1, l: 2, o: 1 }

// Pattern 2: Grouping (Group Anagrams)
function groupBy(arr, key) {
    const groups = {};
    for (let item of arr) {
        const groupKey = key(item);
        if (!groups[groupKey]) groups[groupKey] = [];
        groups[groupKey].push(item);
    }
    return groups;
}
// Example: ["eat", "tea", "tan"] → { "aet": ["eat", "tea"], "ant": ["tan"] }

// Pattern 3: Check Existence
function hasProperty(obj, key) {
    return key in obj;  // or obj.hasOwnProperty(key)
}



// ════════════════════════════════════════════════════════════════════════════════════
// 2️⃣ MAP - Advanced Key-Value Storage
// ════════════════════════════════════════════════════════════════════════════════════

// ✅ When to Use:
// - Keys can be ANY type (objects, arrays, numbers)
// - Need to preserve insertion order
// - Need .size property
// - Frequent additions/deletions
// - Need to iterate in order

// ⚡ Time Complexity:
// Access: O(1) | Insert: O(1) | Delete: O(1) | Search: O(1)

// 📝 Common Patterns:

// Pattern 1: Two Sum (Store value → index mapping)
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
}
// Why Map? Need to store number as key (objects convert to string)

// Pattern 2: LRU Cache (Order matters)
function trackAccess() {
    const accessMap = new Map();
    // Map maintains insertion order - perfect for LRU
    accessMap.set('page1', Date.now());
    accessMap.set('page2', Date.now());
}

// Pattern 3: Complex Keys (Object as Key)
const objAsKey = new Map();
const key1 = { id: 1 };
const key2 = { id: 2 };
objAsKey.set(key1, 'value1');
objAsKey.set(key2, 'value2');
// Objects as keys - impossible with regular object {}

// 🔥 Map vs Object: When to Choose Map?
// Use Map when:
// - Keys are NOT strings (numbers, objects, etc.)
// - Need to iterate in insertion order
// - Need .size (faster than Object.keys().length)
// - Frequent add/remove operations



// ════════════════════════════════════════════════════════════════════════════════════
// 3️⃣ SET - Unique Values Only
// ════════════════════════════════════════════════════════════════════════════════════

// ✅ When to Use:
// - Remove duplicates
// - Check if value exists (O(1))
// - Need unique collection
// - Set operations (union, intersection, difference)

// ⚡ Time Complexity:
// Add: O(1) | Has: O(1) | Delete: O(1) | Size: O(1)

// 📝 Common Patterns:

// Pattern 1: Contains Duplicate
function containsDuplicate(nums) {
    const seen = new Set();
    for (let num of nums) {
        if (seen.has(num)) return true;
        seen.add(num);
    }
    return false;
}
// Why Set? Check existence in O(1), no need for counting

// Pattern 2: Remove Duplicates
function removeDuplicates(arr) {
    return [...new Set(arr)];
}
// Example: [1, 2, 2, 3] → [1, 2, 3]

// Pattern 3: Longest Consecutive Sequence
function longestConsecutive(nums) {
    const numSet = new Set(nums);
    let maxLength = 0;
    
    for (let num of numSet) {
        // Only start counting if it's the beginning of a sequence
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentLength = 1;
            
            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentLength++;
            }
            maxLength = Math.max(maxLength, currentLength);
        }
    }
    return maxLength;
}
// Why Set? O(1) lookup to check if num-1 or num+1 exists

// Pattern 4: Intersection of Arrays
function intersection(arr1, arr2) {
    const set1 = new Set(arr1);
    const result = new Set();
    
    for (let num of arr2) {
        if (set1.has(num)) {
            result.add(num);
        }
    }
    return [...result];
}



// ════════════════════════════════════════════════════════════════════════════════════
// 4️⃣ ARRAY [] - Ordered Collection with Index
// ════════════════════════════════════════════════════════════════════════════════════

// ✅ When to Use:
// - Need to maintain order
// - Need to access by index
// - Need to iterate sequentially
// - Stack/Queue operations
// - Sorting required

// ⚡ Time Complexity:
// Access by index: O(1)
// Push/Pop (end): O(1)
// Shift/Unshift (start): O(n)
// Search: O(n)
// Sort: O(n log n)

// 📝 Common Patterns:

// Pattern 1: Two Pointers (Valid Palindrome, Container With Most Water)
function twoPointers(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        // Process arr[left] and arr[right]
        left++;
        right--;
    }
}

// Pattern 2: Sliding Window (Longest Substring Without Repeating)
function slidingWindow(s) {
    const seen = new Set();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }
        seen.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    return maxLength;
}

// Pattern 3: Stack (Valid Parentheses)
function isValidParentheses(s) {
    const stack = [];
    const pairs = { '(': ')', '{': '}', '[': ']' };
    
    for (let char of s) {
        if (char in pairs) {
            stack.push(char);
        } else {
            const last = stack.pop();
            if (pairs[last] !== char) return false;
        }
    }
    return stack.length === 0;
}
// Why Array? LIFO (Last In First Out) behavior with push/pop

// Pattern 4: Result Collection
function twoSumAllPairs(nums, target) {
    const result = [];  // Collect multiple results
    const seen = new Set();
    
    for (let num of nums) {
        const complement = target - num;
        if (seen.has(complement)) {
            result.push([complement, num]);
        }
        seen.add(num);
    }
    return result;
}



// ════════════════════════════════════════════════════════════════════════════════════
// 🎯 WHEN TO USE WHAT? - PROBLEM-SPECIFIC GUIDE
// ════════════════════════════════════════════════════════════════════════════════════

const PROBLEM_TO_DATA_STRUCTURE = {
    
    // Character/Element Frequency Problems
    "Valid Anagram": "Object {} - count frequency of each character",
    "Group Anagrams": "Object {} - group by sorted string key",
    "Top K Frequent Elements": "Map - count frequency, then sort",
    
    // Duplicate Detection
    "Contains Duplicate": "Set - O(1) lookup to check if seen before",
    "Remove Duplicates": "Set - automatically handles uniqueness",
    
    // Two Sum Variants
    "Two Sum": "Map - store num→index mapping for O(1) complement lookup",
    "3Sum": "Array with two pointers - sorted array enables pointer movement",
    
    // Substring Problems
    "Longest Substring Without Repeating": "Set + Sliding Window - track seen chars",
    "Minimum Window Substring": "Map - count frequency of target chars",
    
    // Sequence Problems
    "Longest Consecutive Sequence": "Set - O(1) lookup for num-1, num+1",
    "Product of Array Except Self": "Array - prefix/suffix products",
    
    // Stack Problems
    "Valid Parentheses": "Array as Stack - push/pop for LIFO",
    
    // Intersection/Union
    "Intersection of Arrays": "Set - O(1) membership check",
    "Union of Arrays": "Set - automatically merges and deduplicates",
};



// ════════════════════════════════════════════════════════════════════════════════════
// ⚡ QUICK COMPARISON TABLE
// ════════════════════════════════════════════════════════════════════════════════════

/*
┌─────────────┬──────────────┬──────────────┬──────────────┬──────────────┐
│  Operation  │   Object {}  │     Map      │     Set      │   Array []   │
├─────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
│ Key Type    │ String only  │ Any type     │ N/A (values) │ Number index │
│ Duplicates  │ No (overwrites)│ No (overwrites)│ No         │ Yes          │
│ Ordered     │ Not guaranteed│ Insertion    │ Insertion    │ Yes          │
│ Get Size    │ Object.keys().length│ map.size  │ set.size     │ arr.length   │
│ Check Exists│ key in obj   │ map.has(key) │ set.has(val) │ arr.includes │
│ Iterate     │ for...in     │ for...of     │ for...of     │ for...of     │
│ Best For    │ Frequency    │ Complex keys │ Unique values│ Ordered data │
└─────────────┴──────────────┴──────────────┴──────────────┴──────────────┘
*/



// ════════════════════════════════════════════════════════════════════════════════════
// 🔥 REAL INTERVIEW SCENARIOS - DECISION FLOWCHART
// ════════════════════════════════════════════════════════════════════════════════════

function chooseDataStructure(problem) {
    // START HERE ↓
    
    // Question 1: Do you need to COUNT something?
    if (problem.includes("count") || problem.includes("frequency")) {
        return "Use Object {} or Map (Map if keys aren't strings)";
    }
    
    // Question 2: Do you need UNIQUE values only?
    if (problem.includes("duplicate") || problem.includes("unique")) {
        return "Use Set for O(1) existence check";
    }
    
    // Question 3: Do you need to FIND a pair that sums to target?
    if (problem.includes("two sum") || problem.includes("complement")) {
        return "Use Map to store value→index mapping";
    }
    
    // Question 4: Do you need to track SEEN elements while iterating?
    if (problem.includes("longest") || problem.includes("substring")) {
        return "Use Set (for chars) + Sliding Window pattern";
    }
    
    // Question 5: Do you need LIFO (Last In First Out)?
    if (problem.includes("parentheses") || problem.includes("stack")) {
        return "Use Array as Stack (push/pop)";
    }
    
    // Question 6: Do you need to work with SORTED data?
    if (problem.includes("sorted") || problem.includes("pointers")) {
        return "Use Array with Two Pointers technique";
    }
    
    // Default: Start with Array and optimize later
    return "Use Array [] - most versatile, can convert to others if needed";
}



// ════════════════════════════════════════════════════════════════════════════════════
// 💡 PROTIPS FOR INTERVIEWS
// ════════════════════════════════════════════════════════════════════════════════════

/*
1. ✅ START SIMPLE, OPTIMIZE LATER
   - Begin with Array/Object
   - Identify bottlenecks
   - Switch to Map/Set if needed

2. ✅ REMEMBER TIME COMPLEXITIES
   - Array.includes(): O(n) ❌
   - Set.has(): O(1) ✅
   - Object lookup: O(1) ✅
   - Map.get(): O(1) ✅

3. ✅ COMMON CONVERSIONS
   - Array → Set: new Set(arr)
   - Set → Array: [...set] or Array.from(set)
   - Object → Map: new Map(Object.entries(obj))
   - Map → Object: Object.fromEntries(map)

4. ✅ WATCH OUT FOR EDGE CASES
   - Empty inputs: [], {}, new Set(), new Map()
   - Single element: [1], {a: 1}
   - All duplicates: [1,1,1,1]
   - No duplicates: [1,2,3,4]

5. ✅ VERBALIZE YOUR CHOICE IN INTERVIEW
   "I'm using a Set here because we need O(1) lookups to check if we've seen
   this element before, and we don't care about order or duplicates."
*/



// ════════════════════════════════════════════════════════════════════════════════════
// 🎓 MEMORY CHEATCODES (memorize these)
// ════════════════════════════════════════════════════════════════════════════════════

const MEMORY_TRICKS = {
    // "Need to COUNT" → Object/Map
    "Anagram, Frequency, Occurrence": "Object {} or Map",
    
    // "Need to CHECK" → Set
    "Duplicate, Unique, Exists, Has": "Set",
    
    // "Need to FIND PAIR" → Map
    "Two Sum, Complement, Pair": "Map (value→index)",
    
    // "Need to TRACK in WINDOW" → Set + Pointers
    "Longest, Substring, Window": "Set + left/right pointers",
    
    // "Need to MATCH/BALANCE" → Array as Stack
    "Parentheses, Brackets, Balance": "Array (push/pop)",
    
    // "Need to COMPARE TWO" → Set intersection
    "Common, Intersection, Shared": "Set (convert both to Set)",
};



// ════════════════════════════════════════════════════════════════════════════════════
// 🧪 PRACTICE PROBLEMS - TRY TO IDENTIFY CORRECT DATA STRUCTURE
// ════════════════════════════════════════════════════════════════════════════════════

const PRACTICE = {
    // Problem 1
    question1: "Find if array has duplicate elements",
    hint1: "Need to check if element was seen before - O(1) lookup?",
    answer1: "Set - add elements and check set.has() before adding",
    
    // Problem 2
    question2: "Count frequency of each character in a string",
    hint2: "Need to store char→count mapping",
    answer2: "Object {} - keys are chars, values are counts",
    
    // Problem 3
    question3: "Find two numbers that add up to target",
    hint3: "For each num, need to check if (target - num) exists",
    answer3: "Map - store num→index, check map.has(complement)",
    
    // Problem 4
    question4: "Find longest substring without repeating characters",
    hint4: "Need sliding window + track which chars are in current window",
    answer4: "Set + two pointers (left/right)",
    
    // Problem 5
    question5: "Check if string has balanced parentheses",
    hint5: "Need to match closing bracket with most recent opening bracket",
    answer5: "Array as Stack - push opening, pop and match closing",
};

