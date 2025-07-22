

// ###################################################ACID########################################################
// ===============================
// 1. Atomicity = All or Nothing
// ===============================

// - Definition: Ensures that each transaction is "all or nothing." If any part of the transaction fails, the entire transaction is rolled back, leaving the database unchanged.
// - Example: In a bank transfer, either both the debit and credit happen, or neither does.

function transferMoney(from, to, amount) {
    try {
        debit(from, amount);    // Take money from sender
        credit(to, amount);     // Add money to receiver
        console.log("✅ Transfer successful");
    } catch (e) {
        console.log("❌ Transfer failed — rolling back");
    }
}
//   🧠 Example: If the debit works but credit fails, we undo the whole thing.


// ===============================
// 2.  Consistency = Data Always Makes Sense
// ===============================

// - Definition: Guarantees that a transaction will bring the database from one valid state to another, maintaining database integrity. This means all rules, such as constraints, are enforced, ensuring that only valid data is saved.
// - Example: Ensuring that bank accounts don't go into negative values during a transfer.

function debit(account, amount) {
    if (account.balance < amount) {
        throw new Error("Not enough money");
    }
    account.balance -= amount;
    save(account); // Save only valid data
}

// 🧠 Example: You can’t have ₹-500 in your account if rules don’t allow it.


// ===============================
// 3.  Isolation = No Interference
// Transactions don’t mess with each other, even if run at the same time.
// ===============================

// - Definition: Ensures that the execution of a transaction is independent of other concurrent transactions. Each transaction behaves as if it is the only one happening, avoiding conflicts from simultaneous operations.
// - Example: Two users withdrawing money from the same account at the same time should not cause inconsistent balance updates.

async function withdraw(account, amount) {
    await lock(account); // Prevent others from using it now
    try {
        if (account.balance >= amount) {
            account.balance -= amount;
            save(account);
        } else {
            throw new Error("Insufficient funds");
        }
    } finally {
        unlock(account); // Allow others after we're done
    }
}

// 🧠 Example: Two people withdrawing at once won’t break the balance.



// ===============================
// 4.  Durability = Changes Stay Saved
// Once a transaction is saved, it stays — even after a crash.
// ===============================

function commitTransaction() {
    saveToDisk();  // Save to permanent storage
    console.log("✅ Changes saved forever");
}
//   🧠 Example: If money was transferred, it stays transferred even after a power cut.



// ----------------------------------------------------------------------------------------------------------------------------
// 🔁 Test it Out
const accountA = { balance: 1000 };
const accountB = { balance: 500 };

transferMoney(accountA, accountB, 200); // ✅ works
transferMoney(accountA, accountB, 2000); // ❌ fails, not enough money