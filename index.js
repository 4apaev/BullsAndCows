'use strict';

global.log = console.log.bind(console)

const App = require('./server')
const cors = require('./server/middleware/cors')
const body = require('./server/middleware/body')
const logger = require('./server/middleware/logger')
const statiq = require('./server/middleware/static')
const finish = require('./server/middleware/finish')

const app = new App;
const PORT = 3000;

const home = require('./routes/home')
const { game } = require('./routes/game')
const guess = require('./routes/guess')

app
  .use(logger('statusCode', 'method', 'url'))
  .use(cors)
  .post(body)

  .get('/', home)
  .get('/game', game)
  .post(/^\/game\/\w+$/, guess)

  .get(statiq())
  .listen(PORT, finish);

log('start game on localhost:' + PORT)
