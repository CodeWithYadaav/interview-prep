//callback,callback hell, promises, async/await

//-----------------------------------------------------------
//sync and async code as promise is async code


//sync
// console.log("Start")
// console.log("Hi")
// console.log("end")



//     console.log("Hi")
// }, 0)
// console.log("end")

//---------------------------------------------------------------------------
// console.log("start")

// function importantActions(username) {
//     setTimeout(() => {
//         return `Welcome to world! ${username}`
//     }, 1000);
// }
// const message = importantActions("praveen")
// console.log(message)


// console.log("end")
//start,undedined,end


// ----------------------------------------------------------------------------
// to fix above o/p there is concept called callback 
//Callbacks


// console.log("start")

// function importantActions(username, cb) {
//     setTimeout(() => {
//         cb(`Welcome to world! ${username}`)
//     }, 1000);
// }
// const message = importantActions("praveen", function (message) {
//     console.log(message)
// })
// console.log(message)


// console.log("End")


// ----------------------------------------------------------------------------


// console.log("start")

// function importantActions(username, cb) {
//     setTimeout(() => {
//         cb(`Welcome to world! ${username}`)
//     }, 1000);
// }

// function likeTheVideo(video, cb) {
//     setTimeout(() => {
//         cb(`like the video ${video}`)
//     }, 1000)
// }

// function shareTheVideo(video, cb) {
//     setTimeout(() => {
//         cb(`Share the video ${video}`)
//     }, 1000)
// }

// const message = importantActions("praveen", function (message) {
//     console.log(message)
//     likeTheVideo("JS Interview Que", (action) => {
//         console.log(action)
//         shareTheVideo("Praveen yadav codes", (action) => {
//             console.log(`Share the video ${action}`)
//             shareTheVideo("Praveen yadav codes", (action) => {
//                 console.log(`Share the video ${action}`)
//                 shareTheVideo("Praveen yadav codes", (action) => {                      //also called callback hell pyramid structure
//                     console.log(`Share the video ${action}`)
//                     shareTheVideo("Praveen yadav codes", (action) => {
//                         console.log(`Share the video ${action}`)
//                     })
//                 })
//             })
//         })
//     })

// })


// console.log("End")



// -------------------------------Sol to callback hell --> Promises---------------------------------------------
//Promises

// console.log("Start")

// const sub = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         let res = true;
//         if (res) resolve`Welcome to the world!`
//         else reject(new Error` Not resolve the promise`)
//     }, 1000)
// })
// //how promise executed    // resolve promsie comes in then
// sub.then((res) => {
//     console.log(res)
// }).catch((err) => {
//     console.log(err.message)
// })


// console.log("End")


// -------------------------------------------------------------------------------------------------------------

// console.log("start")

// function importantActions(username) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(`Welcome to world! ${username}`)
//         }, 1000);
//     })
// }

// function likeTheVideo(video) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(`Like the video ${video}`)
//         }, 1000);
//     })
// }

// function shareTheVideo(video) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(`Share the video! ${video}`)
//         }, 1000);
//     })
// }

// importantActions("praveen yadav").then((res) => {
//     console.log(res)
//     likeTheVideo("JS Interview que").then((res) => {
//         console.log(res)
//         shareTheVideo("share Interview").then((res) => {
//             console.log(res)                                            //Still it makes pyramid like structure we can do diffrent approach 
//         })
//     })
// }).catch((err) => {
//     console.log(err)
// })


// importantActions("praveen yadav").then((res) => {
//     console.log(res)
//     return likeTheVideo("JS Interview Que")
// }).then((res) => {
//     console.log(res)                                                //promise chaining
//     return shareTheVideo('share Interview')
// }).then((res) => {
//     console.log(res)
// }).catch((err) => {
//     console.log(err.message)
// })


// console.log("End")




// -------------------------------------------------------------------------------------------------------------
//above promise chaining is also look more work so to deal with this we had combinators

// console.log("start")

// function importantActions(username) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(`Welcome to world! ${username}`)
//         }, 500);
//     })
// }

// function likeTheVideo(video) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(`Like the video ${video}`)
//         }, 1000);
//     })
// }

// function shareTheVideo(video) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             reject(`Share the video! ${video}`)
//         }, 1000);
//     })
// }
//4 type of combinators

//Promise.all it will run the promises in parallel and return the fullfilled promises in  arrays but if any of the promsies fails it will fail the all promise 

// Promise.all([
//     importantActions("praveen yadav"),
//     likeTheVideo("JS Interview que"),
//     shareTheVideo("share Interview")
// ]).then((res) => {
//     console.log(res)
// }).catch((err) => {
//     console.error(`error:promsie reject like`, err)
// })


// Promise.race it will same as all but in this it will return the first  promise that's get fullfilled or reject first

// Promise.race([
//     importantActions("praveen yadav"),
//     likeTheVideo("JS Interview que"),
//     shareTheVideo("share Interview")
// ]).then((res) => {
//     console.log(res)
// }).catch((err) => {
//     console.error(`error:promsie reject like`, err)
// })


// Promise.allSettled it will same as Promsie.all as if one of promsie fails it will fail all the promise 
// but in this if any of the Promise gets fullfilled or reject it will give the resolve as well as reject promsies as well   


// Promise.allSettled([
//     importantActions("praveen yadav"),
//     likeTheVideo("JS Interview que"),
//     shareTheVideo("share Interview")
// ]).then((res) => {
//     console.log(res)
// }).catch((err) => {
//     console.error(`error:promsie reject like`, err)
// })


// Promise.any it will same as Promsie.race but it will ignores all the failed promise and return the fullfill resolve promise 
// if any of promsie resolve and if all the promises fails then only gave rejected promises


// Promise.any([
//     importantActions("praveen yadav"),
//     likeTheVideo("JS Interview que"),
//     shareTheVideo("share Interview")
// ]).then((res) => {
//     console.log(res)
// }).catch((err) => {
//     console.error(`error:promsie reject like`, err)
// })



// -------------------------------------------------------------------------------------------------------------
//Asyc await 

// console.log("start")

// function importantActions(username) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(`Welcome to world! ${username}`)
//         }, 500);
//     })
// }

// function likeTheVideo(video) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(`Like the video ${video}`)
//         }, 1000);
//     })
// }

// function shareTheVideo(video) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(`Share the video! ${video}`)
//         }, 1000);
//     })
// }

// const res = async () => {
//     try {
//         const message1 = await importantActions("praveen")
//         const message2 = await likeTheVideo("JS Interview Que")
//         const message3 = await shareTheVideo("Share Interview")
//         console.log({ message1, message2, message3 })
//     } catch (error) {
//         console.log(error.message)
//     }

// }

// res()
// console.log("End")

// -------------------------O/P Based Que------------------------------------------------------------   
// Q1
// console.log("start")

// const promise1 = new Promise((resolve, reject) => {
//     console.log(1)
//     resolve(2)
// })

// promise1.then((res) => {
//     console.log(res)
// })

// console.log("end")


// when the promise is initialized it will execute the code inside the promise immediately and then it will go to the then block when the promise is resolved.
//  So the output will be start, 1, end, 2   

// -------------------------O/P Based Que------------------------------------------------------------   
// Q2
// console.log("start")
// const promise1 = new Promise((resolve, reject) => {
//     console.log(1)
//     resolve(2)
//     console.log(3)
// })

// promise1.then((res) => {
//     console.log(res)
// })

// console.log('end')
// when the promise is initialized it will execute the code inside the promise immediately and then it will go to the then block when the promise is resolved.
//  So the output will be start, 1, 3, end, 2


// -------------------------O/P Based Que------------------------------------------------------------
// Q3

// console.log("start")
// const fn =() => {
//     return new Promise((resolve, reject) => {
//         console.log(1)
//         resolve("success")
//     })
// }

// console.log("middle")

// fn().then((res) => {
//     console.log(res)
// }   )


// console.log("end")


//fxn is called after the middle so the output will be start, middle, 1, end, success

// -------------------------O/P Based Que------------------------------------------------------------
// Q4


// function job() {
//     return new Promise((resolve, reject) => {
//        reject()
// })
// }

// let promise = job()

// promise.then(function(){
//     console.log("Success 1")
// })
// .then(function(){
//     console.log("Success 2")
// })
// .then(function(){
//     console.log("Success 3")
// })
// .catch(function(){
//     console.log("Error 1")
// })
// .then(function(){
//     console.log("Success 4")
// })  



// -------------------------O/P Based Que------------------------------------------------------------
// Q5
// function job() {
//     return new Promise((resolve, reject) => {
//         if(state){
//             resolve("Success")
//         }else{
//             reject("Error")
//         }
//     })
// }

// let promise = job(true)

// promise.then(function (data) {
//     console.log(data)
//     return job(false)
// })
// .catch(function (err) {
//     console.log(err)
//     return "Error handled"
// }) 
// .then(function (data) {
//     console.log(data)
//     return job(true)
// })
// .catch(function (err) {
//     console.log(err)
// })
