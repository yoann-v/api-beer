const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // récupére le token
        const token = req.headers.authorization.split(' ')[1];
        // Vérifie le token par rapport à la clé secrete
        const decodedToken = jwt.verify(token, 'CLE_SECRET_BEERS');
        // Ajoute le token à userID
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
    next();
    } catch(error) {
        res.status(403).json({ message: "Non-autorisé" });
    }
}