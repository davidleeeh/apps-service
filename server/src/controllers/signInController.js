import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils/index.js";

const SignInController = async (req, res) => {
    const { username, password } = req.body;

    if (username === undefined || password === undefined) {
        return res.status(400).send({
            error: "Both username and password are required for sign-in.",
        });
    }

    try {
        const match = await User.findOne({
            where: {
                username: username,
            },
        });

        if (!match) {
            return res.status(404).send({
                error: `Username ${username} does not exist.`,
            });
        }

        const isValidPassword = await bcrypt.compare(password, match.password);
        if (!isValidPassword) {
            return res.status(401).send({
                error: `Invalud password`,
            });
        }

        const token = generateAccessToken(match.id, match.username);

        res.status(200).send({
            id: match.id,
            username: match.username,
            createAt: match.createAt,
            accessToken: token,
        });
    } catch (error) {
        res.status(500).send({ error: `${error.message}` });
    }
};

export default SignInController;
