// function in js 
//Q1. what is function declarations

// function square(num){
//     return num*num
// }

//Q2 function expression 
//when we store funciton in variable 

// const squre= function (num){
//     return num*num
// }


// Q3 first class function
// where function can be treated as variables where function can do anything same will do as variable 
// we can pass the function into another funciton just like normal variable and can manipulate and return from function 

function square(num){
    return num*num
}

function displaySquare(fn){
    console.log("square is ::"+fn(5));
    
}
displaySquare(square)


//Q4 what is IIFE  immediate invoked 

// (function square(num){
//     console.log(num*num);
   
// })(5)

// console.log(square(5));
// que

// (function(x){
//     return (function(y){
//         console.log(x);
        
//     })(2)
// })(1)        //1 due to closure ability to access to its outer scope or lexical scope 



//Q7  function scope
    // for (let i = 0; i < 5; i++) {
    //     setTimeout(()=>{
    //         console.log(i);
            
    //     },i*1000)        
    // }               // as it will 0,1,2,3,4 as it is block scope and in case of var it dosn't have block scope so it will give 5,5,5,5,5
  

// Q8 function Hoisting
// function is hoisted diffrent in case of var let as complete function is copied to its scope

// funcitonName()
// function funcitonName(){
//     console.log("praveen");
    
// }

// console.log(a);
// var a=10;


// Q9 
// var x=9;
// var fun= function(){
//     console.log(x);
//     var x=20
    
// }
// fun()    //undefined

//Q10 params vs arg

// function square(num){  //params
//     console.log(num*num);
    
// }
// square(5)  //arguments


// spread vs rest

// function square(...num){  //rest
//     console.log(num[0]*num[1]);
    
// }
// var arr=[5,6]

// square(...arr)  //spread


// Que==>  rest params will always be in last params
// const fn= (a,x,y,...numbers)=>{
//     console.log(x,y,numbers);
    
// }
// fn(5,6,3,7,8,9,2)



// Q12  callback function
// a function is a function which passed as an argument which is then invoked the inside the outer function to complete some kind of routine or action 

//Q13 arrow funciton

// const add= function (firstNum,secondNum){
//    return firstNum+secondNum
// }
// const add = (firstNum,secondNum)=> firstNum+secondNum
