
//1. Using Bubble Sort (Simplest Sorting Algorithm)

// const arr = [5, 3, 8, 4, 2];

// for (let i = 0; i < arr.length; i++) {
//   for (let j = 0; j < arr.length - i - 1; j++) {
//     if (arr[j] > arr[j + 1]) {
//       // Swap elements
//       let temp = arr[j];
//       arr[j] = arr[j + 1];
//       arr[j + 1] = temp;
//     }
//   }
// }

// console.log(arr); 


// 2 selection sort 
// const arr = [5, 3, 8, 4, 2];

// for (let i = 0; i < arr.length - 1; i++) {
    
//   let minIndex = i;  //5
// //   console.log(minIndex,"----");
  
  
//   for (let j = i + 1; j < arr.length; j++) {
//     if (arr[j] < arr[minIndex]) {
//       minIndex = j;   //3
//     }
//   }

//   // Swap the found minimum element with the first element
//   let temp = arr[i];   // 5
//   arr[i] = arr[minIndex];  //3
//   arr[minIndex] = temp;  
// }

// console.log(arr); 





//3. Insertion sort
function insertionSort(arr){
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    // Move elements that are greater than key to one position ahead of their current position
    while ( arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key; // Insert the key at its correct position
  }
  return arr;
}

const arr = [5, 3, 8, 4, 2,1];
console.log(insertionSort(arr));  // Output: [2, 3, 4, 5, 8]






// function bubbleSort(arr){

//   for(let i=0;i<arr.length;i++){
//     for(let j=0;j<arr.length-1-i;j++){
//       if(arr[j]>arr[j+1]){
//         let temp= arr[j];
//         arr[j]=arr[j+1];
//         arr[j+1]=temp;
//       }
//     }
//   }
//   return arr

// }


// const arr = [5, 3, 8, 4, 2];
// console.log(bubbleSort(arr));
