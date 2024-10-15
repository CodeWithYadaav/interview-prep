// Hoisting in JavaScript is a behavior where variables and function declarations are moved to the top of their scope before the code is executed. This means you can use variables or functions before they are defined in the code.

console.log(x); // Output: undefined
var x = 5;



// In the code above, x is declared after the console.log statement, but due to hoisting, JavaScript treats it as if the declaration (var x;) is at the top. However, only the declaration is hoisted, not the assignment, so the output is undefined.

// Key Points:
// Function declarations are fully hoisted, so you can call them before they appear in the code.
// Var declarations are hoisted but initialized with undefined.
// Let and const are hoisted but are not accessible before their declaration due to temporal dead zone (TDZ).
// Hoisting allows you to reference functions and variables before they're declared, but it's best practice to declare them at the start to avoid confusion.


//Hoisting

//anything which is declare or called above its function or variable

// console.log(count);
// var count=1

//tempral dead zone is basically a time between the declaration and initialization of let and const variable 
// in let phase it initialise in temporal dead zone
// console.log(count);
// let count =1


// function abc(){
//     console.log(a,b,c);
//     var a = 10 
//     let b=20
//     const c= 30
// }

// abc()   //a,b,c all will declartion are in the scope but not declared as let and const will be in temporal dead zone


