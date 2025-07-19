function getSignature(str) {
    // Step 1: Create an array of 26 zeros for 'a' to 'z'
    const count = new Array(26).fill(0);

    let result = "";

    // Step 2: Count how many times each letter appears in the string
    for (let i = 0; i < str.length; i++) {
        const index = str[i].charCodeAt(0) - "a".charCodeAt(0); // Convert letter to index (0 for 'a', 1 for 'b', etc.)
        count[index] += 1;
    }

    // Step 3: Build the signature string like "a2b2" (if string is "baba")
    for (let i = 0; i < 26; i++) {
        if (count[i] !== 0) {
            const char = String.fromCharCode(i + "a".charCodeAt(0)); // Convert index back to character
            result += char + count[i]; // Append character and its count
        }
    }

    return result;
}
