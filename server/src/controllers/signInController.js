import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils/index.js";

const SignInController = async (req, res) => {
    const { username, password } = req.body;

    try {
        const match = await User.findOne({
            where: {
                username: username,
            },
        });

        if (!match) {
            return res.status(404).send({
                accessToken: null,
                message: `Username ${username} does not exist.`,
            });
        }

        const isValidPassword = await bcrypt.compare(password, match.password);
        if (!isValidPassword) {
            return res.status(401).send({
                accessToken: null,
                message: `Invalud password`,
            });
        }

        const token = generateAccessToken(match.id, match.username);

        res.status(200).send({
            id: match.id,
            username: match.username,
            email: match.email,
            createAt: match.createAt,
            accessToken: token,
        });
    } catch (error) {
        res.status(500).send({ error: `${error.message}` });
    }
};

export default SignInController;
