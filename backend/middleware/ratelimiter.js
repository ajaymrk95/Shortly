import redisclient from '../clientConnect.js';

const rateLimiter = async (req, res, next) => {
    const redisKey = `ratelimit:${req.ip}`;
    const WINDOW_SIZE_MS = 60000; 
    const MAX_REQUESTS = 10;      
    
    const now = Date.now(); 
    const windowStart = now - WINDOW_SIZE_MS; 


    await redisclient.zRemRangeByScore(redisKey, '-inf', windowStart);


    const requestCount = await redisclient.zCard(redisKey);

  
    if (requestCount >= MAX_REQUESTS) {
        return res.status(429).json({ error: "Too Many Requests" });
    }

    
    await redisclient.zAdd(redisKey, { score: now, value: now.toString() });

    next();
};


export default rateLimiter