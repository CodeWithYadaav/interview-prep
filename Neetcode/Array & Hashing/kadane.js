function maxSubArray(nums) {
    if (nums.length === 0) return 0;

    let maxSum = nums[0];
    let currentSum = nums[0];

    let start = 0;
    let end = 0;
    let tempStart = 0;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > currentSum + nums[i]) {
            currentSum = nums[i];
            tempStart = i; // start a new subarray
        } else {
            currentSum += nums[i]; // extend current subarray
        }

        if (currentSum > maxSum) {
            maxSum = currentSum;
            start = tempStart;
            end = i;
        }
    }

    console.log("Maximum Subarray Sum:", maxSum);
    console.log("Subarray:", nums.slice(start, end + 1));

    return maxSum;
}

const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
maxSubArray(arr);


// Maximum Subarray Sum: 6
// Subarray: [ 4, -1, 2, 1 ]
