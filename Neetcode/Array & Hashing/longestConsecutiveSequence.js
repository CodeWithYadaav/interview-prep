// Optimal Solution (With Set) — O(n) Time, O(n) Space

function longestConsecutive(nums) {
    const set = new Set(nums);
    let maxLen = 0;

    for (const num of set) {
        if (!set.has(num - 1)) { // only start counting if num is sequence start
            let currentNum = num;
            let count = 1;

            while (set.has(currentNum + 1)) {
                currentNum++;
                count++;
            }

            maxLen = Math.max(maxLen, count);
        }
    }

    return maxLen;
}

const nums = [100, 4, 200, 1, 3, 2]
console.log(longestConsecutive(nums))

// Output =>4 // The sequence is [1, 2, 3, 4]






// Without DSA
//   function longestConsecutive(nums) {
//     if (nums.length === 0) return 0;

//     nums.sort((a, b) => a - b);
//     let maxLen = 1;
//     let currentLen = 1;

//     for (let i = 1; i < nums.length; i++) {
//       if (nums[i] === nums[i - 1]) continue; // skip duplicates
//       if (nums[i] === nums[i - 1] + 1) {
//         currentLen++;
//       } else {
//         currentLen = 1;
//       }
//       maxLen = Math.max(maxLen, currentLen);
//     }

//     return maxLen;
//   }


