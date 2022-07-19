import { App } from "../models/index.js";

const UpdateAppController = async (req, res) => {
    const { authUserId, targetApp } = req;
    const { appId } = req.params;
    const { description } = req.body;

    try {
        // const match = await App.findOne({
        //     where: {
        //         id: appId,
        //     },
        // });

        // if (!match) {
        //     return res.status(404).send({
        //         message: `App with ID ${appId} does not exist.`,
        //     });
        // }

        if (targetApp.ownerId !== authUserId) {
            return res.status(401).send({
                message: `User with ID ${authUserId} is not the owner of this app`,
            });
        }

        const result = await App.update(
            {
                description,
            },
            {
                where: {
                    id: appId,
                },
            }
        );

        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: `${error.message}` });
    }
};

export default UpdateAppController;
