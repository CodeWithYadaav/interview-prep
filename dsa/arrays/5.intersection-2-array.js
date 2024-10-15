// Write a function that finds the intersection of two arrays.

function findIntersection(arr1, arr2) {
    const intersection=[]
        for(let i =0;i<arr1.length;i++){
            for(let j=0;j<arr2.length;j++){ 
                if(arr1[i]==arr2[j]){
                    intersection.push(arr1[i])
                }
            }
        }
        return intersection
    }
    // function findIntersection(arr1, arr2) {
    //     const set1 = new Set(arr1)
    //     const intersection = arr2.filter(item=>set1.has(item))
    //     return intersection
    
    //     }

const array1 = [1, 2, 3, 4, 5];
const array2 = [4, 5, 6, 7, 8];
console.log(findIntersection(array1, array2));
