// ════════════════════════════════════════════════════════════════════════════════════
// 🔄 REVERSE LINKED LIST - Three Pointer Technique
// ════════════════════════════════════════════════════════════════════════════════════

// 📝 Problem: Reverse a singly linked list
// Input:  1 → 2 → 3 → 4 → 5 → null
// Output: 5 → 4 → 3 → 2 → 1 → null

// 🎨 Visual Transformation:
//
// Before:  1 → 2 → 3 → 4 → 5 → null
//
// After:   null ← 1 ← 2 ← 3 ← 4 ← 5
//          (this is the same as: 5 → 4 → 3 → 2 → 1 → null)

// 🧠 KEY INSIGHT: The Three Pointer Technique
//
// To reverse arrows (→), we need to:
//   1. Remember where we came from (prev)
//   2. Know where we are (curr)
//   3. Save where we're going (next) before we change the arrow!
//
// Think of it like walking backwards:
//   - You need to remember where you just were (prev)
//   - You know where you are now (curr)
//   - You peek at where you're about to go (next) before turning around

// 💡 STRATEGY:
// 1. Use THREE pointers: prev, curr, next
// 2. For each node:
//    a) Save next node (before we lose it!)
//    b) Reverse the arrow: curr.next = prev
//    c) Move prev forward (to curr)
//    d) Move curr forward (to next)
// 3. Return prev (it becomes the new head)

// ✅ Iterative Solution – O(n) Time, O(1) Space


// Definition for a singly-linked list node
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
  }
  
  // Helper: Build a linked list from array
  function buildList(arr) {
    let dummy = new ListNode(-1);
    let current = dummy;
  
    for (let val of arr) {
      current.next = new ListNode(val);
      current = current.next;
    }
  
    return dummy.next; // head of the actual list
  }
  
  // Helper: Print linked list as string
  function printList(head) {
    let result = [];
    while (head) {
      result.push(head.val);
      head = head.next;
    }
    console.log(result.join(" -> "));
  }
  
  // 🔁 Core Function: Reverse a linked list
  function reverseList(head) {
    // Initialize two pointers
    let prev = null;   // Points to previous node (starts as null - the new tail)
    let curr = head;   // Points to current node (starts at head)
  
    // Process each node until we reach the end
    while (curr) {
      // Step 1: SAVE the next node (before we lose it!)
      let next = curr.next; 
      
      // Step 2: REVERSE the arrow - point current node back to previous
      curr.next = prev;     
      
      // Step 3: MOVE prev forward - it becomes current node
      prev = curr;          
      
      // Step 4: MOVE curr forward - go to next node
      curr = next;          
    }
  
    // When loop ends, curr is null and prev is at the last node
    return prev; // prev is the new head!
  }

// 🎬 STEP-BY-STEP VISUALIZATION:
//
// Original: 1 → 2 → 3 → null
//
// ═══════════════════════════════════════════════════════════════════
// Initial State:
//           prev  curr  next
//           null   1  →  2  →  3 → null
//
// ═══════════════════════════════════════════════════════════════════
// Iteration 1: Processing node 1
//
// Step 1: Save next
//           prev  curr  next
//           null   1      2  →  3 → null
//
// Step 2: Reverse arrow (1.next = null)
//           prev ← 1     
//                  curr  next
//                         2  →  3 → null
//
// Step 3: Move prev forward
//                  prev  next
//           null ← 1      2  →  3 → null
//
// Step 4: Move curr forward
//                  prev  curr
//           null ← 1      2  →  3 → null
//
// ═══════════════════════════════════════════════════════════════════
// Iteration 2: Processing node 2
//
// Step 1: Save next
//                  prev  curr  next
//           null ← 1      2      3  → null
//
// Step 2: Reverse arrow (2.next = 1)
//           null ← 1 ←  2
//                  prev  curr  next
//                               3  → null
//
// Step 3 & 4: Move both forward
//           null ← 1 ←  2      3  → null
//                       prev  curr
//
// ═══════════════════════════════════════════════════════════════════
// Iteration 3: Processing node 3
//
// Step 1: Save next
//                       prev  curr  next
//           null ← 1 ← 2      3     null
//
// Step 2: Reverse arrow (3.next = 2)
//           null ← 1 ← 2 ← 3
//                       prev  curr  next
//                                   null
//
// Step 3 & 4: Move both forward
//           null ← 1 ← 2 ← 3        null
//                            prev  curr
//
// ═══════════════════════════════════════════════════════════════════
// Final: curr is null, loop ends
// Return prev (which is 3, the new head!)
//
// Result: 3 → 2 → 1 → null  ✅

// 💡 WHY WE NEED "NEXT" POINTER:
//
// Without saving next:
//   curr.next = prev;  // We just broke the link to rest of list!
//   curr = curr.next;  // This is now prev, not the next node! 😱
//
// With saving next:
//   let next = curr.next;  // Save it first! ✅
//   curr.next = prev;      // Break the link
//   curr = next;           // Use saved value to move forward ✅

// ⚡ COMPLEXITY:
// Time: O(n) - visit each node once
// Space: O(1) - only 3 pointers, no recursion stack

// 🎯 EASY MEMORIZATION TRICK:
// "Three steps dance":
//   1. SAVE next (don't lose it!)
//   2. FLIP arrow (curr.next = prev)
//   3. MOVE forward (prev = curr, curr = next)
//
// Or remember: "Save, Flip, Move"
  
  // ═══════════════════════════════════════════════════════════════════════
  // 🔥 ALTERNATIVE: RECURSIVE SOLUTION (More elegant but uses O(n) space)
  // ═══════════════════════════════════════════════════════════════════════
  
  function reverseListRecursive(head) {
    // Base case: empty list or single node
    if (!head || !head.next) {
      return head;
    }
  
    // Recursively reverse the rest of the list
    const newHead = reverseListRecursive(head.next);
    
    // Reverse the current link
    // Before: 1 → 2 → 3 (where head is 1)
    // After recursion: 1 → 2 ← 3 (head.next is 2, which points to 3)
    head.next.next = head;  // Make next node point back to current
    head.next = null;       // Current node becomes tail (points to null)
    
    return newHead; // Return the new head (last node of original list)
  }

  // 🎬 RECURSIVE VISUALIZATION:
  //
  // Original: 1 → 2 → 3 → null
  //
  // Call Stack:
  //   reverseList(1 → 2 → 3)
  //     reverseList(2 → 3)
  //       reverseList(3)      ← Base case! Return 3
  //       
  //       Now unwinding...
  //       At node 2: 2.next.next = 2  →  3 ← 2
  //                  2.next = null     →  3 ← 2    null
  //       
  //     At node 1: 1.next.next = 1   →  3 ← 2 ← 1
  //                1.next = null      →  3 ← 2 ← 1   null
  //
  // Result: 3 → 2 → 1 → null ✅

  // ⚡ Comparison:
  // Iterative:  O(n) time, O(1) space ✅ Better for interviews!
  // Recursive:  O(n) time, O(n) space   (call stack uses memory)

  // 💡 Interview Tip:
  // Start with iterative (shows you understand pointers)
  // Mention recursive as alternative (shows you know different approaches)

  // ═══════════════════════════════════════════════════════════════════════
  // 🧪 TEST CASES
  // ═══════════════════════════════════════════════════════════════════════
  
  console.log("═══════════════════════════════════");
  console.log("Test 1: Normal list");
  console.log("═══════════════════════════════════");
  const inputArray1 = [1, 2, 3, 4, 5];
  const head1 = buildList(inputArray1);
  
  console.log("Original:");
  printList(head1);
  
  const reversedHead1 = reverseList(head1);
  
  console.log("Reversed (Iterative):");
  printList(reversedHead1);
  
  console.log("\n═══════════════════════════════════");
  console.log("Test 2: Using Recursive");
  console.log("═══════════════════════════════════");
  const inputArray2 = [1, 2, 3];
  const head2 = buildList(inputArray2);
  
  console.log("Original:");
  printList(head2);
  
  const reversedHead2 = reverseListRecursive(head2);
  
  console.log("Reversed (Recursive):");
  printList(reversedHead2);
  
  console.log("\n═══════════════════════════════════");
  console.log("Test 3: Single node");
  console.log("═══════════════════════════════════");
  const single = new ListNode(1);
  console.log("Original:");
  printList(single);
  console.log("Reversed:");
  printList(reverseList(single));
  
  console.log("\n═══════════════════════════════════");
  console.log("Test 4: Two nodes");
  console.log("═══════════════════════════════════");
  const head4 = buildList([1, 2]);
  console.log("Original:");
  printList(head4);
  console.log("Reversed:");
  printList(reverseList(head4));

// ═══════════════════════════════════════════════════════════════════════
// 📚 COMMON MISTAKES TO AVOID
// ═══════════════════════════════════════════════════════════════════════

/*
❌ MISTAKE 1: Not saving next
   curr.next = prev;
   curr = curr.next;  // WRONG! curr.next is now prev, not the next node!

✅ CORRECT:
   let next = curr.next;  // Save first!
   curr.next = prev;
   curr = next;           // Use saved value

❌ MISTAKE 2: Returning curr instead of prev
   return curr;  // curr is null at the end!

✅ CORRECT:
   return prev;  // prev is the new head

❌ MISTAKE 3: Forgetting to initialize prev to null
   let prev;  // undefined!

✅ CORRECT:
   let prev = null;  // The new tail points to null

❌ MISTAKE 4: Not handling empty list
   function reverseList(head) {
     let prev = null;
     let curr = head;  // If head is null, this works but let's be explicit

✅ BETTER:
   if (!head) return null;  // Handle edge case clearly
*/

// ═══════════════════════════════════════════════════════════════════════
// 🎓 INTERVIEW TALKING POINTS
// ═══════════════════════════════════════════════════════════════════════

/*
When explaining in interview:

1. "I'll use three pointers: prev, curr, and next"
2. "The key is to save the next node BEFORE reversing the pointer"
3. "We reverse each pointer one at a time as we traverse"
4. "Time complexity is O(n), space is O(1) - no extra data structures"
5. "I can also solve this recursively, but that uses O(n) space for the call stack"

Draw the diagram on the whiteboard - it helps tremendously!
*/
  