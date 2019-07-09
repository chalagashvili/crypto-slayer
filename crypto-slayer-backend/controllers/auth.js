import utils from '../services/utility';
const UserSchema = require('../models').userSchema;

export function signIn(req, res) {
  return res.status(200).send({
    token: utils.tokenForUser(req.user),
    email: req.user.email
  });
}

export function signUp(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  if (email == null || !utils.validateEmail(email)) {
    return res.status(422).send({ error: 'Please provide valid email' });
  }
  if (password == null || password.length < 6) {
    return res
      .status(422)
      .send({ error: 'Password must contain at least 6 characters!' });
  }
  UserSchema.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      return res.status(500).send({ error: 'database error' });
    }
    if (existingUser) {
      return res.status(422).send({ error: 'Email is already used' });
    }
    const user = new UserSchema({
      email,
      password
    });
    user.save(err => {
      if (err) {
        return next(err);
      }
      return res.json({ token: utils.tokenForUser(user) });
    });
  });
}
