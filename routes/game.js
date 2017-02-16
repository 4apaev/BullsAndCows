const length = 4
const nums = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
const users = { }

function game(req, res) {

    const token = Math.random().toString(16).slice(2);

    users[ token ] = nums.sort(() => Math.random() - 0.5).slice(0, length).join('')

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ token, length }))
}


module.exports = {
  game,
  get users() {
    return users
  }
}

