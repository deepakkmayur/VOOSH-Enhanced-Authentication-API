const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bio: { type: String,required: [true,"bio is required"]},
    phone: { type: String,required: [true,"phone is required"]},
    photoUrl: { type: String },
    isPublic: { type: Boolean, default: true } 
});

module.exports = mongoose.model('Profile', profileSchema);
  






