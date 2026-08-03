/**
 * ============================================================================
 * CHEAT SHEET: Map, Filter, Reduce (Polyfills & Interview Questions)
 * ============================================================================
 *
 * CORE CONCEPTS:
 *  1. map(): Creates a NEW array by transforming every element of the existing array via a callback.
 *  2. filter(): Creates a NEW array containing only elements that satisfy a condition (return true).
 *  3. reduce(): Reduces an array down to a single value (number, object, array) by executing a reducer callback on each element.
 *
 * NOTE ON REDUCE ACCUMULATOR:
 *  - If an `initialValue` is provided, the accumulator starts as `initialValue`.
 *  - If no `initialValue` is provided, the accumulator defaults to array index 0, and iteration starts from index 1.
 */

/* ============================================================================
 * 1. MAP POLYFILL & EXAMPLE
 * ============================================================================
 */

Array.prototype.myMap = function (cb) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    temp.push(cb(this[i], i, this));
  }
  return temp;
};

// Example Usage:
const number = [1, 2, 3, 4];

const resp = number.myMap((num, i, arr) => {
  return num * 3;
});

console.log(resp); // Output: [3, 6, 9, 12]


/* ============================================================================
 * 2. FILTER POLYFILL & EXAMPLE
 * ============================================================================
 */

Array.prototype.myFilter = function (cb) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      temp.push(this[i]);
    }
  }
  return temp;
};

// Example Usage:
const nums = [1, 2, 3, 4];

const moreThanTwo = nums.myFilter((num) => {
  return num > 2;
});

console.log(moreThanTwo); // Output: [3, 4]


/* ============================================================================
 * 3. REDUCE POLYFILL & EXAMPLE
 * ============================================================================
 */

Array.prototype.myReduce = function (cb, initial) {
  let accumulator = initial;
  for (let i = 0; i < this.length; i++) {
    accumulator = accumulator !== undefined ? cb(accumulator, this[i], i, this) : this[i];
  }
  return accumulator;
};

// Example Usage:
const arr = [1, 2, 3, 4];

const res = arr.myReduce((acc, curr) => {
  return acc + curr;
});

console.log(res); // Output: 10


/* ============================================================================
 * 4. MAP VS FOREACH (INTERVIEW COMPARISON)
 * ============================================================================
 *
 * Key Differences:
 *  1. Return Value: `map()` returns a brand new array. `forEach()` returns `undefined`.
 *  2. Chaining: `map()` result can be directly chained (`.filter()`, `.sort()`). `forEach()` cannot be chained.
 *  3. Original Array Mutation: `map()` does not mutate original array; `forEach()` is typically used to mutate or perform side-effects.
 */

const compArr = [2, 3, 4, 5];

// `map()` creates and returns a new array (can be chained)
const mapRes = compArr.map((ar) => {
  return ar + 2;
});

// `forEach()` does NOT return a value; modifies original array in-place
const forEachRes = compArr.forEach((ar, i) => {
  compArr[i] = ar + 4; // Modifies original array
});

console.log(mapRes);     // Output: [4, 5, 6, 7]
console.log(forEachRes); // Output: undefined
console.log(compArr);   // Output: [6, 7, 8, 9] (Mutated original array)


/* ============================================================================
 * 5. OUTPUT-BASED INTERVIEW QUESTIONS
 * ============================================================================
 */

const students = [
  { name: "John Doe", rollNumber: 101, marks: 80 },
  { name: "Jane Smith", rollNumber: 102, marks: 69 },
  { name: "Michael Brown", rollNumber: 103, marks: 35 },
  { name: "Emily Davis", rollNumber: 104, marks: 55 }
];

// ----------------------------------------------------------------------------
// Q1: Return only names of students in uppercase
// ----------------------------------------------------------------------------

// Traditional `for` loop approach:
const namesLoop = [];
for (let i = 0; i < students.length; i++) {
  namesLoop.push(students[i].name.toUpperCase());
}
console.log(namesLoop);

// Functional `map()` approach:
const namesMap = students.map((stu) => {
  return stu.name.toUpperCase();
});
console.log(namesMap);

// 🎯 Output: ["JOHN DOE", "JANE SMITH", "MICHAEL BROWN", "EMILY DAVIS"]


// ----------------------------------------------------------------------------
// Q2: Return details of students who scored more than 60
// ----------------------------------------------------------------------------
const highScorers = students.filter((mark) => {
  return mark.marks > 60;
});

console.log(highScorers);
/*
 * 🎯 Output:
 * [
 *   { name: 'John Doe', rollNumber: 101, marks: 80 },
 *   { name: 'Jane Smith', rollNumber: 102, marks: 69 }
 * ]
 */


// ----------------------------------------------------------------------------
// Q3: Sum of marks of all students
// ----------------------------------------------------------------------------
const totalMarks = students.reduce((acc, curr) => {
  return acc + curr.marks;
}, 0);

console.log(totalMarks);
// 🎯 Output: 239 (80 + 69 + 35 + 55)


// ----------------------------------------------------------------------------
// Q4: Return only names of students who scored more than 60 (Method Chaining)
// ----------------------------------------------------------------------------
const combineName = students
  .filter((stu) => stu.marks > 60)
  .map((names) => names.name);

console.log(combineName);
// 🎯 Output: ["John Doe", "Jane Smith"]
