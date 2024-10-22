
function maxOccurence(str){
    let charCount={}
    for(let char of str){
        console.log(charCount[char]);
        if(charCount[char]){
            
            charCount[char]++
        }else{
            charCount[char]=1
        }
    }
    // return charCount

    let maxChar = '';
    let maxCount = 0;

    for (let char in charCount) {
        if (charCount[char] > maxCount) {
            maxCount = charCount[char];
            maxChar = char;
        }
    }

    return { maxChar, maxCount };
}


const str= 'praveen'
console.log(maxOccurence(str));
