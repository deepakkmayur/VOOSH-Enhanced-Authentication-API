const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String },
    bio: { type: String },
    phone: { type: String },
    photoUrl: { type: String },
    isPublic: { type: Boolean, default: true }
});

module.exports = mongoose.model('Profile', profileSchema);
