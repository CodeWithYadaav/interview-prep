

// function twoSum(arr,target){
//     for(let i=0;i<arr.length;i++){
//         for(let j=1;j<arr.length;j++){
//             if(arr[i]+arr[j]==target){
//                 return [i,j]
//             }
//         }
//     }
// }



function twoSum(arr,target){
    let temp = new Map()
   
    for(let i=0;i<arr.length;i++){
        let compliment = target-arr[i]
         console.log(compliment);
         if(temp.has(compliment)){
            return [temp.get(compliment),i]
         }
         
         temp.set(arr[i],i)
    }
    return null
    
}



const arr=[1,2,4,3]
console.log(twoSum(arr,5));
