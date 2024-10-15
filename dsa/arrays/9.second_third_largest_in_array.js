
function findLargest(arr,target){
    const res= arr.sort((a,b)=>{return b-a})

    console.log(res);
    
    const resp=res[target-1]
    console.log(resp,"000");
    
}



const nums = [5, 3, 8, 4, 2];
const target=1
console.log(findLargest(nums,target));
