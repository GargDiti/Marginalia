const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({ name: { type: String, required: true, trim: true, maxlength: 80 }, email: { type: String, required: true, unique: true, lowercase: true, trim: true }, password: { type: String, required: true, minlength: 8, select: false }, bio: { type: String, trim: true, maxlength: 500, default: '' }, avatar: { type: String, default: '' }, website: { type: String, default: '' }, socials: { type: Map, of: String, default: {} }, accent: { type: String, default: '#e8590c' }, theme: { type: String, enum: ['light', 'dark'], default: 'light' } }, { timestamps: true });
userSchema.pre('save', async function () { if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 10); });
userSchema.methods.comparePassword = function (plain) { return bcrypt.compare(plain, this.password); };
module.exports = mongoose.model('User', userSchema);
