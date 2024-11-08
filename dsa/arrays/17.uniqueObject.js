// 10. Write logic to get unique objects from below array ?
// I/P: [{name: "sai"},{name:"Nang"},{name: "sai"},{name:"Nang"},{name: "111111"}];
// O/P: [{name: "sai"},{name:"Nang"}{name: "111111"}



function unique(arr){
    let resp=[]
    let names=new Set()
    for(const obj of arr){
        if(!names.has(obj.name)){
            names.add(obj.name)
            resp.push(obj)
        }
    }
    return resp
}

const arr=[{name: "sai"},{name:"Nang"},{name: "sai"},{name:"Nang"},{name: "111111"}];
console.log(unique(arr));
