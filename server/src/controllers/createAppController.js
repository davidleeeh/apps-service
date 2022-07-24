import { App } from "../models/index.js";

const CreateAppController = async (req, res) => {
    const { authUserId } = req;
    const { appname, description } = req.body;

    if (!appname) {
        return res.status(400).send({
            error: "Appname is required.",
        });
    }

    try {
        const newApp = await App.create({
            appname,
            description: description || "",
            ownerId: authUserId,
        });

        res.status(200).send(newApp);
    } catch (error) {
        res.status(500).send({ error: `${error.message}` });
    }
};

export default CreateAppController;
