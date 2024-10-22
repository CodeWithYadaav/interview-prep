

// ###################################################ACID########################################################
// ===============================
// 1. Atomicity:
// ===============================

// - Definition: Ensures that each transaction is "all or nothing." If any part of the transaction fails, the entire transaction is rolled back, leaving the database unchanged.
// - Example: In a bank transfer, either both the debit and credit happen, or neither does.

function transferMoney(fromAccount, toAccount, amount) {
    try {
        // Start transaction
        debit(fromAccount, amount);
        credit(toAccount, amount);
        // Commit transaction
        console.log("Transaction successful");
    } catch (error) {
        // Rollback transaction if any step fails
        console.error("Transaction failed, rolling back...");
    }
}

// ===============================
// 2. Consistency:
// ===============================

// - Definition: Guarantees that a transaction will bring the database from one valid state to another, maintaining database integrity. This means all rules, such as constraints, are enforced, ensuring that only valid data is saved.
// - Example: Ensuring that bank accounts don't go into negative values during a transfer.

function debit(account, amount) {
    if (account.balance < amount) {
        throw new Error("Insufficient balance");
    }
    account.balance -= amount;
    save(account);  // Save only valid states of account
}

// ===============================
// 3. Isolation:
// ===============================

// - Definition: Ensures that the execution of a transaction is independent of other concurrent transactions. Each transaction behaves as if it is the only one happening, avoiding conflicts from simultaneous operations.
// - Example: Two users withdrawing money from the same account at the same time should not cause inconsistent balance updates.

async function withdraw(account, amount) {
    await lockAccount(account);  // Lock the account to prevent concurrent operations
    try {
        if (account.balance >= amount) {
            account.balance -= amount;
            save(account);
        } else {
            throw new Error("Insufficient balance");
        }
    } finally {
        unlockAccount(account);  // Unlock the account after operation completes
    }
}

// ===============================
// 4. Durability:
// ===============================

// - Definition: Ensures that once a transaction is committed, it remains permanent, even in the event of a system crash or failure. The changes made by the transaction will persist.
// - Example: After a successful transfer, even if the server crashes, the transaction should not be lost.

function commitTransaction() {
    // Data is persisted to permanent storage
    persistToDatabase();
    console.log("Transaction committed and durable.");
}

// Example usage (Test the above functions)
const accountA = { balance: 1000 };
const accountB = { balance: 500 };

// Simulate a transfer from account A to account B
transferMoney(accountA, accountB, 200); // Successful transaction

// Try to debit an amount larger than the balance
try {
    debit(accountA, 1200);  // Should throw an error
} catch (error) {
    console.error(error.message);  // "Insufficient balance"
}