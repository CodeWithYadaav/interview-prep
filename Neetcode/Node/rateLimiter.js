// rateLimiter.js

const ipRequests = new Map();

function rateLimiter(req, res, next) {
    const ip = req.ip;
    const now = Date.now();
    const window = 60 * 1000; // 1 minute
    const limit = 40;

    if (!ipRequests.has(ip)) {
        ipRequests.set(ip, []);
    }

    const requests = ipRequests.get(ip);

    // Remove old requests and check limit
    const recent = requests.filter(time => now - time < window);
    ipRequests.set(ip, recent);

    if (recent.length >= limit) {
        return res.status(429).json({
            message: "Too many requests. Please try again after one minute."
        });
    }

    recent.push(now);
    next();
}




