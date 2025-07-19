// Factory Pattern in Node.js
// Purpose: Create objects based on type/condition, without exposing instantiation logic.
// 🔧 Real Example: Notification Factory (Email / SMS / Push)

// notificationFactory.js
class EmailNotification {
  send(msg) {
    console.log('📧 Email sent:', msg);
  }
}

class SMSNotification {
  send(msg) {
    console.log('📱 SMS sent:', msg);
  }
}

class PushNotification {
  send(msg) {
    console.log('🔔 Push sent:', msg);
  }
}

function NotificationFactory(type) {
  switch (type) {
    case 'email':
      return new EmailNotification();
    case 'sms':
      return new SMSNotification();
    case 'push':
      return new PushNotification();
    default:
      throw new Error('Invalid notification type');
  }
}

module.exports = NotificationFactory;



// Usage // app.js
// Purpose: Use the factory to create and send notifications without worrying about the instantiation logic.
const NotificationFactory = require('./notificationFactory');

function notifyUser(type, msg) {
  const notifier = NotificationFactory(type);
  notifier.send(msg);
}

// Examples
notifyUser('email', 'Welcome to the app!');
notifyUser('sms', 'Your OTP is 123456');


// ✅ Why Factory?
// Clean separation of object creation logic.
// Easily extendable (add WhatsApp, Slack, etc.).
// Useful for dynamic plugin-based systems.

// | Pattern       | Used For                           | Node.js Example                         |
// | ------------- | ---------------------------------- | --------------------------------------- |
// | **Singleton** | Single instance reuse              | DB connection, logger                   |
// | **Factory**   | Object creation based on condition | Notification handler, strategy selector |


// ✅ What to Say in Interview:
// I worked on a notification module in a Node.js backend where the system had to send alerts via email, SMS, or push notification. Initially, there were too many if-else or switch blocks scattered everywhere.

// I refactored the code using the Factory pattern, where the factory returns the right notifier instance based on the input type.