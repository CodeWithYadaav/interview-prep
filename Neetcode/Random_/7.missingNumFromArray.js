// Array with a missing number
const arr = [1,2,4]; 

const n = arr.length + 1; //4 

// Calculate expected sum for numbers 1 to n
const expectedSum = (n * (n + 1)) / 2;     //(4*(4+1))/2  ===> 10

let actualSum = 0;
for (let i = 0; i < arr.length; i++) {
  actualSum += arr[i];
  
}

const missingNumber = expectedSum - actualSum;

console.log(missingNumber); 