
const teamsDataBase = {}

const cleanUpTeam = () => {
  for (const user in teamsDataBase) { teamsDataBase[user] = [] }
}

const bootStrapTeam = (userId) => {
  teamsDataBase[userId] = []
}

const getTeamOfUser = (userId) => {
  return teamsDataBase[userId]
}

const addPokemon = (userId, pokemon) => {
  teamsDataBase[userId].push(pokemon)
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
