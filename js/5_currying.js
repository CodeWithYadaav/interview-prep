// https://roadsidecoder.hashnode.dev/javascript-interview-questions-currying-output-based-questions-partial-application-and-more


//currying is fxn taking one arg at a time and return a new fxn expecting the next argument it is the conversion tp callable to f(a,b) to this f(a)(b)


//-----------------------------------------------------------------------------------
//Example f(a,b) into f(a)(b)

// function f(a,b){
//     console.log(a,b);
// }


function f(a) {
    return function (b) {
        console.log(a, b);
    }
}
console.log(f(5)(2));

//--------------------------------------------------------------------------------------------

//why to use curring
// ✅ It makes a function pure which makes it expose to less errors and side effects.
// ✅ It helps in avoiding the same variable again and again.
// ✅ It is a checking method that checks if you have all the things before you proceed.
// ✅ It divides one function into multiple functions so that one handles one set of responsibility.

// How does currying work?
// Currying is a function that takes multiple arguments as input. It transform the function into a number of functions where every function will accept one argument.

// function sum(a){
//     return function(b){
//         return function(c){
//             return a+b+c
//         }
//     }
// }
// console.log(sum(2)(5)(1));

// ________________________________________________________________________________________

/* 
evaluate(”sum”)(2)(4) ⇒ 2+4 = 6
evaluate(multiply)(2)(4) ⇒ 2*4 = 8
evaluate(divide)(2)(4) ⇒ 2/4 = 2
evaluate(subtract)(2)(4) ⇒ 2-4 = -2
*/



/* function evaluate(operation){
    return function (a){
        return function(b){
            if(operation=='sum'){
                return a+b
            }
            if(operation=='multiply'){
                return a*b
            }
            if(operation=='divide'){
                return a/b
            }
            if(operation=='subtract'){
                return a-b
            }else{
                return "invalid operation"
            }
            
        }
    }
}
 
console.log(evaluate('sum')(2)(3)); */

//infinite curring

function add(a) {
    return function (b) {
        if (b) return add(a + b);
        return a;
    }
}

console.log(add(1)(2));
