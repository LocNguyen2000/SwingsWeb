const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try{
         //Extract Authorization Token
        const token = req.headers["auth-token"];
        const decoded = jwt.verify(token, 'mysecretkey');
        console.log(decoded);
        if (!decoded){
            res.status(401).json({
                error: "Invalid Token"
            })
        }
        req.user = decoded
        next();
    }catch(error){
        res.status(500).json({
            error: error
        });
    }
}

module.exports = authenticate;