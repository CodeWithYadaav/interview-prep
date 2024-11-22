function productOfArrayExceptSelf(nums){
    const n = nums.length;
    const output = Array(n).fill(1)
    console.log(output);

    let prefix=1
    for(let i = 0; i<nums.length;i++){
        prefix= nums[i]
        prefix*= output
    }

    let suffix=1
    for(let i = n-1; i>=0;i--){
        output[i]*= suffix
        suffix*= nums[i]
    }
    return output
    
}




const nums = [1,2,4,6]
console.log(productOfArrayExceptSelf(nums));
