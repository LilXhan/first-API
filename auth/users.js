const { get } = require('express/lib/response');
const uuid = require('uuid')
const crypto = require('../tools/crypto');
const teams = require('../teams/teams.controller');
let userDataBase = {};

const cleanUpUsers = () => {
  userData = {};
}

// user id -> password
const registerUser = (userName, password) => {
  let hashedPwd = crypto.hashPasswordSync(password);
  let userId = uuid.v4();
  userDataBase[userId] = {
    userName: userName,
    password: hashedPwd
  }
  teams.bootStrapTeam(userId);
  //Guardar en la base de datos nuestro usuario
}

const getUserIdFromUserName = (userName) => {
  for (let user in userDataBase) {
    if (userDataBase[user].userName == userName) {
      let userData = userDataBase[user];
      userData.userId = user;
      return userData;
    }
  }
}

const getUser = (userId) => {
  return userDataBase[userId];
}

const checkUserCredentials = (userName, password, done) => {
  console.log('Checking user credentials')
  //Comprobar que las credenciales son validas
  let user = getUserIdFromUserName(userName);
  if (user) {
    console.log(user);
    crypto.comparePassword(password, user.password, done);
  } else {
    done('Missing user');
  }

}

exports.getUserIdFromUserName = getUserIdFromUserName;
exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;
exports.getUser = getUser;
exports.cleanUpUsers = cleanUpUsers;
