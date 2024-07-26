const admin = require('firebase-admin');
const firebaseConfig = require('./firebaseConfig');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    ...firebaseConfig
});

module.exports = admin;
