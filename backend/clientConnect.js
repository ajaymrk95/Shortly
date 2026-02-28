import { createClient } from 'redis';
import dotenv from 'dotenv'

dotenv.config()

const redisclient = createClient({
    username: 'default',
    password:process.env.REDISPASS,
    socket: {
        host:process.env.REDIS_URI,
        port:process.env.REDISPORT
    }
});

redisclient.on('error', err => console.log('Redis Client Error', err));

await redisclient.connect();

export default redisclient

