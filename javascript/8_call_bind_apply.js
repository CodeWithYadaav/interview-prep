//Call Bind Apply in Js (explicit Binding)
// Q1  what is call
//--------------------------------------------------------------------------------
// var obj = { name: "praveen" }

// function sayHello() {
//     console.log(this.name)
// }

// sayHello()

//undefined so to be used or access that part need to use call
//--------------------------------------------------------------------------------

// var obj = { name: "praveen" }

// function sayHello() {
//     console.log(this.name)
// }

// sayHello.call(obj)


//so we have multiple args to pass in say hello we can pass that 

// var obj = { name: "praveen" }

// function sayHello(age) {
//     console.log(this.name + ' age is ' + age)
// }

// sayHello.call(obj, 30)


//--------------------------------------------------------------------------------
// Apply---> it same as Call just the diffrence if there are multple args than it takes in form of  array [] 

// var obj = { name: "praveen" }

// function sayHello(age, profession) {
//     console.log(this.name + ' age is ' + age + ' proffesion is  ' + profession)
// }

// sayHello.apply(obj, [30, "software enginner"])



//--------------------------------------------------------------------------------
// Bind---> provide another fxn which later to be executed 

// var obj = { name: "praveen" }

// function sayHello(age, profession) {
//     console.log(this.name + ' age is ' + age + ' proffesion is  ' + profession)
// }

// const bindFunc = sayHello.bind(obj)
// console.log(bindFunc(30, "software enginner"))
// console.log(bindFunc(30, "EPAM"))

//--------------------------------------------------------------------------------
// const person = { name: "praveen" }

// function sayHi(age) {
//     return `${this.name} is ${age}`
// }
// console.log(sayHi.call(person, 24))
// console.log(sayHi.bind(person, 24))  //fxn to be executed later 

//--------------------------------------------------------------------------------

// const age = 10

// var person = {
//     name: "praveen",
//     age: 30,
//     getAge: function () {
//         return this.age
//     }
// }

// var person2 = { age: 24 }
// console.log(person.getAge.call(person2))

//--------------------------------------------------------------------------------
// output

// var status = "😎 "

// setTimeout(() => {
//     const status = '😍'

//     const data = {
//         status: '🥑',
//         getStatus() {
//             return this.status
//         }
//     }

//     console.log(data.getStatus())
//     console.log(data.getStatus.call(this))

// }, 0);




