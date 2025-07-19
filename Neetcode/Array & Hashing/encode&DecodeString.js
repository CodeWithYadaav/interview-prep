

// Encode
function encode(strs) {
    return strs.map(str => `${str.length}#${str}`).join('');
}

// Decode

function decode(s) {
    const res = [];
    let i = 0;

    while (i < s.length) {
        let j = i;
        while (s[j] !== '#') j++; // find the '#'
        const len = parseInt(s.slice(i, j)); // extract length
        const word = s.slice(j + 1, j + 1 + len);
        res.push(word);
        i = j + 1 + len;
    }

    return res;
}

const encoded = encode(["leet", "code", "js"]);
console.log(encoded); // "4#leet4#code2#js"

const decoded = decode(encoded);
console.log(decoded); // ["leet", "code", "js"]

