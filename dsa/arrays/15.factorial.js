// 6. Find the factorial of given number ?

function factorial(n){
    if(n<0) return "Not palindrom for -ve"

    let resp=1;
    for(let i=2;i<=n;i++){
        resp= resp*i
    }
    return resp
}



console.log(factorial(5));
