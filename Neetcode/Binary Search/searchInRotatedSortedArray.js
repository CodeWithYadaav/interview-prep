function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) return mid;

        // Left half is sorted
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1; // target in left half
            } else {
                left = mid + 1; // target in right half
            }
        }
        // Right half is sorted
        else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1; // target in right half
            } else {
                right = mid - 1; // target in left half
            }
        }
    }

    return -1;
}

console.log(search([4, 5, 6, 7, 0, 1, 2], 0)); // 4
console.log(search([4, 5, 6, 7, 0, 1, 2], 3)); // -1



//if duplicates are allowed

// function search(nums, target) {
//     let left = 0;
//     let right = nums.length - 1;

//     while (left <= right) {
//         const mid = Math.floor((left + right) / 2);

//         if (nums[mid] === target) return true;

//         // Handle duplicates: shrink window
//         if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
//             left++;
//             right--;
//         }
//         // Left half is sorted
//         else if (nums[left] <= nums[mid]) {
//             if (nums[left] <= target && target < nums[mid]) {
//                 right = mid - 1;
//             } else {
//                 left = mid + 1;
//             }
//         }
//         // Right half is sorted
//         else {
//             if (nums[mid] < target && target <= nums[right]) {
//                 left = mid + 1;
//             } else {
//                 right = mid - 1;
//             }
//         }
//     }

//     return false;
// }


// console.log(search([2, 5, 6, 0, 0, 1, 2], 0)); // true
// console.log(search([2, 5, 6, 0, 0, 1, 2], 3)); // false
// console.log(search([1, 0, 1, 1, 1], 0));     // true
