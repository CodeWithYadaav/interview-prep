function expandString(input) {
    let result = "";
    let i = 0;

    while (i < input.length) {
        if (isNaN(input[i])) {
            let letter = input[i];
            let count = "";
            i++;

            while (i < input.length && !isNaN(input[i])) {
                count += input[i];
                i++;
            }

            result += letter.repeat(parseInt(count));
        }
    }

    return result;
}

// Example usage:
console.log(expandString("a2b3c")); // Output: "aabbb" + "c" repeated 100 times

function expandStringIndex(str) {
    let result = "";

    for (let i = 0; i < str.length; i++) {
        let charGroup = str[i].repeat(i + 1);
        result += charGroup.charAt(0).toUpperCase() + charGroup.slice(1);
    }

    return result;
}

console.log(expandStringIndex("rajesh")); // Output: "aabbb" + "c" repeated 100 times