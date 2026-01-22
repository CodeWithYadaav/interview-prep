//Objects in js

// const user = {
//     name: "praveen",
//     age: 30
// }
// // console.log(user.name)
// user.name = 'yadav'
// console.log(user.name)

// delete user.age
// console.log(user)

// ------------------------------------
//delete keyword only use when you delete any key from object but now work onvariable 
// const func = (function (a) {
//     delete a;
//     return a;
// })(5)

// console.log(func)

// output ??

// ----------------------------------------
// add property like the video in obj and how to access it 
// const user = {
//     name: "praveen",
//     age: 30
// }

// const user = {
//     name: "praveen",
//     age: 30,
//     "like the video": true
// }
// // to access it will like
// console.log(user['like the video'])
// console.log(user)

// // to delete the prop it will like
// console.log(delete user['like the video'])
// console.log(user)

// -----------------Add dynamic key value in obj------------------------------- 
// const property = 'firstName'
// const name = 'praveen'
// const user = {
//     property: name
// }
// console.log(user) //{ property: 'praveen' } but not taking it as firstName:praveen 

// so to add dynamic 
// const property = 'firstName'
// const name = 'praveen'
// const user = {
//     [property]: name
// }
// console.log(user)   //{ firstName: 'praveen' }

// ------------------------Loop ober Obj----------------------------------------
// const user = {
//     name: "praveen",
//     age: 30,
//     isTotallyAwsome: true
// }

// for (let key in user) {
//     console.log(key)
//     console.log(user[key])
// }

// --------------------------Question-----Output based----------------------------------------------

// const obj = {
//     a: "one",
//     b: "two",
//     a: "three"
// };


// console.log(obj) // a ??


// --------------------------Question-----Output based----------------------------------------------
// Create a multiplyByTwo function that multiplies all numeric value of num by 2 

// let nums = {
//     a: 100,
//     b: 200,
//     title: "My Nums"
// }

// multiplyNumeric(nums)


// function multiplyNumeric(obj) {
//     for (let key in obj) {
//         if (typeof obj[key] === "number") {
//             obj[key] = obj[key] * 2
//         }
//     }
// }
// console.log(nums)


// --------------------------Question-----Output based----------------------------------------------
// / when we assign b as key what happen is
// it tries to convert as string for b is 
// a['[object Object]'] = 123
// a['[object Object]'] = 456   so it overlaps the value 


// const a = {}
// const b = { key: "b" }
// const c = { key: "c" }

// a[b] = 123
// a[c] = 456
// console.log(a[b])  // ??


// --------------------------Question-----Output based----------------------------------------------
// what's Json.stringyfy and Json.paerse

// const user = {
//     name: "praveen",
//     age: 30
// }
// //when we convert as a string
// const strObj = JSON.stringify(user)
// console.log(strObj)
// //to convert it back in obj 
// const obj = JSON.parse(strObj)
// console.log(obj)

//use case : storing in localstorage cannot store the obj in our localstorage had to stringyfy



// --------------------------Question-----Output based----------------------------------------------

// console.log([...'Lydia'])  //will spread all the string inside an array 

// --------------------------Question-----Output based----------------------------------------------
// willl add user in admin obj 


// const user = { name: "praveen", age: 30 }
// const admin = { admin: true, ...user }
// console.log(admin)


// --------------------------Question-----Output based----------------------------------------------

// const setting = {
//     username: "praveen",
//     level: 10,
//     health: 98
// }

// const data = JSON.stringify(setting, ['level', 'health'])
// console.log(data)

// --------------------------Question-----Output based----------------------------------------------

// const shape = {
//     radius: 10,
//     diameter() {
//         return this.radius * 2
//     },
//     perimeter: () => 2 * Math.PI * this.radius    //refrence to window means global

// }

// console.log(shape.diameter())
// console.log(shape.perimeter())


// --------------------------Question-----Destucturing in Obj----------------------------------------------

// let user = {
//     name: "praveen",
//     age: 30
// }

// const { name } = user
// console.log(name)

//how do you rename the destructure value 



// let user = {
//     name: "praveen",
//     age: 30
// }
// const name = "yadav"

// const { name: username } = user
// console.log(username)


//destructing can be perform in nested ways

// let user = {
//     name: "praveen yadav",
//     age: 30,
//     fullName: {
//         first: "praveen",
//         last: "yadav"
//     }
// }

// const { fullName: { first } } = user //nested destructure
// console.log(first)


// --------------------------Question-----Destucturing in Obj----------------------------------------------
// cannot be write rest parameters in the begining or in middle comes only in last 

// function getItems(fruitList, ...args, favoriteFruits) {
//     return [...fruitList, ...args, favoriteFruits]
// }

// console.log(getItems(['banana', 'apple'], 'peer', 'orange'))

// function getItems(fruitList, favoriteFruits, ...args) {
//     return [...fruitList, ...args, favoriteFruits]
// }

// console.log(getItems(['banana', 'apple'], 'peer', 'orange'))



// --------------------------Question--------------------------------------------------
// Both refer to same rerence any change in both of them . both them will reflects

// let c = { greeting: "Hey!" }
// let d;

// d = c;
// c.greeting = "Hello"
// console.log(d.greeting)


// ----------------------Output----Question--------------------------------------------------
// both refer to diffrent location 

// console.log({ a: 1 } == { a: 1 })  // ??
// console.log({ a: 1 } === { a: 1 }) // ??


// ----------------------Output----Question--------------------------------------------------
// will setting up to [0] so wil not impact if we try to change by person.name=null then it will make change
// obj refrencing


// let person = { name: "lydia" }
// const member = [person]
// person = null

// console.log(member)


// ----------------------Output----Question--------------------------------------------------
// first 2 not passing anything so it simply clone the object ad takes the number but on third time we were passing the num so it chnages the values

// const value = { number: 10 }

// const multiply = (x = { ...value }) => {
//     console.log((x.number *= 2));
// }

// multiply()
// multiply()
// multiply(value)
// multiply(value)


// ----------------------Output----Question--------------------------------------------------

// function changeAgeAndRefrence(person) {
//     person.age = 25
//     person = {
//         name: "praveen",
//         age: 50
//     };
//     return person
// }

// const personObj1 = {
//     name: "alex",
//     age: 30
// }

// const personObj2 = changeAgeAndRefrence(personObj1)

// console.log(personObj1)  // ?? -->  {name:"alex" , age:25}
// console.log(personObj2)  // ?? --> {name:"praveen",age:50}


// ----------------------Output----Question--------------------------------------------------
// Shallow copy and deep copy
// Shallow--  not able to change the original obj
// Deep copy of an obj or nested obj call deep copy and not able to make modification in both


// let user = {
//     name: "praveen",
//     age: 30
// }

// const shallowClone = Object.assign({}, user)
// shallowClone.name = "yadav"
// console.log(user, shallowClone)

// const deepClone = JSON.stringify(JSON.stringify(user))
// deepClone.name = 'pika'
// console.log(user, deepClone)