

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


// Phase 1: Decoding "4#leet"
// Initial State: i = 0. The string starts at index 0.
// Finding the delimiter: We start j at i (index 0). It looks for the #. It finds it immediately at index 1. So, j = 1.
// Getting the Length: We slice from i to j (s.slice(0, 1)). This gives us "4". We convert that to the number 4.
// Extracting the Word: The word starts at j + 1 (index 2). We take 4 characters: s.slice(2, 2 + 4). This gives us "leet".
// Updating i: We move i to the start of the next segment: j + 1 + 4, which is 6


// Phase 2: Decoding "4#code"
// Current State: i = 6.
// Finding the delimiter: j starts at index 6. It moves to index 7 and finds the #. So, j = 7.
// Getting the Length: We slice from index 6 to 7. This gives us "4".
// Extracting the Word: The word starts at index 8. We take 4 characters: s.slice(8, 12). This gives us "code".
// Updating i: We move i to 7 + 1 + 4, which is 12
