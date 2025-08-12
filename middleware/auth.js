import jwt from 'jsonwebtoken';

const authMiddleware = (roles=[]) => {
    return (req, res, next) => {
        console.log('Auth middleware - headers:', req.headers); // Debug log
        console.log('Auth middleware - Authorization header:', req.header('Authorization')); // Debug log
        
        const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log('Auth middleware - extracted token:', token ? 'Token present' : 'No token'); // Debug log

        if (!token) {
            console.log('Auth middleware - No token provided'); // Debug log
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        try {
            const jwtSecret = process.env.JWT_SECRET;
            console.log('Auth middleware - JWT_SECRET present:', !!jwtSecret); // Debug log
            
            const decoded = jwt.verify(token, jwtSecret);
            console.log('Auth middleware - Token decoded:', decoded); // Debug log
            
            req.user = decoded; 
            if (roles.length && !roles.includes(req.user.role)) {
                console.log('Auth middleware - Access denied for role:', req.user.role); // Debug log
                return res.status(401).json({ message: 'Access denied' });
            }

            console.log('Auth middleware - Authentication successful'); // Debug log
            next();
        } catch (error) {
            console.log("Auth middleware - JWT verification error:", error); // Debug log
            res.status(401).json({ message: 'Token is not valid' });
        }
    };
}

export default authMiddleware;

