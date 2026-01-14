// ════════════════════════════════════════════════════════════════════════════════════
// 🎯 3SUM PROBLEM - Two Pointers Pattern
// ════════════════════════════════════════════════════════════════════════════════════

// 📝 Problem: Find all unique triplets [a, b, c] where a + b + c = target
// Example: nums = [1, 0, -1, 2, -2, 3], target = 4
// Answer: [[1, 0, 3], [2, 0, 2]] - two triplets that sum to 4

// 🎨 Visual Example (after sorting):
// nums = [-2, -1, 0, 1, 2, 3]   target = 4
//         ↑   
//         i (fixed)
//             ↑           ↑
//           left        right
//
// Check: -2 + (-1) + 3 = 0  ❌ (too small, move left →)
// Check: -2 + 0 + 3 = 1     ❌ (too small, move left →)
// Check: -2 + 1 + 3 = 2     ❌ (too small, move left →)
// Check: -2 + 2 + 3 = 3     ❌ (too small, no more moves)
// Move i to next position...

// 🧠 KEY INSIGHTS:
// 1. Sort array first (enables two-pointer technique)
// 2. Fix one number (i), then find two numbers that sum to (target - nums[i])
// 3. This converts 3Sum into 2Sum problem!
// 4. Use two pointers (left, right) to find the pair
// 5. Skip duplicates to avoid repeated triplets

// 💡 STRATEGY:
// Step 1: Sort the array → [-2, -1, 0, 1, 2, 3]
// Step 2: Loop with i (fix first number)
// Step 3: Use two pointers (left, right) to find remaining two numbers
// Step 4: If sum == target → save result, move both pointers
//         If sum < target → move left pointer → (need bigger sum)
//         If sum > target → move right pointer ← (need smaller sum)
// Step 5: Skip duplicate values to avoid duplicate triplets

// ✅ Optimal Solution (Using Two Pointers) – O(n²) Time, O(n) Space
function threeSumTarget(nums, target) {
  // Step 1: Sort array (required for two-pointer technique)
  nums.sort((a, b) => a - b);  // [-2, -1, 0, 1, 2, 3]
  const result = [];

  // Step 2: Loop through array, fix first number (i)
  // Stop at length-2 because we need 2 more numbers after i
  for (let i = 0; i < nums.length - 2; i++) {
    
    // 🔑 IMPORTANT: Skip duplicate values for first number
    // If current num same as previous, skip it to avoid duplicate triplets
    // Example: [-2, -2, 0, 1] - skip second -2
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // Step 3: Set up two pointers
    let left = i + 1;              // Start right after i
    let right = nums.length - 1;   // Start at end

    // Step 4: Find two numbers that sum to (target - nums[i])
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === target) {
        // 🎉 Found a triplet! Save it
        result.push([nums[i], nums[left], nums[right]]);
        
        // Move both pointers inward to find other triplets
        left++;
        right--;

        // 🔑 CRITICAL: Skip duplicates for left and right pointers
        // Example: [-2, -1, -1, 0, 2, 2, 3]
        //                   ↑       ↑
        //                 skip    skip
        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
        
      } else if (sum < target) {
        // Sum too small, need bigger number
        // Move left pointer → (goes to bigger number since sorted)
        left++;
        
      } else {
        // sum > target
        // Sum too big, need smaller number
        // Move right pointer ← (goes to smaller number since sorted)
        right--;
      }
    }
  }

  return result;
}

// 💡 WHY DOES THIS WORK?
// 
// Sorted array + two pointers gives us control:
//   - Array sorted: [-2, -1, 0, 1, 2, 3]
//   - Sum too small? → Move left pointer right (increases sum)
//   - Sum too big? → Move right pointer left (decreases sum)
//   - We explore ALL possible combinations efficiently
//
// Time Complexity: O(n²)
//   - Outer loop: O(n)
//   - Inner while: O(n) for each iteration
//   - Total: O(n) × O(n) = O(n²)
//
// Space Complexity: O(n) for storing result
//   (or O(1) if we don't count output array)

// 🚫 WHY SKIP DUPLICATES?
// Without skipping: nums = [-1, -1, 0, 1]
//   We'd get: [-1, 0, 1] and [-1, 0, 1] (duplicate!)
// With skipping: We only get [-1, 0, 1] once ✅

// 🧪 Test Cases:
console.log(threeSumTarget([1, 0, -1, 2, -2, 3], 4));
// Expected: [[1, 0, 3]] - only one triplet sums to 4

console.log(threeSumTarget([-1, 0, 1, 2, -1, -4], 0));
// Expected: [[-1, -1, 2], [-1, 0, 1]] - classic 3Sum problem

console.log(threeSumTarget([0, 0, 0, 0], 0));
// Expected: [[0, 0, 0]] - duplicate zeros handled correctly


console.log(threeSumTarget([1, 0, -1, 2, -2, 3], 4));
