// Input: s = "ADOBECODEBANC", t = "ABC"
// Output: "BANC"


// ===== APPROACH 3: MOST OPTIMIZED (Clean and efficient) =====
function minWindow(s, t) {
    if (!s || !t || s.length < t.length) return "";
    
    const need = {};
    for (let c of t) need[c] = (need[c] || 0) + 1;
    
    let left = 0, matched = 0, minLen = Infinity, start = 0;
    const window = {};
    
    for (let right = 0; right < s.length; right++) {
        const c = s[right];
        
        if (c in need) {
            window[c] = (window[c] || 0) + 1;
            if (window[c] === need[c]) matched++;
        }
        
        while (matched === Object.keys(need).length) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                start = left;
            }
            
            const d = s[left];
            if (d in need) {
                if (window[d] === need[d]) matched--;
                window[d]--;
            }
            left++;
        }
    }
    
    return minLen === Infinity ? "" : s.slice(start, start + minLen);
}