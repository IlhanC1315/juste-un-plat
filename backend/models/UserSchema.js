const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    alias: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    profileImage: {
        type: String,
        default: "assets/images/default-profile.png"
    },
    description: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: { type: mongoose.Schema.Types.ObjectId ,ref:'Gender' },
    dateOfBirth: {
        type: Date,
        required: true
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref:'Followers' }],
    followersLength: {
        type: Number
    },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref:'Following' }],
    followingLength: {
        type: Number
    },
    recipeListe: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserRecipeList" }],
    userUrl: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
    }
});

module.exports = mongoose.model('User', UserSchema);
