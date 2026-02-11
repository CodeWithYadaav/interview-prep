// Map, Filter, Reduce

// Map=> it is creating to new array from the existing array by applying function to each of first elem of the arrray

// Filter=> takes each elem in an array and aplly condition statement against if it return true it will push in an array else will not push in array

// Reduce=> reduces the value of array down to just one value
//acc is result of previous computation
//if there is no acc is provided means no value is given then it set to 0 which is provided if no value provided in acc then it will pick 0 index of arr bydefault


//POlYFILL of MAP

Array.prototype.myMap = function (cb) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    temp.push(cb(this[i], i, this))
  }
  return temp;
}


const number = [1, 2, 3, 4]

const resp = number.myMap((num, i, arr) => {
  return num * 3
})
console.log(resp);




//POlYFILL of Filter

Array.prototype.myFilter = function (cb) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) temp.push(this[i])
  }
  return temp
}

const nums = [1, 2, 3, 4]

const moreThanTwo = nums.myFilter((num) => {
  return num > 2
})

console.log(moreThanTwo);



//POlYFILL of Reduce function

Array.prototype.myReduce = function (cb, initial) {
  let accumulater = initial
  for (let i = 0; i < this.length; i++) {
    accumulater = accumulater ? cb(accumulater, this[i]) : this[i]
  }
  return accumulater;
}

const arr = [1, 2, 3, 4]

const res = arr.myReduce((acc, curr) => {
  return acc + curr
})

console.log(res);




//Map Vs ForEach


// const arr=[2,3,4,5]


//we can chain on map like filter join.split but on forEach cannot do anything
// const mapRes = arr.map((ar) => {
//   return ar + 2
// })

// //map will returns the new array but forEach will not return anything it will simply modified the existing array
// const forEachRes = arr.forEach((ar, i) => {
//    return arr + 2    will not give anything
//   arr[i] = ar + 4  // this will modify the org array
// })
// console.log(mapRes,forEachRes,arr);




//Q1====>return only names of students in capital
// const students = [
//   { name: "John Doe", rollNumber: 101, marks: 80 },
//   { name: "Jane Smith", rollNumber: 102, marks: 69 },
//   { name: "Michael Brown", rollNumber: 103, marks: 35 },
//   { name: "Emily Davis", rollNumber: 104, marks: 55 }
// ];

//   const names= []
//   for (let i = 0; i < students.length; i++) {
//      names.push(students[i].name.toUpperCase())
//   }
//   console.log(names);

// const names=students.map((stu)=>{
//     return stu.name.toUpperCase()
// })
// console.log(names);



//Q2==> return only details of those who score more than 60

// const marks= students.filter((mark)=>{
//     return mark.marks>60
// })
// console.log(marks);


// Q3==> sum of marks of all students

// const sum = students.reduce((acc,curr,i,arr)=>{
//     return acc+curr.marks
// },0)
// console.log(sum);


// Q4===>  return only names who scored more than 60

// const combineName = students.filter((stu)=>{
//     return stu.marks>60
// }).map((names)=>{return names.name})

// console.log(combineName);




