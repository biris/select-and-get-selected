import axios from 'axios'




function getRepos(username) {
  // return repos of username
  return axios.get("https://api.github.com/users/" + username + "/repos?" + "&per_page=100")
}

function getTotalStars(repos) {
  console.log("REPOS", repos)
  return repos.data.reduce((totalStars, repo) => {
    return totalStars + repo.stargazers_count
  }, 0)
}


function getPlayerData(user) {
  // gives us what to return get the score
  return getRepos(user.login)
    .then(getTotalStars)
    .then((totalStars) => {
      return {
        totalStars: totalStars,
        followers: user.followers
      }
    })
  }

function calculateScore(players) {
  return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[0].totalStars
  ]
}

export default {

  getUserInfo(username) {
    return axios.get("https://api.github.com/users/" + username)
    .then((info) => {
      return info.data
    })
    .catch((err) => {
      console.log(err, "error")
    })},

  getPlayerInfo(players) {
    return axios.get("https://api.github.com/users/" + username)
      .then((info) => {
        return user.data
      })
      .catch((err) => {
        console.warn("Error in getPlayerInfo", err)
      })
  },

  battle(players) {
    return axios.all(players.map((user) => {
      return getPlayerData(user)
    })).then(calculateScore)
      .catch((err) => {
        console.warn("Err!", err)
      })
  }
}



