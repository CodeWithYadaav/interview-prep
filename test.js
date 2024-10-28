// let abc = [4,3,2,1]

// for(let i =0 ; i<abc.length; i++){
//     for(j= i+1 ; j<abc.length; j++){
//         if(abc[i] > abc[j]){
//             let arr = abc[i];
//             abc[i] = abc[j];
//             abc[j] = arr;
//         }
//     }
 
// }

// console.log({abc})



// let test = abc.split("")
// const map = new Map()
// for(let str of test){
    //   if(map.has(str)){
        //     map.set(str, map.get(str) + 1)
        //   }else{
            //   map.set(str , 1)
            //   }
            // }
            
            
            // let mostO=0
            // let strng = ""
            // for(let str of test){
                //    if(map.get(str) > mostO ){
                    //     mostO = map.get(str) 
                    //     strng = str
                    //    }
                    // }
                    
                    
                    // console.log({mostO, strng})
                    // function test(abc){
                    //     let charCount={}
                    //     for(let char of abc){
                    //         if(charCount[char]){
                    //             charCount[char]++
                    //         }else{
                    //             charCount[char]=1
                    //         }
                    //     }
                    //     return charCount
                    // }
                    // let abc  = "helloworld"

                    // console.log(test(abc));

// const a = [1,2,5,7,9,5]
// // const a = [3,4,6,7,8,4,2,1]
// const target = 7 

// let b = [...a]
// const sort = b.sort((a,b) => a-b)

// for(let i = 0; i <a.length ; i++){
//     let j = a.length - 1
//     while(j > i){
//         if(sort[i] + sort[j] > target){
//             j--
//         }else if(sort[i] + sort[j] === target){
//         console.log({[sort[i]]: a.indexOf(sort[i]), [sort[j]]: a.indexOf(sort[j])})
//         return
//         }else{
//          break
//         }
    
//     }
// }

// const a = [1,5,3,6,7]
// const b =[4,3,5,2,4,2]


// for(let str of b){
//     if(a.indexOf(str) === -1){
//         a.push(str)
//     }
// }


// console.log(a)


// setTimeout(() => {
//    console.log("haello") 
// }, 1000, 'asdm');

const obj = {
    a :10
}

Object.freeze(obj)
obj.a = 20
console.log(obj.age)