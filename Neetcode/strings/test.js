function maxOccurrence(str) {
    let maxCount = 0
    let maxChar = ''
    let charCount = {}
    for (let char of str) {
        charCount[char] = (charCount[char] || 0) + 1
        if (charCount[char] > maxCount) {
            maxCount = charCount[char]
            maxChar = char
        }
    }
    return { maxChar, maxCount }

}






const str = 'praveen'
console.log(maxOccurrence(str));
