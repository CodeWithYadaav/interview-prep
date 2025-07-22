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

// const obj = {
//     a :10
// }

// Object.freeze(obj)
// obj.a = 20
// console.log(obj.age)

// const a = [1, 2, [3, 4, [5, 6, [7, 8]]]];
// console.log(flatFunction(a));

// function flatFunction(arr) {
//   let stack = [...arr];
//   let result = [];

//   while (stack.length) {
//     const next = stack.pop();
//     console.log({ next });
//     if (Array.isArray(next)) {
//       stack.push(...next); // Spread elements back to stack
//       console.log({ stack });
//     } else {
//       result.push(next);
//       console.log({ result });
//     }
//   }
//   return result.reverse();
// }

// Object.freeze(obj)
// obj.a = 20
// console.log(obj.age)

// {
//   var names = "ko";
// }
// names = "kool";

// console.log(names);



//two sum

// const sum = [1, 2, 4, 5, 9, 8]
// const target = 6


// function twoSum(sum, target) {
//     const seen = {}

//     for (let i = 0; i < sum.length - 1; i++) {
//         const num = sum[i]
//         const compliment = target - num
//         if (seen[compliment] !== undefined) {
//             return [seen[compliment], i]
//         }
//         seen[num] = i
//     }
//     return 'no valid'

// }

// console.log(twoSum(sum, target))




// function flattenObject(obj, parentKey = '', res = {}) {
//     for (let key in obj) {
//         let value = obj[key]
//         const fullKey = parentKey ? `${parentKey}.${key}` : key
//         if (typeof value == 'object ' && value !== null && !Array.isArray(value)) {
//             flattenObject(value, fullKey, res)
//         } else {
//             res[fullKey] = value
//         }
//     }
//     return res

// }





// const input = {
//     a: { b: { c: 1 } },
//     d: 2,
//     e: {
//         f: 3,
//         g: {
//             h: 4
//         }
//     }
// };

// console.log(flattenObject(input));


// console.log(typeof null);

// console.log([] + {});
// console.log({} + []);

// console.log(NaN === NaN);

// console.log(true + true);

// console.log(0.1 + 0.2 === 0.3);

// console.log(!![] + !![]);

// console.log([] == ![]);

// console.log(typeof NaN);


// console.log(typeof ("5" - - "2"))