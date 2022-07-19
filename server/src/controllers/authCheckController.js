const AuthCheckController = async (req, res) => {
    const { authUserId, authUsername } = req;

    return res.status(200).send({
        authUserId,
        authUsername,
    });
};

export default AuthCheckController;
