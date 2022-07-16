import jwt from "jsonwebtoken";
import "dotenv/config";

const jwtAuth = async (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).send({
            message: `No authorization header`,
        });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({
                message: `Invalid token`,
            });
        }

        req.authUserId = decoded.userId;
        req.authUsername = decoded.username;
        next();
    });
};

export default jwtAuth;
