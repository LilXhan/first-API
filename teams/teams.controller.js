
const teamsDataBase = {}

const cleanUpTeam = () => {
  return new Promise((resolve, reject) => {
    for (let user in teamsDataBase) {
      teamsDataBase[user] = [];
    }
    resolve();
  })
}

const bootStrapTeam = (userId) => {
  teamsDataBase[userId] = []
}

const getTeamOfUser = (userId) => {
  return new Promise((resolve, reject) => {
    resolve(teamsDataBase[userId]);
  });
}

const addPokemon = (userId, pokemon) => {
  return new Promise((resolve, reject) => {
    if (teamsDataBase[userId].length == 6) {
      reject();
    } else {
      teamsDataBase[userId].push(pokemon);
      resolve();
    }
  });
}

const setTeam = (userId, team) => {
  teamsDataBase[userId] = team
}

const deletePokemonAt = (userId, index) => {
  console.log('Delete', userId, index);
  if (teamsDataBase[userId][index]) {
    teamsDataBase[userId].splice(index, 1);
  }
}

exports.bootStrapTeam = bootStrapTeam;
exports.setTeam = setTeam;
exports.addPokemon = addPokemon;
exports.getTeamOfUser = getTeamOfUser;
exports.cleanUpTeam = cleanUpTeam;
exports.deletePokemonAt = deletePokemonAt;
