// Optimal Binary Search – O(log n) Time, O(1) Space
function findMin(nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] > nums[right]) {
            // Minimum is in the right half
            left = mid + 1;
        } else {
            // Minimum is in the left half (or at mid)
            right = mid;
        }
    }

    return nums[left];
}

console.log(findMin([4, 5, 6, 7, 0, 1, 2])); // 0
console.log(findMin([3, 4, 5, 1, 2]));       // 1
console.log(findMin([1, 2, 3, 4, 5]));       // 1 (already sorted)
