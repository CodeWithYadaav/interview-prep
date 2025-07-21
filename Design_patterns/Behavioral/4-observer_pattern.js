// 🔧 Scenario:
// You built an order service that sends notifications (Email, SMS, Webhook) after an order is placed, but you want to decouple notification logic from the order service.


// ✅ What to Say in Interview:
// In our order management system, we needed to trigger multiple side-effects like email, SMS, and push notifications after an order is created. Instead of writing these inside the order logic, I used the Observer pattern.

// I implemented a pub-sub model using Node.js EventEmitter, where each listener handled its responsibility independently. It improved code modularity and testability.



// eventBus.js ----------------------------------------------------------------x------------------------------------
const EventEmitter = require('events');
const eventBus = new EventEmitter();
module.exports = eventBus;



// orderService.js
const eventBus = require('./eventBus');

function placeOrder(order) {
    console.log(`✅ Order placed: ${order.id}`);
    eventBus.emit('orderPlaced', order);
}

module.exports = placeOrder;



// listeners/emailNotifier.js
const eventBus = require('../eventBus');

eventBus.on('orderPlaced', (order) => {
    console.log(`📧 Email sent to ${order.user}: Your order ${order.id} is confirmed`);
});



// listeners/smsNotifier.js
const eventBus = require('../eventBus');

eventBus.on('orderPlaced', (order) => {
    console.log(`📱 SMS sent: Order ${order.id} placed successfully`);
});



// // app.js
require('./listeners/emailNotifier');
require('./listeners/smsNotifier');

const placeOrder = require('./orderService');

placeOrder({ id: 'ORD123', user: 'praveen@yadav.com' });




// 🎯 Why Observer Here?
// Each listener handles only its own concern (separation of concerns).
// Easy to add/remove features (e.g., add webhook without touching orderService).
// Makes the system loosely coupled, better for microservices/events.


// | Question                                   | Good Answer                                                                  |
// | ------------------------------------------ | ---------------------------------------------------------------------------- |
// | Can this scale to microservices?           | Yes, we can replace EventEmitter with Redis Pub/Sub, Kafka, or RabbitMQ.     |
// | How do you handle failure in one observer? | Use try-catch around listeners or make listeners async with logging/retries. |
// | How do you ensure order of execution?     | Use `eventBus.once` for critical listeners or manage order explicitly.        |