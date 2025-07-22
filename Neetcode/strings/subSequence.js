//Write a function called isSubsequence which takes in two strings and checks whether the characters in the first string form a subsequence of the characters in the second string. In other words, the function should check whether the characters in the first string appear somewhere in the second string, without their order changing.
function isSubsequence(small, big) {
    let i = 0;
    for (let char of big) {
        if (char === small[i]) i++;
        if (i === small.length) return true;
    }
    return small.length === 0;
}


console.log(isSubsequence("hello", "gejdejfehellojkmmkkm")); // true
console.log(isSubsequence("sing", "sting")); // true
console.log(isSubsequence("abc", "abracadabra")); // true
console.log(isSubsequence("abc", "acb")); // false (order matters)





function findShortCountInLongString(long, short) {
    let counter = 0;
    for (let i = 0; i < long.length; i++) {
        for (let j = 0; j < short.length; j++) {
            if (long[i + j] !== short[j]) break;
            if (j === short.length - 1) counter++;
        }
    }

    return counter;
}

console.log(findShortCountInLongString("wowomgzomg", "omg"));