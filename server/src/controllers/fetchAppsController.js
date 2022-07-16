import { App } from "../models/index.js";

const FetchAppsController = async (req, res) => {
    const apps = await App.findAll();

    res.status(200).send(apps);
};

export default FetchAppsController;
