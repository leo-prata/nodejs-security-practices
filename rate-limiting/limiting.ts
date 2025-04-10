import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: 'draft-8',
    legacyHeaders: false,
});

export { limiter };