// import { App } from "../models/index.js";

const FetchAppController = async (req, res) => {
    // const { appId } = req.params;

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

    res.status(200).send(req.targetApp);
};

export default FetchAppController;
