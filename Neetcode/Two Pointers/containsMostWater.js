// ════════════════════════════════════════════════════════════════════════════════════
//  CONTAINER WITH MOST WATER - Two Pointers Pattern
// ════════════════════════════════════════════════════════════════════════════════════

// 📝 Problem: Given array of heights, find max water container can hold
// Think of it like: You have vertical lines, pick 2 lines that can hold most water

// 🎨 Visual Example:
//        height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
//                  0  1  2  3  4  5  6  7  8  (indices)
//
//           |                   |
//           |                   |       |
//           |   |               |       |
//           |   |       |       |       |
//           |   |       |   |   |   |   |
//           |   |       |   |   |   |   |
//           |   |   |   |   |   |   |   |
//       |   |   |   |   |   |   |   |   |
//       1   8   6   2   5   4   8   3   7
//       ^                           ^
//      left                       right
//
// Water between them = min(height[left], height[right]) × distance
//                    = min(1, 7) × (8 - 0)
//                    = 1 × 8 = 8 units

// 🧠 KEY INSIGHT:
// Water height is limited by the SHORTER line (water spills over)
// Area = height × width
//      = min(left_height, right_height) × (right_index - left_index)

// 🎯 STRATEGY:
// 1. Start with widest container (left=0, right=end)
// 2. Calculate current area
// 3. Move the SHORTER pointer inward (why? see explanation below)
// 4. Keep track of max area seen

// ✅ Optimal Two-Pointer Solution – O(n) Time, O(1) Space
function maxArea(height) {
    let left = 0;                    // Start pointer at beginning
    let right = height.length - 1;   // End pointer at end
    let max = 0;                     // Track maximum area found

    // Keep moving pointers until they meet
    while (left < right) {
        // Calculate current container dimensions
        const h = Math.min(height[left], height[right]);  // Height = shorter line
        const w = right - left;                           // Width = distance between pointers
        const currentArea = h * w;                        // Area = height × width
        
        max = Math.max(max, currentArea);  // Update max if current is bigger

        // 🔑 KEY DECISION: Move the SHORTER pointer inward
        // Why? Because keeping the shorter one won't increase area
        // - Width will decrease as we move inward (guaranteed)
        // - Height is capped by the shorter line
        // - Only by moving shorter pointer do we have CHANCE to find taller line
        if (height[left] < height[right]) {
            left++;   // Left is shorter, move it hoping to find taller line
        } else {
            right--;  // Right is shorter (or equal), move it
        }
    }

    return max;
}

// 💡 WHY MOVE THE SHORTER POINTER?
// Example: left=1, right=7, heights are 3 and 5
//   Current area = min(3,5) × distance = 3 × distance
//   
//   If we move the TALLER pointer (5):
//     - Width decreases ❌
//     - Height still capped at 3 (shorter one remains)
//     - Area WILL decrease (smaller width, same height)
//   
//   If we move the SHORTER pointer (3):
//     - Width decreases ❌
//     - BUT we might find height > 3 ✅
//     - Gives us CHANCE to increase area

// 🧪 Test Cases:
console.log(maxArea([1,8,6,2,5,4,8,3,7]));  // Expected: 49 (heights 8 and 7, distance 7)
console.log(maxArea([1,1]));                 // Expected: 1
console.log(maxArea([4,3,2,1,4]));          // Expected: 16 (heights 4 and 4, distance 4)



//Brute Force
// function maxArea(height) {
//     let max = 0;
//     for (let i = 0; i < height.length; i++) {
//       for (let j = i + 1; j < height.length; j++) {
//         const h = Math.min(height[i], height[j]);
//         const w = j - i;
//         max = Math.max(max, h * w);
//       }
//     }
//     return max;
//   }
