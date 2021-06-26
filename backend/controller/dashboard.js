exports.login = function (req, res) {
    if(req.body.email != 'test@opslyft.com' || req.body.password != 'test123'){
        res.send({
            statusCode: 401, // for unauthorized access
            statusMessage: "Email or password is not correct"
        });
    }
    res.json({
        token: 'testToken',
        statusCode: 200,
        statusMessage: "LoggedIn Successfully"
    });
}; 