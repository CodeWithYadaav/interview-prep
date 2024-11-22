function containsDups(arr){
    let resp=new Set()
    for(let i=0;i< arr.length;i++){
        if(resp.has(arr[i])){
            return true
        }
        resp.add(arr[i])
    }
    return false
}







const nums = [1, 2, , 3]
console.log(containsDups(nums));
