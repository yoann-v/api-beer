const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.header.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'CLE_SECRET_BEERS');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
    } catch(error) {
        res.status(401).json({ error });
    }
}