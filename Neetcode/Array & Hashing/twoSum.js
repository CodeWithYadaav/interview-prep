function twoSum(nums, target) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];    
        }
        map.set(nums[i], i);
    }

    return []; // no solution
}



                
const arr = [1, 2, 4, 3]
console.log(twoSum(arr, 5));




// Without map

// function twoSum(arr, t) {
//     let seen = {};
  
//     for (let i = 0; i < arr.length; i++) {
//       const sum = t - arr[i];
  
//       if (seen[sum] !== undefined) {
//         return [seen[sum], i];
//       }
  
//       // Store the current number and its index
//       seen[arr[i]] = i;
//     }
//   }
  
//   const arr = [1, 2, 4, 3];
//   console.log(twoSum(arr, 5)); // Output: [1, 2]
  


//Brute force   
// function twoSum(nums, target) {
//     for (let i = 0; i < nums.length; i++) {
//       for (let j = i + 1; j < nums.length; j++) {
//         if (nums[i] + nums[j] === target) {
//           return [i, j];
//         }
//       }
//     }
//     return [];
//   }
