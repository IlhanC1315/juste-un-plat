const User = require('../models/UserSchema')
const bcrypt = require('bcryptjs')

exports.createUser = async (data) => {
    const { password, ...rest } = data;
    // sépare le mot de passe du reste des données
    const salt = await bcrypt.genSalt(10);
    // génère une valeur aleatoire puis ajouter au mot de passe avant de hasher
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = new User({ ...rest, password: hashedPassword });
    return await user.save();
};

exports.getAllUsers = async () => {
    return await User.find().select("-password");
};

exports.getUserByEmail = async (email) => {
    return await User.findOne({ email });
}

exports.getUserById = async (id) => {
    const user = await User.findById(id).select("-password");
    if (!user) throw new Error('Utilisateur introuvable')
    return user;
};

exports.getUserByUsername = async (username) => {
    const user = await User.findOne({ username }).select("-password");
    if (!user) throw new Error('Utilisateur introuvable')
    return user
};

exports.getUserByAlias = async (alias) => {
    const user = await User.findOne({ alias }).select("-password");
    if (!user) throw new Error('Utilisateur introuvable')
    return user
};

exports.updateManyUsers = async (filter, updateData) => {
    const result = await User.updateMany(filter, updateData);
    return result
};

exports.updateUserById = async (userId, updateData) => {
    const result = await User.findByIdAndUpdate(userId, updateData)
    return result
};

exports.updateUserByEmail = async (email, updateData) => {
    const user = await User.findOneAndUpdate(
        { email },
        updateData,
        {
            new: true,
            runValidators: true
        }
    );
    if (!user) {
        throw new Error('Utilisateur introuvable')
    }
    return user
};

exports.updateUserByAlias = async (alias, updateData) => {
    const user = await User.findOneAndUpdate(
        { alias },
        updateData,
        {
            new: true,
            runValidators: true
        }
    );
    if (!user) {
        throw new Error('Utilisateur introuvable')
    }
    return user
};

exports.updateUserField = async (userId, field, value) => {
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { [field]: value },
        { new: true, runValidators: true }
    );
    if (!updatedUser) throw new Error('Utilisateur non trouvé');
    return updatedUser;
};

exports.deleteUserById = async (userId) => {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
        throw new Error('Utilisateur non trouvé');
    }
    return user;
};

exports.deleteManyUsersByField = async (field, values) => {
    if (!Array.isArray(values) || values.length === 0) {
        throw new Error("Liste invalide");
    }
    const result = await User.deleteMany({ [field]: { $in: values } })
    if (result.deletedCount === 0) {
        throw new Error(`Aucun utilisateur trouvé à supprimer par ${field}`);
    }
    return result;
};

exports.desactivateUser = async (userId) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { isActive: false },
        { new: true }
    )
    if (!user) throw new Error('Utilisateur non trouvé');
    return user;
};

exports.reactiveUser = async (userId) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { isActive: true },
        { new: true }
    )
    if (!user) throw new Error('Utilisateur non trouvé');
    return user;
};

exports.updateUserRole = async (userId, newRole) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { role: newRole },
        { new: true }
    )
    if (!user) throw new Error('Utilisateur non trouvé');
    return user
};

exports.searchUsers = async (query) => {
    return await User.find({
        $or: [
            { userName: { $regex: query, $options: 'i' } },
            { alias: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } }
        ],
        isActive: true
    });
};