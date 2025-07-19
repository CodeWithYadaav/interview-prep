function groupAnagrams(strs) {
    const map = new Map();

    for (const word of strs) {
        const key = word.split('').sort().join('');
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(word);
    }

    return Array.from(map.values());
}


const strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
console.log(groupAnagrams(strs))

// output => [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
