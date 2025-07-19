// Optimal Solution with Data Structure (Set) – O(n) Time, O(n) Space
function containsDups(arr) {
    let resp = new Set()
    for (let i = 0; i < arr.length; i++) {
        if (resp.has(arr[i])) {
            return true
        }
        resp.add(arr[i])
    }
    return false
}



const nums = [1, 2, 3, 4]
console.log(containsDups(nums));






//With map set 
// function containsDups(arr) {
//     let seen = {};

//     for (let i = 0; i < arr.length; i++) {
//         const val = arr[i];


//         if (seen[val] !== undefined) {
//             return true;
//         }

//         seen[val] = true;
//     }

//     return false;
// }

// const nums = [1, 2, , 3]; // has a hole at index 2
// console.log(containsDups(nums)); // false






// function containsDuplicate(nums) {
//     nums.sort((a, b) => a - b); // O(n log n)
//     for (let i = 1; i < nums.length; i++) {
//       if (nums[i] === nums[i - 1]) return true;
//     }
//     return false;
//   }

// const nums = [1, 2, 4, 3]
// console.log(containsDups(nums));
