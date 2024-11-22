
function twoSum(nums,target){
    const resp=new Map();
    for(let i =0;i<nums.length;i++){
      const compliment=target-nums[i];
        if(resp.has(compliment)){
            return [resp.get(compliment), i]
        }
        resp.set(nums[i],i)
    }
    return []
}



const nums = [3,4,5,6]
const target = 11

console.log(twoSum(nums,target));

