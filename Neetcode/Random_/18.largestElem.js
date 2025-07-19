// 14. Write a JavaScript program to find the largest element in a nested array.



function findLargestInNestedArray(arr){
    const elems= arr.toString().split(',')
    console.log(elems);
    // let max= -Infinity
    // for(const ele of elems){
    //     const num = +ele
    //     if(num>max){
    //         max= num
    //     }
    // }
    // return max
}



const nestedArray = [1, [3, 5], [7, [10, 2]], 4, [6, [8, 9]]];
console.log(findLargestInNestedArray(nestedArray)); 