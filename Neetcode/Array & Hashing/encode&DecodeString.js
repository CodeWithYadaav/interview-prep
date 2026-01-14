

// Encode
function encode(strs) {
    return strs.map(str => `${str.length}#${str}`).join('');
}

// Decode

function decode(s) {
    // Easiest explanation:
    // The string s encodes words like this: "length#word", so we want to extract each word back out.
    // We look for the '#' to know where the length ends and the word starts.
    // By reading the number before the '#', we know how many characters to grab after the '#'.

    const res = [];
    let i = 0;

    while (i < s.length) {
        // 1. Start at current position i, look for next '#' which separates the length from the word.
        let j = i;
        while (s[j] !== '#') j++; // find the '#'
        // 2. Parse the substring from i to j (just before '#') to get the length of the word.
        const len = parseInt(s.slice(i, j));
        // 3. The word starts right after '#', and it's exactly 'len' characters.
        const word = s.slice(j + 1, j + 1 + len);
        // 4. Save this word to our result array.
        res.push(word);
        // 5. Move i forward to next encoded string (after this word).
        i = j + 1 + len;
    }

    return res;
}

const encoded = encode(["leet", "code", "js"]);
console.log(encoded); // "4#leet4#code2#js"

const decoded = decode(encoded);
console.log(decoded); // ["leet", "code", "js"]

