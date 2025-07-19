// Optimal Solution (Using Map + Bucket Sort) – O(n) Time, O(n) Space

function topKFrequent(nums, k) {
    const resp = {}
    for (let num of nums) {
        resp[num] = (resp[num] || 0) + 1
    }
    const bucket = []

    for (let num in resp) {
        console.log(num)
        let count = resp[num]
        if (!bucket[count]) {
            bucket[count] = [];
        }
        bucket[count].push(Number(num));
    }
    const res = []
    for (let i = bucket.length - 1; i >= 0 && res.length < k; i--) {
        res.push(...bucket[i])
    }

    return res.slice(0, k)
}


const nums = [1, 1, 1, 2, 2, 3], k = 2
console.log(topKFrequent(nums, k))




// function topKFrequent(nums, k) {
//     const map = new Map();
//     for (const num of nums) {
//       map.set(num, (map.get(num) || 0) + 1);
//     }
  
//     const sorted = [...map.entries()].sort((a, b) => b[1] - a[1]);
//     return sorted.slice(0, k).map(([num, _]) => num);
//   }
  