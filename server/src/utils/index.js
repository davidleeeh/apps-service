import jwt from "jsonwebtoken";
import "dotenv/config";

const generateAccessToken = (userId, username) => {
    console.log(`Secret: ${process.env.JWT_SECRET}`);
    return jwt.sign({ userId, username }, process.env.JWT_SECRET, {
        expiresIn: 3600,
    });
};

export { generateAccessToken };
