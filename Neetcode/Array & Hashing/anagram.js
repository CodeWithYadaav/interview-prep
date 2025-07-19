function isValidAnagram(s, t) {

    const charCount = {}
    for (let char of s) {
        charCount[char] = (charCount[char] || 0) + 1
    }

    for (let char of t) {
        if (!charCount[char]) { // char missing or used up
            return false
        }
        charCount[char]--  // use one count of the char
    }
    return true
}

        
const s = "racecar";
const t = "carrace"

console.log(isValidAnagram(s, t));



