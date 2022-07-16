import { App } from "../models/index.js";

const queryTargetApp = async (req, res, next) => {
    const { appId } = req.params;

    if (!appId) {
        return res.status(401).send({
            message: `No appId is provided`,
        });
    }

    const match = await App.findOne({
        where: {
            id: appId,
        },
    });

    if (!match) {
        return res.status(404).send({
            message: `App with ID ${appId} does not exist.`,
        });
    }

    req.targetApp = match;
    next();
};

export default queryTargetApp;
