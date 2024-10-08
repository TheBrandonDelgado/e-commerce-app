var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
const { pool } = require('./pool');

passport.use(new LocalStrategy(function verify(email, password, cb) {
  pool.get('SELECT * FROM users WHERE email = ?', [ email ], function(err, user) {
    if (err) { return cb(err); }
    if (!user) { return cb(null, false, { message: 'Incorrect email or password.' }); }
    
    crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect email or password.' });
      }
      return cb(null, user);
    });
  });
}));

module.exports = {
    passport
};