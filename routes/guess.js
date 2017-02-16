const length = 4
const game = require('./game')
const log = console.log.bind(console);

function makeGuess(req, res) {
    let payload, code, token = req.pathname.split('/').pop()

    if (token in game.users) {

      let answer = game.users[ token ]
      code = 200
      payload = compare(req.body.guess, answer)

      log(answer)

      if (payload.bulls===length) {
        payload.win = true
        delete game.users[ token ]
      }

    } else {

      code = 400
      payload = { success: false, message: 'game over' }
    }

    res.writeHead(code, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(payload))
}



function compare(guess='', answer='') {
  let bulls = 0,
      cows = 0,
      uniqs = [ ];

  for(let i = 0; i < length; i++) {
    let a = answer[ i ],
        b = guess[ i ];

    if (a === b) {
      bulls+=1
    } else if (uniqs.indexOf(a) === -1) {
        uniqs.push(a)
        if (guess.indexOf(a) > -1)
          cows +=1
    }
  }

  return { bulls, cows }
}


module.exports = makeGuess



