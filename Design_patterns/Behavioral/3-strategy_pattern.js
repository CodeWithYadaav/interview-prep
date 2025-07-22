// 🔧 Scenario:
// You're building a payment gateway module that supports multiple payment methods: Credit Card, UPI, Wallet, etc. 
// You want to choose the algorithm (strategy) at runtime without writing if-else chains

// ✅ What to Say in Interview:
// In a project where we handled multiple payment types (Credit Card, UPI, Wallet), each with different validation and processing logic, 
// we implemented the Strategy Pattern to keep the logic clean and extensible.

// We created a strategy interface, and each method had its own implementation. The system selected the strategy at runtime based on user input or API request.


// Code Snippet: Strategy Pattern in Node.js
// strategies / creditCard.js
module.exports = {
    pay: (amount) => {
        console.log(`💳 Paid ₹${amount} via Credit Card`);
    }
};


// strategies / upi.js
module.exports = {
    pay: (amount) => {
        console.log(`📲 Paid ₹${amount} via UPI`);
    }
};



// strategies / wallet.js
module.exports = {
    pay: (amount) => {
        console.log(`👛 Paid ₹${amount} via Wallet`);
    }
};




// paymentContext.js
const creditCard = require('./strategies/creditCard');
const upi = require('./strategies/upi');
const wallet = require('./strategies/wallet');

const strategies = {
    creditcard: creditCard,
    upi: upi,
    wallet: wallet,
};

function processPayment(mode, amount) {
    const strategy = strategies[mode.toLowerCase()];
    if (!strategy) throw new Error('❌ Unsupported payment method');
    strategy.pay(amount);
}

module.exports = processPayment;




// index.js
const processPayment = require('./paymentContext');

processPayment('creditcard', 500);
processPayment('upi', 200);
processPayment('wallet', 100);



// Why Strategy Here?
// Cleanly separates logic per payment method.
// Easy to add new strategies (e.g., PayLater).
// Reduces bugs from conditional hell.
// Testable in isolation.



// | Question                                       | Good Answer                                                                                 |
// | ---------------------------------------------- | ------------------------------------------------------------------------------------------- |
// | How would you add NetBanking?                  | Create `netBanking.js` strategy, add to the `strategies` map. No other file changes needed. |
// | How would you handle dynamic strategy loading? | Use a config-driven registry or a dependency injection container.                           |
// | Can you apply this to validation logic too?    | Yes, same concept applies — different form validation strategies.                           |
