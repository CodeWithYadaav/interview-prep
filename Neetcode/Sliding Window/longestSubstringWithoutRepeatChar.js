function lengthOfLongestSubstring(s) {
    const seen = new Set();
    let left = 0, maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }

        seen.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb"));    // 1
console.log(lengthOfLongestSubstring("pwwkew"));   // 3
console.log(lengthOfLongestSubstring(""));         // 0


//Alternate

// function lengthOfLongestSubstring(s) {
//     const map = new Map();
//     let maxLen = 0;
//     let left = 0;

//     for (let right = 0; right < s.length; right++) {
//         const char = s[right];
//         if (map.has(char) && map.get(char) >= left) {
//             left = map.get(char) + 1;
//         }
//         map.set(char, right);
//         maxLen = Math.max(maxLen, right - left + 1);
//     }

//     return maxLen;
// }
