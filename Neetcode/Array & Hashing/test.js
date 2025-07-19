
function longestConsecutive(nums) {
    const set = new Set(nums);
    let maxLen = 0;
    for (let num of nums) {
        if (!set.has(num - 1)) {
            let currentNum = num
            let count = 1
            while (set.has(currentNum + 1)) {
                currentNum++
                count++
            }
            maxLen = Math.max(maxLen, count)
        }
    }
    return maxLen
}



const nums = [100, 4, 200, 1, 3, 2]
console.log(longestConsecutive(nums))