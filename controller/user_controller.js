var bcrypt = require('bcryptjs');
const { Validator } = require('node-input-validator');
var jwt = require('jsonwebtoken');
var User = require("../schemas/user_schema");

exports.signup = async (req, res) => {
    const v = new Validator(req.body, {
        email: 'required|email',
        firstname: 'required',
        lastname: 'required',
        password: 'required|same:confirm_password',
        gender: 'required'
    });

    let match = await v.check();
    if (!match) {
        return res.status(400).json({
            status: "Error",
            statusCode: 400,
            message: v.errors
        })
    }

    let url = req.headers.host + "/public/uploads/" + req.file.filename;

    var salt = bcrypt.genSaltSync(10);
    var hash_password = bcrypt.hashSync(req.body.password, salt);

    let user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash_password,
        image: url,
        gender: req.body.gender
    });

    let data = await user.save();

    return res.status(200).json({
        status: "Success",
        statusCode: 200,
        message: "User Signup successfully",
        data: data
    })
}

exports.signin = async (req, res) => {
    const v = new Validator(req.body, {
        email: 'required|email',
        password: 'required',
    });

    let match = await v.check();
    if (!match) {
        return res.status(400).json({
            status: "Error",
            statusCode: 400,
            message: v.errors
        })
    }

    let user = await User.find({ email: req.body.email });
    if (!user) {
        return res.status(400).json({
            status: "Error",
            statusCode: 400,
            message: "No user found",
        })
    }

    let password = bcrypt.compareSync(req.body.password, user[0].password);
    if (!password) {
        return res.status(400).json({
            status: "Error",
            statusCode: 400,
            message: "Email and password do not match",
        })
    }

    var token = jwt.sign(
        { _id: user[0]._id, email: user[0].email },
        process.env.SECRET,
    );

    req.userId = user[0]._id;

    return res.status(200).json({
        status: "Success",
        statusCode: 200,
        message: "User Signin successfully",
        data: {
            token: token,
            user: user[0]
        }
    });
}