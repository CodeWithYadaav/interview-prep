// https://roadsidecoder.hashnode.dev/javascript-interview-questions-on-var-let-and-const
// Scope
//scopes

//1. function name(){  
            //functional scope
// }


// 2. {
    //block scope
// }


 //var is functional scope but let and const is block scope



// {
//     var names='praveen'
// }
// console.log(names);  //still able to access outside the scope


// {
//     let names='praveen'
// }

// console.log(names);  //gives the error refrenceError not defined 


//Variable SHADOWING

// function test(){
//     let a ='Hello'
//     if(true){
//         let a ='Hi'
//         console.log(a);      
//     }
//     console.log(a);    
// }

// test()

//if we declare the let varible and try to shadow the variable 
//inside the scope with var it will says illegal shadowing



//declaration

// var a;   //works well
// var a;

// let a;    const and let cannot be declare in same scope with same name
// let a;

//but below can be done

// let a ;
// {
//     let a;
// }


//declartion withot initialisation
// var a;
// let b;
// const a;     cannot be declation without initialization

