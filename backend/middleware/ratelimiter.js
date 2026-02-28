import {rateLimit} from 'express-rate-limit'

const rateLimiter = rateLimit({

    windowMs:1*60*1000,
    limit:10,
    standardHeaders:'draft-8',
    message:{message:'Too Many Requests! Please wait before trying again'},
    statusCode:429,
    legacyHeaders:false

})

export default rateLimiter