function findSecondLargest(arr) {
    if (arr.length < 2) {
      throw new Error("Array must contain at least two elements");
    }
  
    let largest = -Infinity;
    let secondLargest = -Infinity;
  
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > largest) {
        secondLargest = largest; // Update second largest
        largest = arr[i]; // Update largest
      } else if (arr[i] > secondLargest && arr[i] !== largest) {
        secondLargest = arr[i]; // Update second largest
    }
    }
  
    if (secondLargest === -Infinity) {
      throw new Error("No second largest element found");   
    }
  
    return secondLargest;
  }
  
  // Example usage:
  const arr = [12, 35, 1, 10, 34, 1];
  console.log(findSecondLargest(arr)); // Output: 34
  




//Remove 2 largest no from an array 

// function removeTwoLargest(arr) {
//     if (arr.length < 2) {
//       throw new Error("Array must contain at least two elements");
//     }
  
//     let largest = -Infinity;
//     let secondLargest = -Infinity;
  
//     // Find the largest and second largest numbers
//     for (let i = 0; i < arr.length; i++) {
//       if (arr[i] > largest) {
//         secondL
//       } else if (];argest = largest;
//         largest = arr[i];
//       }arr[i] > secondLargest && arr[i] !== largest) {
//         secondLargest = arr[i
//     }
  
//     // Filter out the largest and second largest elements
//     let result = [];
//     for (let i = 0; i < arr.length; i++) {
//       if (arr[i] !== largest && arr[i] !== secondLargest) {
//         result.push(arr[i]);
//       }
//     }
  
//     return result;
//   }
  
//   // Example usage:
//   const arr = [12, 35, 1, 10, 34, 1];
//   console.log(removeTwoLargest(arr)); // Output: [12, 1, 10, 1]
  