// ════════════════════════════════════════════════════════════════════════════════════
// 🔄 LINKED LIST CYCLE DETECTION - Floyd's Cycle (Tortoise & Hare)
// ════════════════════════════════════════════════════════════════════════════════════

// 📝 Problem: Detect if a linked list has a cycle (a node points back to a previous node)
// Return true if cycle exists, false otherwise

// 🎨 Visual Example 1 - HAS CYCLE:
//
//      1 → 2 → 3 → 4
//          ↑       ↓
//          6 ← 5 ←─┘
//
// Node 4 points back to Node 2, creating a cycle!
// If you keep following next, you'll loop forever: 1→2→3→4→5→6→2→3→4→5→6→2...

// 🎨 Visual Example 2 - NO CYCLE:
//
//      1 → 2 → 3 → 4 → null
//
// Last node points to null, no cycle

// 🧠 KEY INSIGHT: The "Tortoise and Hare" Algorithm
//
// Imagine two runners on a circular track:
//   🐢 Slow runner (tortoise) - moves 1 step at a time
//   🐰 Fast runner (hare) - moves 2 steps at a time
//
// If track is circular (has cycle):
//   - Fast runner will eventually catch up to slow runner
//   - They WILL meet inside the cycle
//
// If track is straight (no cycle):
//   - Fast runner reaches the end (null)
//   - They never meet

// 💡 STRATEGY:
// 1. Start both pointers at head
// 2. Move slow pointer 1 step, fast pointer 2 steps
// 3. If they meet → cycle exists!
// 4. If fast reaches null → no cycle

// ✅ Optimal Solution - O(n) Time, O(1) Space
function hasCycle(head) {
    // Edge case: empty list or single node
    if (!head || !head.next) return false;

    // Initialize two pointers
    let slow = head;       // 🐢 Tortoise - moves 1 step
    let fast = head;       // 🐰 Hare - moves 2 steps

    // Keep moving until fast reaches end or they meet
    while (fast && fast.next) {
        // Move pointers
        slow = slow.next;        // Move 1 step
        fast = fast.next.next;   // Move 2 steps

        // Check if they meet
        if (slow === fast) {
            return true;  // 🎉 Cycle detected!
        }
    }

    // Fast reached null, no cycle
    return false;
}

// 🎬 STEP-BY-STEP VISUALIZATION (with cycle):
//
// List: 1 → 2 → 3 → 4 → 2 (cycle back to 2)
//
// Step 0: slow=1, fast=1
//         🐢🐰
//         1 → 2 → 3 → 4 ↺
//
// Step 1: slow=2, fast=3
//             🐢   🐰
//         1 → 2 → 3 → 4 ↺
//
// Step 2: slow=3, fast=2 (fast looped back)
//                 🐢
//         1 → 2 → 3 → 4 ↺
//             🐰
//
// Step 3: slow=4, fast=4 (THEY MEET! 🎉)
//                     🐢🐰
//         1 → 2 → 3 → 4 ↺
// Return true - cycle detected!

// 🎬 STEP-BY-STEP VISUALIZATION (without cycle):
//
// List: 1 → 2 → 3 → 4 → null
//
// Step 0: slow=1, fast=1
//         🐢🐰
//         1 → 2 → 3 → 4 → null
//
// Step 1: slow=2, fast=3
//             🐢   🐰
//         1 → 2 → 3 → 4 → null
//
// Step 2: slow=3, fast=null (fast reached end)
//                 🐢       🐰
//         1 → 2 → 3 → 4 → null
// Return false - no cycle

// 💡 WHY DOES THIS WORK?
//
// Mathematical proof:
//   - If there's a cycle, fast pointer enters it first
//   - Once both are in the cycle, fast catches up to slow
//   - Fast gains 1 step per iteration (moves 2, slow moves 1)
//   - Eventually they MUST meet (it's impossible to "jump over" in a cycle)
//
// Think of it like:
//   - Fast runner is lapping a circular track
//   - Slow runner is also on the track
//   - Fast runner gains 1 position per round
//   - They will eventually be at same position

// ⚡ COMPLEXITY:
// Time: O(n) 
//   - Without cycle: fast reaches end in n/2 steps
//   - With cycle: they meet within n steps
// Space: O(1) - only two pointers, no extra data structures

// 🎯 EASY MEMORIZATION TRICK:
// "Two runners on a track:
//  🐢 moves 1 step, 🐰 moves 2 steps
//  If circular track (cycle) → they meet
//  If straight track (no cycle) → fast reaches end"

// ═══════════════════════════════════════════════════════════════════════
// 🧪 TESTING CODE
// ═══════════════════════════════════════════════════════════════════════

// Helper: Create a linked list node
class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

// Test Case 1: List with cycle
console.log("Test 1: List with cycle");
let node1 = new ListNode(1);
let node2 = new ListNode(2);
let node3 = new ListNode(3);
let node4 = new ListNode(4);
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node2; // Creates cycle: 4 → 2
console.log(hasCycle(node1)); // Expected: true ✅

// Test Case 2: List without cycle
console.log("\nTest 2: List without cycle");
let a = new ListNode(1);
let b = new ListNode(2);
let c = new ListNode(3);
a.next = b;
b.next = c;
c.next = null; // No cycle
console.log(hasCycle(a)); // Expected: false ✅

// Test Case 3: Single node, no cycle
console.log("\nTest 3: Single node");
let single = new ListNode(1);
console.log(hasCycle(single)); // Expected: false ✅

// Test Case 4: Empty list
console.log("\nTest 4: Empty list");
console.log(hasCycle(null)); // Expected: false ✅

// ═══════════════════════════════════════════════════════════════════════
// 🔥 ALTERNATIVE SOLUTION (Using Set) - Easier to understand but more space
// ═══════════════════════════════════════════════════════════════════════

function hasCycleWithSet(head) {
    const visited = new Set();
    let current = head;

    while (current) {
        // If we've seen this node before → cycle!
        if (visited.has(current)) {
            return true;
        }
        
        // Mark this node as visited
        visited.add(current);
        current = current.next;
    }

    // Reached end without seeing duplicate → no cycle
    return false;
}

// ⚡ Comparison:
// Floyd's (Two Pointers):  O(n) time, O(1) space ✅ Better!
// Set approach:            O(n) time, O(n) space   (uses extra memory)

// 💡 Interview Tip:
// Start with Set approach (easier to explain), then optimize to Two Pointers
// Say: "I can optimize space to O(1) using Floyd's Cycle Detection algorithm"

// ═══════════════════════════════════════════════════════════════════════
// 📚 RELATED PROBLEMS & VARIATIONS
// ═══════════════════════════════════════════════════════════════════════

// 1. Find the START of the cycle (where cycle begins)
//    → Use Floyd's algorithm, then mathematical trick to find start
//
// 2. Find the LENGTH of the cycle
//    → Once pointers meet, keep one fixed, move other until they meet again
//
// 3. Remove the cycle
//    → Find start of cycle, set the last node's next to null

