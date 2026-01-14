// rateLimiter.js

const ipRequests = new Map();

function rateLimiter(req, res, next) {
    const ip = req.ip;
    const now = Date.now();
    const window = 60 * 1000; // 1 minute
    const limit = 40;

    // Check if the current IP is already in our map. If not, initialize it with an empty array to start tracking requests.
    if (!ipRequests.has(ip)) {
        ipRequests.set(ip, []);
    }

    // Retrieve the array of request timestamps for this IP.
    const requests = ipRequests.get(ip);

    // Filter out timestamps older than 60 seconds from now to keep only those within our rate limit window.
    const recent = requests.filter(time => now - time < window);

    // Update the map with only the relevant, recent timestamps for this IP.
    ipRequests.set(ip, recent);

    if (recent.length >= limit) {
        return res.status(429).json({
            message: "Too many requests. Please try again after one minute."
        });
    }

    recent.push(now);
    next();
}




