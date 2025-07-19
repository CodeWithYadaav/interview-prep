// Write a function that reverses an array in place.
const a = [90,56,16,61,29,83,37,38,4,0]
function reverseArray(a){
    const reverseArr=[];
    for(let i=a.length-1;i>=0;i--){
        reverseArr.push(a[i])
    }
    return reverseArr
}

console.log(`reversedArray:::`,reverseArray(a));
