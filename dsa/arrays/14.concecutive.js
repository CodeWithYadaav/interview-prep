// 5. Find the max count of consecutive 1’s in an array ?

function consecutive(arr){
    let maxCount =0;
    let currentCount=0;

    for(let i=0;i<arr.length;i++){

        if(arr[i]==1){
            currentCount++;
            maxCount = Math.max(maxCount,currentCount)

        }else {
            currentCount = 0
        }
    }
    return maxCount
    
}


const arr=[1,2,3,45,21,1,1,1]
console.log(consecutive(arr));
