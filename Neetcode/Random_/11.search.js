// //Linear search
// function linearSearch(arr,target){
//     for (let i = 0; i < arr.length; i++) {
//         if(arr[i]===target){
//             return i
//         }        
//     }
//     return -1
// }


// const arr = [10, 23, 45, 70, 11, 15];
// console.log(linearSearch(arr, 70)); 
// console.log(linearSearch(arr, 99));


//Binary search

function binarySearch(arr, target) {
    let left=0;
    let right = arr.length-1
    
    while(left<=right){
        let mid = Math.floor((left+right)/2)
        if(arr[mid]==target){
            return mid
        }else if(arr[mid]<target){
            left =mid+1
        }else if(arr[mid]>target){
            right = mid-1
        }
    }
    return -1

    
}

const sortedArr = [10, 23, 45, 70, 100, 150];
console.log(binarySearch(sortedArr, 70)); 
console.log(binarySearch(sortedArr, 99));

