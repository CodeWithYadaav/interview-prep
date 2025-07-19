// const users = [
//     { name: "Alice", country: "India" },
//     { name: "Bob", country: "USA" },
//     { name: "Charlie", country: "India" },
//   ];

//   // Expected output: 2
//  --------------------------------------------------- 




// const products = [
//     { name: "iPhone", category: "Electronics" },
//     { name: "Shirt", category: "Clothing" },
//     { name: "Macbook", category: "Electronics" },
//     { name: "Jeans", category: "Clothing" },
//   ];

/*
Expected output:
{
  Electronics: ["iPhone", "Macbook"],
  Clothing: ["Shirt", "Jeans"]
}
*/

//   ---------------------------------------------------------



// const data = {
//     user: {
//       profile: {
//         contact: {
//           email: "test@example.com"
//         }
//       }
//     }
//   };

//   const key1 = "user";
//   const key2 = "profile";
//   const key3 = "contact";
//   const key4 = "email";

//   console.log(data[key1][key2][key3][key4]); // "test@example.com"

// -----------------------------------------------------------------------




// const obj = {
//     name: "John",
//     location: {
//       city: "Mumbai",
//       pin: 400001
//     },
//     preferences: {
//       theme: {
//         darkMode: true
//       }
//     }
//   };

// findDeepKey(obj, "darkMode") => true
// findDeepKey(obj, "pin") => 400001
// findDeepKey(obj, "xyz") => undefined


//   -------------------------------------------------------------------



// const input = {
//     a: 1,
//     b: {
//       c: 2,
//       d: {
//         e: 3
//       }
//     }
//   };

// Expected: 5 unique keys => "a", "b", "c", "d", "e"




// console.log("1");

// setTimeout(() => {
//   console.log("2");
// }, 1000);

// process.nextTick(() => {
//   console.log("3");
// });

// Promise.resolve().then(() => {
//   console.log("4");
//   setTimeout(() => {
//     console.log("10");
//   }, 2000);
// });

// setTimeout(() => {
//   console.log("5");
// }, 0);

// setImmediate(() => {
//   console.log("6");
// });

// console.log("7");


// 1 4 7 3 5 6 2 10



// console.log("start");

// setTimeout(() => {
//   console.log("a");
// }, 0)

// Promise.resolve().then(() => {
//   console.log("promise");
//   setTimeout(() => {
//     console.log("b");
//   }, 0);
// });


// console.log("end");

// stat promise end b a


//
// Array.prototype.myMap=function (cb){
//     let temp=[];
//     for(let i=0;i<this.length;i++){
//         temp.push(cb(this[i],i,this))
//     }
//     return temp;
// }



// Array.prototype.filterPraveen = function (cb) {
//   let temp = []
//   for (let i = 0; i < this.length; i++) {
//     if (cb(this[i], i, this)) {
//       temp.push(this[i])
//     }
//   }
//   return temp
// }

function flattenObject(obj, parentKey = "", result = {}) {
  for (let key in obj) {
    const newKey = parentKey ? `${parentKey}.${key}` : key; // Construct the new key
    if (typeof obj[key] === "object" && obj[key] !== null) {
      flattenObject(obj[key], newKey, result); // Recursively process nested objects
    } else {
      result[newKey] = obj[key]; // Add the key-value pair to the result
    }
  }
  return result;
}
