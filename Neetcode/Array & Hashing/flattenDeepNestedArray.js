function flattenArray(arr) {
    const result = [];

    for (const item of arr) {
        if (Array.isArray(item)) {
            result.push(...flattenArray(item)); // recursive call
        } else {
            result.push(item);
        }
    }

    return result;
}


const input = [1, [2, [3, [4, 5]], 6], 7];
console.log(flattenArray(input)); // [1, 2, 3, 4, 5, 6, 7]



// const flattened = input.flat(Infinity);