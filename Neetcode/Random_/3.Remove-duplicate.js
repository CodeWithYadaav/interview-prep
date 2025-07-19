// Write a function that removes duplicates from a sorted array and returns the new length.

function removeDuplicate(a){
    const removeDups= new Set(a) 
    return Array.from(removeDups)
}

const a =[5,2,6,3,4,5,6]
const sortedArray = a.sort((a,b)=>{return a-b})
console.log(sortedArray);
console.log(removeDuplicate(sortedArray));
