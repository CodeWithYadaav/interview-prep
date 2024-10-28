function duplicateArray(arr){
    let seen={}
    let dups=[]

    for(let i=0;i<arr.length;i++){
        if(seen[arr[i]]){
            if(!dups.includes(arr[i])){
                dups.push(arr[i])
            }
        }else{
            seen[arr[i]] = true
        }
    }
    return dups
}   






const arr = [10, 23, 45, 70, 11,11 ,15];
console.log(duplicateArray(arr));