import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String },
  createdAt: { type: Date, default: new Date() },
  assets: [{ type: Schema.Types.ObjectId, ref: 'Asset' }]
});

// Pre-save hook for hashing + salting with password
userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Compare provided password with salted one
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

userSchema.plugin(mongoosePaginate);
const user = mongoose.model('User', userSchema);

module.exports = user;
