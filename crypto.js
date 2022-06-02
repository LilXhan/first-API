const bcrypt = require('bcrypt');


const hashPassword = (plainTextPwd, Done) => {
  bcrypt.hash(plainTextPwd, 10, done);
}

const hashPasswordSync = (plainTextPwd) => {
  return bcrypt.hashSync(plainTextPwd, 10);
}

const comparePassword = (plainPassword, hashPassword, done) => {
  bcrypt.compare(plainPassword, hashPassword, done)
}


exports.hashPasswordSync = hashPasswordSync;
exports.comparePassword = comparePassword;
