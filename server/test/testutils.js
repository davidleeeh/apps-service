import request from "supertest";
import app from "../src/server.js";

function signUpUser(username, password) {
    return request(app)
        .post("/auth/signup")
        .set("Accept", "application/json")
        .send({
            username,
            password,
        });
}

function signInUser(username, password) {
    return request(app)
        .post("/auth/signin")
        .set("Accept", "application/json")
        .send({
            username,
            password,
        });
}

function createApp(accessToken, appname, description = "") {
    return request(app)
        .post("/apps")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
            appname,
            description,
        });
}

function getApp(accessToken, appId) {
    return request(app)
        .get(`/apps/${appId}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
}

export { signUpUser, signInUser, createApp, getApp };
