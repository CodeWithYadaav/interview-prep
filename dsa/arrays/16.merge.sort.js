// 7. Given 2 arrays that are sorted [0,3,4,31] and [4,6,30]. Merge them and sort [0,3,4,4,6,30,31] ?


function mergeSort(arr1,arr2){
    let resp=[];
    let i=0;
    let j=0;

    while(i<arr1.length && j<arr2.length){
        if(arr1[i]<arr2[j]){
            resp.push(arr1[i])
            i++
        }else{
            resp.push(arr2[j])
            j++
        }
    }

    while(i< arr1[i]){
        resp.push(arr1[i])
        i++;
    }

    while(j<arr2[j]){
        resp.push(arr2[j])
        j++;
    }
    return resp;
}


const arr1=[0,3,4,31];
const arr2=[4,6,30];
console.log(mergeSort(arr1,arr2));
