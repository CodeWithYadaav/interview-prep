
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
    return charCount
}


const str= 'praveen'
console.log(maxOccurence(str));
