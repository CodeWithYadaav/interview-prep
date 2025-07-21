// ✅ Use Case: Adapting a third-party payment API to a standard interface
// Suppose your app expects processPayment(amount) but a new payment provider uses makePayment(amt)



// thirdPartyPayment.js (external API)
class ThirdPartyPayment {
  makePayment(amt) {
    console.log(`Payment of ₹${amt} processed via third-party gateway`);
  }
}

// Adapter
class PaymentAdapter {
  constructor(thirdPartyInstance) {
    this.gateway = thirdPartyInstance;
  }

  processPayment(amount) {
    // Adapt interface
    this.gateway.makePayment(amount);
  }
}

// Usage
const thirdParty = new ThirdPartyPayment();
const adapter = new PaymentAdapter(thirdParty);

adapter.processPayment(500);

// Output:
// Payment of ₹500 processed via third-party gateway




//  Interview Tip:
// Use Adapter pattern when you need to integrate an incompatible API with your system by wrapping it into a familiar interface, enabling smooth replacement or upgrade of systems.