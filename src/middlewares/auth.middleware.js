import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).json({
        success: false,
        message: "Access denied. No token provided."
    });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = {userId: decoded._id};
    next();
}

export default auth;