// Obj binding done in 2 ways  implicit and explicit 
// implicit binding apply when you invoke function in an obj when using dot notation . key 
// explicit binding apply by call bind apply

// --------------------------------Explain This Keyword-----------------------------------------------------------------------------------
// refrence something like Obj or the context we currently are in (Global context)

// this.a = 5
// console.log(this.a)   //5


// -----------------------------------------------------------------------------------
// const user = {
//     name: "praveen",
//     age: 30,
//     getDetail() {
//         console.log(this.name)
//     }
// }
// user.getDetail() //will give the name refer to its parent 



// const user = {
//     name: "praveen",
//     age: 30,
//     childObj: {
//         newName: "yadav",
//         getDetail() {
//             console.log(this.name, '', this.newName)
//         }
//     }
// }

// user.childObj.getDetail()   //this.newName will be yadav and name is undefined as it refer to its parent obj only 


// -----------------------------------------------------------------------------------
// const user = {
//     name: "praveen",
//     age: 30,
//     getDetail: () => {
//         console.log(this.name)
//     }
// }

// user.getDetail()  //will not be pointing anyone in case of arrow function as it refer to its parent in parent there is no name variable called 
//dont have normal parent fxn so it is pointing to window this 
// -----------------------------------------------------------------------------------
// const user = {
//     name: "praveen",
//     age: 30,
//     getDetail() {
//         const nestedArr = () => console.log(this.name)
//         nestedArr()
//     }
// }

// user.getDetail()  //now it will give o/p as its parent is normal fxn and it has the refrence from it sparent and it kind of inherit from getDetail


// -----------------------------------------------------------------------------------
//How this perform inside class or constructor

// class user {
//     constructor(n) {
//         this.name = n
//     }

//     getName() {
//         console.log(this.name)
//     }
// }

// const User = new user('praveen')
// User.getName()
// console.log(User)


// ----------------------------------Q1-------------------------------------------------
//output based
// const user = {
//     firstName: "praveen",
//     getName() {
//         const firstName = "yadav"
//         return this.firstName
//     }
// }

// console.log(user.getName())   // ?? alwaysd refer to to its parent for normal fxn


// ----------------------------------Q1-------------------------------------------------
//output based result of accessing its ref? why?
//when we calling the ref it calling to window in which there is no name variable is there 

// function makeUser() {
//     return {
//         name: "praveen",
//         ref: this
//     }
// }

// let user = makeUser()
// console.log(user.ref.name)

//so how will you fix and getting the name as praveen

// function makeUser() {
//     return {
//         name: "praveen",
//         ref() {
//             return this
//         }
//     }
// }

// let user = makeUser()
// console.log(user.ref().name)

//here we make normal fxn so it will point to parent obj as able to run


// ----------------------------------Q-------------------------------------------------
//treating it as cb fxn
// const user = {
//     name: "praveen",
//     logMessage() {
//         console.log(this.name)  // ??
//     }
// }
// setTimeout(user.logMessage, 1000)

//fix invoking this is as normal method not as cb 
// const user = {
//     name: "praveen",
//     logMessage() {
//         console.log(this.name)  // ??
//     }
// }
// setTimeout(function () {
//     user.logMessage()
// }, 1000)

// ----------------------------------Q-------------------------------------------------

// const user = {
//     name: "praveen",
//     greet() {
//         return `Hello ${this.name}` //refer to parent 
//     },
//     message: () => {
//         return `Hi ${this.name}`  //refer to window
//     }
// }

// console.log(user.greet())
// console.log(user.message())

// ----------------------------------Q-------------------------------------------------
// create obj calculator

// let calculator = {
//     read() {
//         this.a = +prompt("a = 0", 0)
//         this.b = +prompt("b = 0", 0)
//     },
//     sum() {
//         this.a + this.b
//     },
//     mul() {
//         this.a * this.b
//     }

// }

// calculator.read()
// console.log(calculator.sum())
// console.log(calculator.mul())

// ----------------------------------Q-------------------------------------------------

// var length = 4
// function callback() {
//     console.log(this.length) // ??  4
// }

// const object = {
//     length: 5,
//     method(fn) {
//         fn()
//     }
// }

// object.method(callback);

// ----------------------------------Q---CARS 24----------------------------------------------
// implement calc


// const calc = {
//     total: 0,
//     add(a) {
//         this.a += a
//         return this
//     },
//     multiply(a) {
//         this.a *= a
//         return this
//     },
//     subtract(a) {
//         this.a -= a
//         return this
//     },
// }

// const result = calc.add(10).multiply(5).subtract(30).add(10)
// console.log(result.total)