(($, token) => {

  function start() {
    return fetch('/game')
            .then(x => x.json())
            .then(x => {
              token = x.token;
              toggle()
            }).catch(() => {
                restart('Sorry, something went wrong...')
              })
  }

  function guess(e) {

    let answer = e.target.value

    return fetch(`/game/${ token }`, {
      method: 'POST',
      body: JSON.stringify({ guess: answer })
    })
      .then(x => x.json())
      .then(({ bulls, cows, win }) => {
        if (win)
          restart(`You Win! ${ answer }`)
        else
          $('board').insertAdjacentHTML('beforeEnd', `<li>
              <i>answer: ${ answer }</i>
              <b>bulls: ${ bulls }</b>
              <b>cows: ${ cows }</b>
            </li>`);

      }).catch(() => {
        restart('Sorry, something went wrong...')
      })
  }

  function restart(msg='Bulls & Cows') {
    toggle()
    $('title').textContent = msg
  }

  function toggle() {
    let btn = $('start'),
        board = $('board'),
        input = $('guess');

    board.innerHTML = ''
    input.value = ''
    board.classList.toggle('hidden');
    input.classList.toggle('hidden');
    btn.classList.toggle('hidden')
  }

  document.addEventListener('DOMContentLoaded', function init() {
    $('guess').addEventListener('change', guess)
    $('start').addEventListener('click', start)
    document.removeEventListener('DOMContentLoaded', init);
  })

})(document.getElementById.bind(document))