// Optimal Two-Pointer Solution – O(n) Time, O(1) Space
function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let max = 0;

    while (left < right) {
        const h = Math.min(height[left], height[right]);
        const w = right - left;
        max = Math.max(max, h * w);

        // Move the shorter line inward
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return max;
}



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
