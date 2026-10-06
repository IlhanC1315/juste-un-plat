const mongoose = require('mongoose');

const UserFollowers = new mongoose.Schema({
    followersImage: {
        type: String
    },
    followersName: {
        type: String
    }
})

module.exports = mongoose.model('Followers', UserFollowers)
