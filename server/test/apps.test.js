import { assert } from "chai";
import request from "supertest";
import { sequelize } from "../src/models/index.js";
import app from "../src/server.js";
import { createApp, getApp, signInUser, signUpUser } from "./testutils.js";

const DefaultUser = {
    username: "default-user",
    password: "password",
};

beforeEach(function (done) {
    (async () => {
        await sequelize.sync({ force: true });
        await signUpUser(DefaultUser.username, DefaultUser.password);
        await done();
    })();
});

describe("POST /apps", function () {
    it("Endpoint should return 200 upon valid request.", async function () {
        const signInResponse = await signInUser(
            DefaultUser.username,
            DefaultUser.password
        );
        const { accessToken } = signInResponse.body;

        const appResponse = await request(app)
            .post("/apps")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                appname: "Awesome App",
                description:
                    "This is the second most awesome app in the store. It was released last. week.",
            });

        assert.equal(appResponse.status, 200);
        assert.isObject(appResponse.body);

        const { appname } = appResponse.body;
        assert.equal(appname, "Awesome App");
    });

    it("Endpoint requires appname in the request body", async function () {
        const signInResponse = await signInUser(
            DefaultUser.username,
            DefaultUser.password
        );
        const { accessToken } = signInResponse.body;

        const appResponse = await request(app)
            .post("/apps")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                description:
                    "This is the second most awesome app in the store. It was released last. week.",
            });

        assert.equal(appResponse.status, 400);
    });

    it("Appname cannot be null", async function () {
        const signInResponse = await signInUser(
            DefaultUser.username,
            DefaultUser.password
        );
        const { accessToken } = signInResponse.body;

        const appResponse = await request(app)
            .post("/apps")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                appname: null,
            });

        assert.equal(appResponse.status, 400);
    });

    it("Endpoint should return 401 if no authorization header is provided.", function (done) {
        request(app)
            .post("/apps")
            .set("Accept", "application/json")
            .send({
                appname: "Awesome App",
                description:
                    "This is the second most awesome app in the store. It was released last. week.",
            })
            .expect(401, done);
    });

    it("Endpoint should return 403 if access token is invalid.", function (done) {
        request(app)
            .post("/apps")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer some-invalid-access-token`)
            .send({
                appname: "Awesome App",
                description:
                    "This is the second most awesome app in the store. It was released last. week.",
            })
            .expect(403, done);
    });

    it("Endpoint allows duplucate appnames", async function () {
        const signInResponse = await signInUser(
            DefaultUser.username,
            DefaultUser.password
        );
        const { accessToken } = signInResponse.body;

        await request(app)
            .post("/apps")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                appname: "Awesome App",
                description: "This is an awesome app",
            });

        const appResponse = await request(app)
            .post("/apps")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                appname: "Awesome App",
                description: "This is another awesome app",
            });

        assert.equal(appResponse.status, 200);
        assert.isObject(appResponse.body);

        const { appname } = appResponse.body;
        assert.equal(appname, "Awesome App");
    });
});

describe("GET /apps", function () {
    it("Endpoint should return existing apps", async function () {
        const signInResponse = await signInUser(
            DefaultUser.username,
            DefaultUser.password
        );
        const { accessToken } = signInResponse.body;

        await createApp(accessToken, "test-app");

        const appResponse = await request(app)
            .get("/apps")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${accessToken}`);

        const { status, body } = appResponse;
        assert.equal(status, 200);

        assert.isArray(body);
        assert.equal(body.length, 1);
        assert.equal(body[0].appname, "test-app");
    });

    it("Endpoint should return 401 if no authorization header is provided.", function (done) {
        request(app)
            .get("/apps")
            .set("Accept", "application/json")
            .expect(401, done);
    });

    it("Endpoint should return 403 if access token is invalid.", function (done) {
        request(app)
            .get("/apps")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer some-invalid-access-token`)
            .expect(403, done);
    });
});

describe("GET /apps/:appId", function () {
    let defaultAppId;
    beforeEach(async function () {
        const signInResponse = await signInUser(
            DefaultUser.username,
            DefaultUser.password
        );
        const { accessToken } = signInResponse.body;

        const createResponse = await createApp(accessToken, "test-app");
        defaultAppId = createResponse.body.id;
    });

    it("Endpoint should return app info if requested app exists", async function () {
        const signInResponse = await signInUser(
            DefaultUser.username,
            DefaultUser.password
        );
        const { accessToken } = signInResponse.body;

        const appResponse = await request(app)
            .get(`/apps/${defaultAppId}`)
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${accessToken}`);

        const { status, body } = appResponse;
        assert.equal(status, 200);

        assert.isObject(body);
        assert.equal(body.id, defaultAppId);
        assert.equal(body.appname, "test-app");
    });

    it("Endpoint should return 404 if requested app does not exist", async function () {
        const signInResponse = await signInUser(
            DefaultUser.username,
            DefaultUser.password
        );
        const { accessToken } = signInResponse.body;

        const appResponse = await request(app)
            .get(`/apps/100`)
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${accessToken}`);

        const { status } = appResponse;
        assert.equal(status, 404);
    });

    it("Endpoint should return 401 if no authorization header is provided.", function (done) {
        request(app)
            .get(`/apps/${defaultAppId}`)
            .set("Accept", "application/json")
            .expect(401, done);
    });

    it("Endpoint should return 403 if access token is invalid.", function (done) {
        request(app)
            .get(`/apps/${defaultAppId}`)
            .set("Accept", "application/json")
            .set("Authorization", `Bearer some-invalid-access-token`)
            .expect(403, done);
    });
});

describe("PUT /apps/:appId", function () {
    let defaultAppId;
    beforeEach(async function () {
        const signInResponse = await signInUser(
            DefaultUser.username,
            DefaultUser.password
        );
        const { accessToken } = signInResponse.body;

        const createResponse = await createApp(
            accessToken,
            "test-app",
            "Test app description"
        );
        defaultAppId = createResponse.body.id;
    });

    it("Endpoint should properly update the app info upon valid request.", async function () {
        const signInResponse = await signInUser(
            DefaultUser.username,
            DefaultUser.password
        );
        const { accessToken } = signInResponse.body;

        const updateResponse = await request(app)
            .put(`/apps/${defaultAppId}`)
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                appname: "New App Name",
                description: "New description!",
            });

        assert.equal(updateResponse.status, 200);

        const getResponse = await getApp(accessToken, defaultAppId);
        const { body } = getResponse;

        assert.isObject(body);
        assert.equal(body.id, defaultAppId);
        assert.equal(body.appname, "New App Name");
        assert.equal(body.description, "New description!");
    });

    it("Endpoint should return 404 if requested app does not exist", async function () {
        const signInResponse = await signInUser(
            DefaultUser.username,
            DefaultUser.password
        );
        const { accessToken } = signInResponse.body;

        const updateResponse = await request(app)
            .put(`/apps/100`)
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                appname: "New App Name",
            });

        assert.equal(updateResponse.status, 404);
    });

    it("Endpoint should return 401 if no authorization header is provided.", function (done) {
        request(app)
            .put(`/apps/${defaultAppId}`)
            .set("Accept", "application/json")
            .send({
                appname: "New App Name",
            })
            .expect(401, done);
    });

    it("Endpoint should return 403 if access token is invalid.", function (done) {
        request(app)
            .put(`/apps/${defaultAppId}`)
            .set("Accept", "application/json")
            .set("Authorization", `Bearer some-invalid-access-token`)
            .send({
                appname: "New App Name",
            })
            .expect(403, done);
    });

    it("App name cannot be null or empty string", async function () {
        const signInResponse = await signInUser(
            DefaultUser.username,
            DefaultUser.password
        );
        const { accessToken } = signInResponse.body;

        const updateResponse = await request(app)
            .put(`/apps/${defaultAppId}`)
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                appname: null,
            });

        assert.equal(updateResponse.status, 400);

        const updateResponse2 = await request(app)
            .put(`/apps/${defaultAppId}`)
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                appname: "",
            });

        assert.equal(updateResponse2.status, 400);
    });
});
