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



// const flattened = input.flat(Infinity);  //one more way to do flat


// Imagine you have a big delivery box.Inside that box, there are some loose toys, but there are also smaller boxes.
// Inside those smaller boxes ? Even more boxes!
// This function is like a "Unpacking Robot."
// Its job is to take everything out until all you have is one flat row of toys on the floor.
