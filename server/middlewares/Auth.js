const jwt = require('jsonwebtoken');

const Auth = async (req, res, next) => {
    try {
        const token = req.headers['x-auth-token'];
        if (!token) {
            return res.status(400).json({
                message: "Missing auth token"
            })
        }
        const jwtToken = jwt.verify(token, 'siliconMERNCourse');
        console.log('JWT token: ', jwtToken);
        if (jwtToken) {
            next();
        } else {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        console.log(req.headers['x-auth-token']);
        console.log('Request:', req.body);
    } catch (err) {
        res.status(500).json({
            message: "Unauthorized",
            error: err.message
        })
    }
}

module.exports = Auth