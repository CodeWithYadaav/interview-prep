

function isPalindrome(s) {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        while (left < right && !isAlphaNum(s[left])) left++;
        while (left < right && !isAlphaNum(s[right])) right--;

        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}

function isAlphaNum(c) {
    return /[a-z0-9]/i.test(c);
}


console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false



//Without check alphaNumeric

// function isPalindrome(s) {
//     let left = 0;
//     let right = s.length - 1;
  
//     while (left < right) {
//       if (s[left].toLowerCase() !== s[right].toLowerCase()) {
//         return false;
//       }
//       left++;
//       right--;
//     }
  
//     return true;
//   }
  