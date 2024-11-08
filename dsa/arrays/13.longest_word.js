// 1. Program to find longest word in a given sentence ?

function longestWord(str){
    const words=str.split(' ')
    let longest='';
    for(const word of words){
        // console.log(word);
        if(word.length>longest.length){
            longest=word;
        }
        
    }
    const length= longest.length
    return {longest,length}
    
}


const sentence="The quick brown fox jumped over the lazy dog"
console.log(longestWord(sentence));
