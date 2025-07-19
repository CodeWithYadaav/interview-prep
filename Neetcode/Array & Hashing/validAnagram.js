
function isValidAnagram(s,t){

    const charCount={}
    for(let char of s){
        charCount[char] = (charCount[char] || 0) + 1
    }

    for(let char of t){
        if(!charCount[char]){
            return false
        }
        charCount[char]--
    }
    return true
}


const s= "racecar";
const t = "carrace"

console.log(isValidAnagram(s,t));

