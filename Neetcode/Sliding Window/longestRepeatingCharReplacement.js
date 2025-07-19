// Input: s = "ABAB", k = 2
// Output: 4 // Replace two Bs or As to make "AAAA" or "BBBB"

// Input: s = "AABABBA", k = 1
// Output: 4 // "ABAB" or "BABA"


function characterReplacement(s, k) {
    const count = new Array(26).fill(0);
    let left = 0, maxCount = 0, maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        const index = s.charCodeAt(right) - 65;
        count[index]++;
        maxCount = Math.max(maxCount, count[index]);

        while ((right - left + 1) - maxCount > k) {
            count[s.charCodeAt(left) - 65]--;
            left++;
        }

        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}


console.log(characterReplacement("ABAB", 2));     // 4
console.log(characterReplacement("AABABBA", 1));  // 4
console.log(characterReplacement("ABCDE", 1));    // 2
