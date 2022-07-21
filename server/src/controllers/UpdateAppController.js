import { App } from "../models/index.js";

const UpdateAppController = async (req, res) => {
    const { authUserId, targetApp } = req;
    const { appId } = req.params;
    const { appname, description } = req.body;

    try {
        const status = await App.update(
            {
                appname,
                description,
            },
            {
                where: {
                    id: appId,
                },
            }
        );

        let updatedApp = null;
        if (status) {
            updatedApp = await App.findOne({
                where: {
                    id: appId,
                },
            });
        }

        res.status(200).send({
            status,
            updatedApp,
        });
    } catch (error) {
        res.status(500).send({ error: `${error.message}` });
    }
};

export default UpdateAppController;
