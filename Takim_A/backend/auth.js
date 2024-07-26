const express = require('express');
const admin = require('./firebaseAdmin');
const router = express.Router();

// Kullanıcı kimlik doğrulamasını kontrol eden middleware
const checkAuth = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send('Yetkisiz');
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).send('Yetkisiz');
    }
};

router.post('/protected', checkAuth, (req, res) => {
    res.send('Gizli bilgi');
});

module.exports = router;
