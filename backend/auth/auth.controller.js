const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userService = require('../services/userService');

exports.login = async (req, res ,next) => {
    try {
        const { email, password } = req.body; //je recupere l'email et le mdp sur le body de ma page
        const user = await userService.getUserByEmail(email); //je trouve le compte grace a l'email

        if(!user) return res.status(404).json({ msg: "Utilisateur introuvable"}); //si user ne trouve rien alors il n'existe pas 
        if(!user.isActive) return res.status(403).json({ msg: "Compte désactivé" }); //si il est pas active donc ban alors compte desac

        const isMatch = await bcrypt.compare(password, user.password); //je compare ensuite le mdp recu et celui du user que j'ai recup pour voir si tout est bon
        if(!isMatch) return res.status(401).json({ msg: "Mot de passe incorrect" }); //si ce n'est pas bon alors je renvoie une erreur
        
        const playload = {  //ca sert a stocker les données de user qui s'est co 
            id: user._id,
            email: user.email,
            role: user.role
        }

        const token = jwt.sign(playload, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.status(200).json({ token });
    } catch (err) {
        next(err)
    }
}