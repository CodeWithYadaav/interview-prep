// hoising
// console.log(a);  // ?
// var a = 10;


// Temporal dead zone
// console.log(a);  // ?
// var a = 10;


// function declaration vs function expression
// foo();  // ?
// function foo() {
//   console.log("Hello!");
// }

// bar();  // ?
// var bar = function() {
//   console.log("Hi!");
// };


// closure
// for (var i = 0; i < 3; i++) {
//     setTimeout(function() {
//       console.log(i);  // ?
//     }, 1000);
//   }

//   block scope

// for (let i = 0; i < 3; i++) {
//     setTimeout(function() {
//       console.log(i);  // ?
//     }, 1000);
//   }

  
//   this in arrow function
// const obj = {
//     name: "John",
//     greet: function() {
//       setTimeout(function() {
//         console.log(this.name);  // ?
//       }, 1000);
//     }
//   };
  
//   obj.greet();

  


//   arrow function with this binding
// const obj = {
//     name: "John",
//     greet: function() {
//       setTimeout(() => {
//         console.log(this.name);  // ?
//       }, 1000);
//     }
//   };
  
//   obj.greet();

  
//   async await

// async function test() {
//     return 1;
//   }
  
//   test().then(console.log);  // ?

  
// promise chaining
// console.log('start');
// Promise.resolve(1)
//   .then(res => {
//     console.log(res);
//     return 2;
//   })
//   .then(res => {
//     console.log(res);
//   });
// console.log('end');


//event loop
// console.log('First');
// setTimeout(() => console.log('Second'), 0);
// Promise.resolve().then(() => console.log('Third'));
// console.log('Fourth');



// Immediate Execution with Promises
// const p = Promise.resolve();
// p.then(() => console.log('first'));
// p.then(() => console.log('second'));



// Object Property Access (Prototype Chain)
// const obj = { a: 1 };
// const proto = { b: 2 };

// Object.setPrototypeOf(obj, proto);

// console.log(obj.b);  // ?



// Strict Mode and this in Functions
// 'use strict';
// function logThis() {
//   console.log(this);
// }

// logThis();  // ?


// Equality Comparisons (== vs ===)
// console.log(0 == false);   // ?
// console.log(0 === false);  // ?


//Object Mutation
// const a = { x: 1 };
// const b = a;

// b.x = 2;

// console.log(a.x);  // ?


//16. Array Methods and Mutation
// const arr = [1, 2, 3];
// const newArr = arr.map(num => num * 2);

// console.log(arr);     // ?
// console.log(newArr);  // ?



//typeof Operator
// console.log(typeof null);    // ?
// console.log(typeof []);      // ?
// console.log(typeof {});      // ?


//Object Destructuring with Default Values

// const { a = 10, b = 20 } = { a: 5 };

// console.log(a);  // ?
// console.log(b);  // ?



// Destructuring with Renaming
// const { name: firstName } = { name: 'John' };
// console.log(firstName);  // ?


// Spread Operator with Arrays
// const a = [1, 2];
// const b = [...a, 3, 4];

// console.log(b);  // ?


//APP inven

// console.log('1')     

// setTimeout(() => {

//   console.log('2')

// }, 1000)

// process.nextTick(() => {

//   console.log('3')

// })


// Promise.resolve().then(() => console.log('4'))

// setImmediate(() => {

//   console.log('6')

// })
// setTimeout(() => {

//   console.log('5')

// }, 0)


// console.log('7')

//
// 1567234  pawan
////1,4,7,3,6,5,2  praveen
//1,4,7,3,5,6,2 rajesh
//1,7,3,6,4,5,2 manthan
