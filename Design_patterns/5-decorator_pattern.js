// ✅ Use Case: Logging decorator for services
// Add logging behavior to an existing service without modifying the original class.


// notificationService.js

class NotificationService {
  send(message) {
    console.log(`Sending notification: ${message}`);
  }
}

// Decorator
class LoggingDecorator {
  constructor(service) {
    this.service = service;
  }

  send(message) {
    console.log(`[LOG] About to send: ${message}`);
    this.service.send(message);
    console.log(`[LOG] Sent: ${message}`);
  }
}

// Usage
const service = new NotificationService();
const loggedService = new LoggingDecorator(service);

loggedService.send('Welcome to our platform!');

// Output:
// [LOG] About to send: Welcome to our platform!
// Sending notification: Welcome to our platform!
// [LOG] Sent: Welcome to our platform!






//  Interview Tip:
// Explain that decorators help add cross-cutting concerns (e.g., logging, caching, authentication) without altering the core logic, achieving Open/Closed Principle of SOLID.