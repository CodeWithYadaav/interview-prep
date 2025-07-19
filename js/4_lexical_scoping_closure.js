//closure
//lexical scope

// scope which refer to current scope which can either be globally or parent scope

// variable which is defined outside the function but can be accessible inside the another function defined after vaiable declaration but reverse is not possible
// var username = "praveen"

//global 
// function local(){
//     //local
//     console.log(username);
// }
// local()


//QUE

// function subscribe(){
//     var name= "praveen"
//     //innerscope 2
//     function displayName(){
//         //innerscope 1
//         console.log(name);
        
//     }
//     displayName()
// }

// subscribe()


// CLOSURE is the combination of function bundeled together with refrences to its surroundings state or closure gives access to an outer funciton scope from inner function

//  use of this is to make private variables 


// Closure scope chain
// local
// outer
// global

// var e=10;
// function sum(a){
//    return function (b){
//        return function (c){
//            return function (d){
//                 console.log(a+b+c+d+e);
                
//             }
//         }
//     }
// }
// console.log(sum(1)(2)(3)(4));




//Que1.  

// let count =0;
// (function printCount(){
//     if(count===0){
//         let count=1;
//         console.log(count);
        
//     }
//     console.log(count);
    
// })()



// Qu2

// function createBase(num){
//     return function(innerNum){
//         console.log( num+innerNum)
        
//     }
// }

// var addSix=createBase(6);
// addSix(10);
// addSix(21)




