import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils/index.js";

const SignUpController = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const match = await User.findOne({
            where: {
                username: username,
            },
        });

        if (match) {
            return res.status(400).send({
                message: `Username ${username} already exists.`,
            });
        }

        const newUser = await User.create({
            username,
            password: bcrypt.hashSync(password),
            email,
        });

        const token = generateAccessToken(newUser.id, newUser.username);

        res.status(200).send({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            createAt: newUser.createAt,
            accessToken: token,
        });
    } catch (error) {
        res.status(500).send({ error: `${error.message}` });
    }
};

export default SignUpController;
