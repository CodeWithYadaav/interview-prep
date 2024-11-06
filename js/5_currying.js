// https://roadsidecoder.hashnode.dev/javascript-interview-questions-currying-output-based-questions-partial-application-and-more


//Example f(a,b) into f(a)(b)

// function f(a,b){
//     console.log(a,b);
// }


// function f(a){
//     return function(b){
//         console.log(a,b);        
//     }
// }
// console.log(f(5)(2));



//why to use curring


// function sum(a){
//     return function(b){
//         return function(c){
//             return a+b+c
//         }
//     }
// }
// console.log(sum(2)(5)(1));



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

function add(a){
    return function(b){
        if(b) return add(a+b);
        return a;
    }
}

console.log(add(1)(2));
