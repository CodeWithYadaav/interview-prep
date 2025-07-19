// A fake async function that always returns 5
async function test() {
    return 5;
}

// This function runs test() in batches
async function attack() {
    // Run 2 batches
    for (let batch = 0; batch < 2; batch++) {
        const promises = [];

        // Create 101 test() calls in this batch
        for (let i = 0; i < 101; i++) {
            promises.push(test());
        }

        // Wait for all 101 to finish
        const results = await Promise.all(promises);

        // Print the batch result
        console.log(`Batch ${batch + 1}:`, results);
    }
}

// Start the attack function
attack();
