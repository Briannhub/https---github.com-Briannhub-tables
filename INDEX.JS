let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn') // 'restartbtn' was changed to 'restartBtn'
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

console.log(boxes)

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

console.log(spaces)

const startGame = (e, box) => {
  const id = boxes.indexOf(box)

  if (!spaces[id]) {
    spaces[id] = currentPlayer
    e.target.innerText = currentPlayer

    if (playerHasWon() !== false) {
      playerText.innerText = `${currentPlayer} has won!` // Added .innerText
      let winning_blocks = playerHasWon()

      winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
      return
    }

    currentPlayer = (currentPlayer === X_TEXT) ? O_TEXT : X_TEXT;
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition

    if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
      return [a, b, c]
    }
  }
  return false
}

restartBtn.addEventListener('click', restart) // 'retart' was changed to 'restart'
function restart() {
  spaces.fill(null)
  boxes.forEach((box, i) => {
    box.style.backgroundColor = '' // Added empty string instead of undefined
  })

  playerText.innerText = 'Tic Tac Toe' // Added .innerText
}

boxes.forEach(box => box.addEventListener('click', e => startGame(e, box)))