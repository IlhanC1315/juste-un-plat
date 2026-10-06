const userService = require('../services/userService');

exports.create = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await userService.getUserByEmail(email)
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déja utilisé.' })
    }
    const userData = {
      ...req.body,
      profileImage: req.file ? `/uploads/users/${req.file.filename}` : null,
    };
    const user = await userService.createUser(userData);
    const { password, ...safeUser } = user.toObject();
    res.status(201).json({
      message: 'Utilisateur créé avec succés.',
      user: safeUser
    });
  } catch (err) {
    next(err);
  }
}

exports.getAll = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers()
    res.json(users);
  } catch (err) {
    next(err);
  }
}

exports.getByEmail = async (req, res, next) => {
  try {
    const user = await userService.getUserByEmail(req.params.email);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user)
  } catch (err) {
    next(err);
  }
};

exports.getByUsername = async (req, res, next) => {
  try {
    const user = await userService.getUserByUsername(req.params.username)
    res.json(user)
  } catch (err) {
    next(err);
  }
};

exports.getByAlias = async (req, res, next) => {
  try {
    const user = await userService.getUserByAlias(req.params.alias)
    res.json(user)
  } catch (err) {
    next(err);
  }
};


exports.updateManyUsers = async (req, res, next) => {
  try {
    const { filter, updateData } = req.body;
    const result = await userService.updateManyUsers(filter, updateData);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updateData = {
      ...req.body
    };
    if (req.file) {
      updateData.profileImage = `/uploads/users/${req.file.filename}`;
    }
    const result = await userService.updateUserById(userId, updateData);
    res.json(result);
  } catch (err) {
    next(err)
  }
};

exports.updateUserByEmail = async (req, res, next) => {
  try {
    const email = req.params.email;
    const { updateData } = req.body;
    const result = await userService.updateUserByEmail(email, updateData);
    res.json(result);
  } catch (err) {
    next(err)
  }
};

exports.updateUserByAlias = async (req, res, next) => {
  try {
    const alias = req.params.alias;
    const { updateData } = req.body;
    const result = await userService.updateUserByAlias(alias, updateData)
    res.json(result)
  } catch (err) {
    next(err)
  }
};

exports.updateUserByField = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { field, values } = req.body
    const result = await userService.updateUserField(userId, field, values)
    res.json(result)
  } catch (err) {
    next(err)
  }
};

exports.deleteUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const result = await userService.deleteUserById(userId);
    res.json(result)
  } catch (err) {
    next(err)
  }
};
exports.deleteManyByField = async (req, res, next) => {
  try {
    const { field, values } = req.body;

    if (!field || !Array.isArray(values)) {
      return res.status(400).json({ message: 'Champ ou liste de valeurs manquante ou invalide' });
    }

    const result = await userService.deleteManyUsersByField(field, values);
    res.status(200).json({ message: `${result.deletedCount} utilisateur(s) supprimé(s)` });
  } catch (err) {
    next(err);
  }
};

exports.banUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const result = await userService.desactivateUser(userId);
    res.json(result)
  } catch (err) {
    next(err)
  }
};

exports.unbanUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const result = await userService.reactiveUser(userId);
    res.json(result);
  } catch (err) {
    next(err)
  }
};

exports.changeUserRole = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { newRole } = req.body;
    const result = await userService.updateUserRole(userId, newRole);
    res.json(result);
  } catch (err) {
    next(err)
  }
};

exports.searchUsers = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Requête de recherche vide" });
    };
    const users = await userService.searchUsers(query);
    res.status(200).json(users);
  } catch (err) {
    next(err)
  }
};

exports.updateUserByFieldDirect = async (userId, field, value) => {
  const user = await userService.updateUserField(userId, field, value);
  return user;
};
