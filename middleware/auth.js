var jwt = require('jsonwebtoken');

exports.isSignedIn = async (req, res, next) => {
    let token;
    let bearer = req.headers['authorization'];
    if (bearer) {
        token = bearer.split(" ")[1];
    } else {
        return res.status(401).json({
            status: "Error",
            statusCode: 401,
            message: "Unauthorized"
        })
    }
    jwt.verify(token, process.env.SECRET);
    next();
}