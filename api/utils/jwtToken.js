// Create and send the token and save in the cookie
const sendToken = (user, statusCode, res) => {
    // Create Jwt token
    const token = user.getJwtToken();

    // Options for cookie
    const options = {
        expires: new Date(
            Date.now() +
                process.env.COOKIE_EXPIRATION_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true,
        sameSite: "none",
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
        user,
        message: "Login Successfully",
    });
};

module.exports = sendToken;
