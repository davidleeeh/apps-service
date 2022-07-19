import { App } from "../models/index.js";

const CreateAppController = async (req, res) => {
    const { authUserId } = req;
    const { appname, description } = req.body;

    try {
        const newApp = await App.create({
            appname,
            description,
            ownerId: authUserId,
        });

        res.status(200).send({
            appname: newApp.appname,
            id: newApp.id,
            createdAt: newApp.createdAt,
        });
    } catch (error) {
        res.status(500).send({ error: `${error.message}` });
    }
};

export default CreateAppController;
