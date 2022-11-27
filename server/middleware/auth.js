import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (!token) {
            return res.status(403).send("Access Denied")
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft(); // Take token from right;
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); // for middleware, use this function to proceed to next step

    } catch (err) {
        // Need to be better for Enterprise level application
        res.status(500).json({error: err.message})
    }
}
export default verifyToken;