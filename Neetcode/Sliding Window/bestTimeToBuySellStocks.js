// ════════════════════════════════════════════════════════════════════════════════════
// 📈 BEST TIME TO BUY AND SELL STOCK - Sliding Window Pattern
// ════════════════════════════════════════════════════════════════════════════════════

// 📝 Problem: Find maximum profit from buying and selling stock ONCE
// Rule: You must BUY before you SELL (can't sell before buying!)
// Goal: Buy low, sell high - find the biggest difference

// 🎨 Visual Example:
// prices = [7, 1, 5, 3, 6, 4]
//           ↓  ↓     ↓
//           7  1     6
//              ↑_____↑
//           Buy here  Sell here = profit of 5 (6-1)
//
// Day:     0  1  2  3  4  5
// Price:   7  1  5  3  6  4
// 
// Best strategy: Buy on day 1 (price=1), sell on day 4 (price=6)
// Maximum profit = 6 - 1 = 5

// 🧠 KEY INSIGHTS:
// 1. We need to buy BEFORE we sell (can't time travel!)
// 2. To maximize profit, we want:
//    - Lowest buying price (minimum seen so far)
//    - Highest selling price (after the buy)
// 3. For each day, we can either:
//    - Sell at current price (if we bought at minimum)
//    - Or update minimum if today's price is lower

// 💡 STRATEGY (Greedy Approach):
// Track two things:
//   1. minPrice = lowest price we've seen so far (best day to buy)
//   2. maxProfit = best profit we can make
// 
// For each day:
//   - Calculate profit if we sell today: (today's price - minPrice)
//   - Update maxProfit if this is better
//   - Update minPrice if today's price is lower (better buy opportunity)

// ✅ Optimal Solution - O(n) Time, O(1) Space
function maxProfit(prices) {
    // Start with first price as minimum
    let minPrice = prices[0];  // This is our "buy" price
    let maxProfit = 0;         // Best profit found so far

    // Loop through prices starting from day 1
    // (We already set day 0 as minPrice)
    for (let i = 1; i < prices.length; i++) {
        
        // Calculate profit if we SELL today (at prices[i])
        // We bought at minPrice (some previous day)
        const profit = prices[i] - minPrice;
        
        // Update maxProfit if today's profit is better
        maxProfit = Math.max(maxProfit, profit);
        
        // Update minPrice if today's price is lower
        // (This gives us a better buying opportunity for future sells)
        minPrice = Math.min(minPrice, prices[i]);
    }

    return maxProfit;
}

// 📊 STEP-BY-STEP WALKTHROUGH:
// prices = [7, 1, 5, 3, 6, 4]
//
// Day 0: minPrice=7, maxProfit=0 (initialize)
// 
// Day 1: price=1
//   profit = 1 - 7 = -6 (negative, don't sell!)
//   maxProfit = max(0, -6) = 0
//   minPrice = min(7, 1) = 1 ✅ (found better buy price!)
//
// Day 2: price=5
//   profit = 5 - 1 = 4 (good profit!)
//   maxProfit = max(0, 4) = 4 ✅
//   minPrice = min(1, 5) = 1
//
// Day 3: price=3
//   profit = 3 - 1 = 2 (profit, but not better than 4)
//   maxProfit = max(4, 2) = 4
//   minPrice = min(1, 3) = 1
//
// Day 4: price=6
//   profit = 6 - 1 = 5 (best profit!)
//   maxProfit = max(4, 5) = 5 ✅
//   minPrice = min(1, 6) = 1
//
// Day 5: price=4
//   profit = 4 - 1 = 3
//   maxProfit = max(5, 3) = 5
//   minPrice = min(1, 4) = 1
//
// Final answer: maxProfit = 5

// 💡 WHY THIS WORKS:
// We're simulating buying at the LOWEST price we've seen so far,
// and checking the profit for each day after that.
// 
// The key insight: We only need ONE PASS through the array!
// - minPrice always tracks the best buying opportunity UP TO current day
// - maxProfit always tracks the best profit we can make

// ⚡ COMPLEXITY:
// Time: O(n) - single pass through prices array
// Space: O(1) - only two variables (minPrice, maxProfit)

// 🧪 Test Cases:
console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5 (buy at 1, sell at 6)
console.log(maxProfit([7, 6, 4, 3, 1]));    // 0 (prices only go down, no profit possible)



//Brute Force
// function maxProfit(prices) {
//     let maxProfit = 0;
//     for (let i = 0; i < prices.length; i++) {
//         for (let j = i + 1; j < prices.length; j++) {
//             maxProfit = Math.max(maxProfit, prices[j] - prices[i]);
//         }
//     }
//     return maxProfit;
// }
