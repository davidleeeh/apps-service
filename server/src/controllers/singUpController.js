import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils/index.js";

const SignUpController = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({
            message: "Both username and password are required.",
        });
    }

    try {
        const match = await User.findOne({
            where: {
                username: username,
            },
        });

        if (match) {
            return res.status(400).send({
                error: `Username ${username} already exists.`,
            });
        }

        const newUser = await User.create({
            username,
            password: bcrypt.hashSync(password),
        });

        const token = generateAccessToken(newUser.id, newUser.username);

        res.status(200).send({
            id: newUser.id,
            username: newUser.username,

            createAt: newUser.createAt,
            accessToken: token,
        });
    } catch (error) {
        res.status(500).send({ error: `${error.message}` });
    }
};

export default SignUpController;
