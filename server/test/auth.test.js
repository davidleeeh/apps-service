import { assert } from "chai";
import request from "supertest";
import validator from "validator";
import { sequelize } from "../src/models/index.js";
import app from "../src/server.js";
import { signUpUser } from "./testutils.js";

const DefaultUser = {
    username: "default-user",
    password: "password",
};

beforeEach(function (done) {
    (async () => {
        await sequelize.sync({ force: true });
        await signUpUser(DefaultUser.username, DefaultUser.password);
        await done();
    })().then(() => {});
});

describe("POST /auth/signup", function () {
    it("Sign up should return JSON with username and access token.", function (done) {
        request(app)
            .post("/auth/signup")
            .set("Accept", "application/json")
            .send({
                username: "user-1",
                password: "password",
            })
            .expect("Content-Type", /json/)
            .expect(200)
            .end(function (err, res) {
                const { username, accessToken } = res.body;
                assert.equal(username, "user-1");
                assert.isTrue(validator.isJWT(accessToken));
                return done();
            });
    });

    it("Sign up with empty request body should return response with status code 400", function (done) {
        request(app)
            .post("/auth/signup")
            .set("Accept", "application/json")
            .send()
            .expect("Content-Type", /json/)
            .expect(400, done);
    });

    it("Sign up without providing valid username and password should return response with status code 400", function (done) {
        // Missing entire body
        request(app)
            .post("/auth/signup")
            .set("Accept", "application/json")
            .send()
            .expect("Content-Type", /json/)
            .expect(400);

        // Missing username
        request(app)
            .post("/auth/signup")
            .set("Accept", "application/json")
            .send({
                password: "password",
            })
            .expect("Content-Type", /json/)
            .expect(400);

        // Missing password
        request(app)
            .post("/auth/signup")
            .set("Accept", "application/json")
            .send({
                username: "my-user",
            })
            .expect("Content-Type", /json/)
            .expect(400);

        // Username is empty string
        request(app)
            .post("/auth/signup")
            .set("Accept", "application/json")
            .send({
                username: "",
                password: "password",
            })
            .expect("Content-Type", /json/)
            .expect(400);

        // Username is null
        request(app)
            .post("/auth/signup")
            .set("Accept", "application/json")
            .send({
                username: null,
                password: "password",
            })
            .expect("Content-Type", /json/)
            .expect(400);

        // Password is empty string
        request(app)
            .post("/auth/signup")
            .set("Accept", "application/json")
            .send({
                username: "my-user",
                password: "",
            })
            .expect("Content-Type", /json/)
            .expect(400);

        // Password is null
        request(app)
            .post("/auth/signup")
            .set("Accept", "application/json")
            .send({
                username: "my-user",
                password: null,
            })
            .expect("Content-Type", /json/)
            .expect(400);

        done();
    });

    // it("Sign up without providing password should return response with status code 400", function (done) {
    //     request(app)
    //         .post("/auth/signup")
    //         .set("Accept", "application/json")
    //         .send({
    //             username: "my-user",
    //         })
    //         .expect("Content-Type", /json/)
    //         .expect(400, done);
    // });

    // it("Sign up empty username or password should return response with status code 400", function (done) {
    //     request(app)
    //         .post("/auth/signup")
    //         .set("Accept", "application/json")
    //         .send({
    //             username: "",
    //         })
    //         .expect("Content-Type", /json/)
    //         .expect(400, done);

    //     request(app)
    //         .post("/auth/signup")
    //         .set("Accept", "application/json")
    //         .send({
    //             username: null,
    //         })
    //         .expect("Content-Type", /json/)
    //         .expect(400, done);
    // });

    // it("Sign up with an existing username should return response with status code 400", async function () {
    //     await request(app)
    //         .post("/auth/signup")
    //         .set("Accept", "application/json")
    //         .send({
    //             username: "my-user",
    //             password: "password",
    //         });

    //     const response = await request(app)
    //         .post("/auth/signup")
    //         .set("Accept", "application/json")
    //         .send({
    //             username: "my-user",
    //             password: "password",
    //         });

    //     assert.equal(response.status, 400);
    // });
});

describe("POST /auth/signin", function () {
    it("Sign in with valid credentials should return an access token", async function () {
        const response = await request(app)
            .post("/auth/signin")
            .set("Accept", "application/json")
            .send({
                username: "default-user",
                password: "password",
            });

        assert.equal(response.status, 200);
        const { username, accessToken } = response.body;
        assert.equal(username, "default-user");
        assert.isTrue(validator.isJWT(accessToken));
    });

    it("Sign in with invalid password should return status code 401", function (done) {
        request(app)
            .post("/auth/signin")
            .set("Accept", "application/json")
            .send({
                username: "default-user",
                password: "wrongpassword",
            })
            .expect(401, done);
    });

    it("Sign in with non-existing username should return status code 404", function (done) {
        request(app)
            .post("/auth/signin")
            .set("Accept", "application/json")
            .send({
                username: "no-such-user",
                password: "password",
            })
            .expect(404, done);
    });

    it("Sign in with empty request body should return response with status code 400", function (done) {
        request(app)
            .post("/auth/signin")
            .set("Accept", "application/json")
            .send()
            .expect("Content-Type", /json/)
            .expect(400, done);
    });

    it("Sign in without providing username should return response with status code 400", function (done) {
        request(app)
            .post("/auth/signin")
            .set("Accept", "application/json")
            .send({
                password: "password",
            })
            .expect("Content-Type", /json/)
            .expect(400, done);
    });

    it("Sign up without providing password should return response with status code 400", function (done) {
        request(app)
            .post("/auth/signin")
            .set("Accept", "application/json")
            .send({
                username: "my-user",
            })
            .expect("Content-Type", /json/)
            .expect(400, done);
    });
});
