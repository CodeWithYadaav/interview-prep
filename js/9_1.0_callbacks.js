// Callbacks and callback hell are important concepts in JavaScript, particularly when dealing with asynchronous programming. Here’s a breakdown of both concepts:

// Callbacks
// A callback is a function that is passed as an argument to another function and is executed after some operation is completed. This is commonly used in asynchronous programming to handle the results of operations like fetching data or performing computations.

// Example of a Callback:


function fetchData(callback) {
    setTimeout(() => {
      const data = { id: 1, name: 'John Doe' };
      callback(data); // Calling the callback function with the data
    }, 1000);
  }
  
  function handleData(data) {
    console.log('Data received:', data);
  }
  
  fetchData(handleData); // Passing handleData as a callback

  

//   Callback Hell
// Callback hell refers to a situation where multiple nested callbacks are used, leading to code that is difficult to read and maintain. This often occurs when dealing with multiple asynchronous operations that depend on each other.



function firstFunction(callback) {
    setTimeout(() => {
      console.log('First function completed');
      callback();
    }, 1000);
  }
  
  function secondFunction(callback) {
    setTimeout(() => {
      console.log('Second function completed');
      callback();
    }, 1000);
  }
  
  function thirdFunction(callback) {
    setTimeout(() => {
      console.log('Third function completed');
      callback();
    }, 1000);
  }
  
  // Callback Hell
  firstFunction(() => {
    secondFunction(() => {
      thirdFunction(() => {
        console.log('All functions completed');
      });
    });
  });
  