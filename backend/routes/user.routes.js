const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');
const uploadUserImage = require('../middlewares/uploadUserImage');

// Création
router.post('/', userController.create);

// Lecture
router.get('/', userController.getAll);
router.get('/search', userController.searchUsers); // ?query=...

// Récupération spécifique par champ
router.get('/id/:id', userController.getById);
router.get('/email/:email', userController.getByEmail);
router.get('/username/:username', userController.getByUsername);
router.get('/alias/:alias', userController.getByAlias);

// Mises à jour
router.put('/update-many', userController.updateManyUsers);
router.put('/update/id/:id', userController.updateUserById);
router.put('/update/email/:email', userController.updateUserByEmail);
router.put('/update/alias/:alias', userController.updateUserByAlias);
router.put('/update-field/:id', userController.updateUserByField);

// Suppressions
router.delete('/delete/id/:id', userController.deleteUserById);
router.delete('/delete-field', userController.deleteManyByField); // utilise body pour `field` et `values`

// Actions spécifiques
router.put('/ban/:id', userController.banUser);
router.put('/unban/:id', userController.unbanUser);
router.put('/role/:id', userController.changeUserRole);
router.put(
  '/upload-profile/:id',
  uploadUserImage.single('profileImage'), // <--- Multer s'occupe du fichier envoyé
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Aucune image envoyée" });
      }

      // Met à jour le champ `profileImage` du user avec le chemin du fichier
      const updatedUser = await userController.updateUserByFieldDirect(
        req.params.id,
        "profileImage",
        `/uploads/users/${req.file.filename}`
      );

      res.status(200).json({
        message: "Image de profil mise à jour avec succès",
        user: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
