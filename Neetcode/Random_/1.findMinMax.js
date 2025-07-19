// Write a function to find the maximum and minimum elements in an array.
const a =[3,4,5,6,7,89,9]

function findMin(a){
    // return Math.min(...a)
    let min=a[0]
    for(let i=0;i<a.length;i++){
        if(a[i]<min){
            min = a[i]
        }
    }
    return min
}

console.log(`find min of :::`,findMin(a));


function findMax(a){
    let max=a[0]
    for(let i =0;i<a.length;i++){
        if(a[i]>max){
            max=a[i]
        }
    }
    return max;
}

console.log(`finding max of::`,findMax(a));