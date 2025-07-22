// 🎯 Interview Tip:
// If asked “Why not just use a normal class?”

// You answer:
// "Because with a normal class, every new call creates a new instance, which can cause data inconsistency or unnecessary resource usage. Singleton solves this by returning the same instance every time."

// class Singleton {
//   constructor() {
//     if (Singleton.instance) {
//       return Singleton.instance;
//     }

//     this.data = "I am the only instance";
//     Singleton.instance = this;
//   }

//   showData() {
//     console.log(this.data);
//   }
// }

// const a = new Singleton();
// const b = new Singleton();

// console.log(a === b); // true, both are the same object
// a.showData();         // I am the only instance
// b.showData();         // I am the only instance



//  Singleton Pattern in Node.js
// Purpose: Ensure only one instance of a class exists in the app (e.g., DB connection, logger, config loader).
// 🔧 Real Example: MongoDB Connection Singleton


// db.js
// const { MongoClient } = require('mongodb');

// let instance = null;

// async function connectToDB() {
//   if (instance) return instance;

//   const client = new MongoClient('mongodb://localhost:27017');
//   await client.connect();
//   instance = client.db('myapp');
//   console.log('✅ DB Connected');
//   return instance;
// }

// module.exports = connectToDB;


// Usage // app.js
// userService.js
// const connectToDB = require('./db');

// async function getUsers() {
//   const db = await connectToDB();
//   const users = await db.collection('users').find().toArray();
//   console.log('👥 Users:', users);
// }

// getUsers();




// ✅ Why Singleton?
// Ensures only one DB connection is opened.
// Saves resources and avoids memory leaks.

// ✅ What to Say in Interview:
// In my last project, I was building a microservice that interacts with MongoDB. Initially, we were accidentally creating new DB connections in multiple service files. 
// This caused high memory usage and poor performance under load.

// I solved it by implementing the Singleton pattern for the MongoDB client — so that only one connection is created and reused across the app.