function maxOccurrence(str) {
    const count = {};
    let maxChar = '';
    let maxCount = 0;

    for (const char of str) {
        count[char] = (count[char] || 0) + 1;

        if (count[char] > maxCount) {
            maxCount = count[char];
            maxChar = char;
        }
    }

    return { maxChar, maxCount };
}


const str = 'praveen'
console.log(maxOccurrence(str));
