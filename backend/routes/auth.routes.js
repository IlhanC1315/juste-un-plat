const express = require('express');
const router = express.Router();
const authController = require('../auth/auth.controller');
const passport = require('passport');


router.post('/login', authController.login);

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;
