const mongoose = require('mongoose');

const UserFollowingSchema = new mongoose.Schema({
    followingImage: {
        type: String
    },
    followingName: {
        type: String
    }
});

module.exports = mongoose.model('Following', UserFollowingSchema)