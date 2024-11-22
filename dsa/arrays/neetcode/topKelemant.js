
function topKElement(nums,k){
    const resp= nums.sort((a,b)=>b-a);
    const result=resp[k-1]
    return result
    
}



const nums = [1,2,2,3,3,3]
const k = 1

console.log(topKElement(nums,k));