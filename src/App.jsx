import {useState} from 'react';
import Player from '../src/components/Player.jsx';
import TacBoard from '../src/components/TacBoard.jsx';
import Log from '../src/components/Log.jsx';
import { WINNING_COMBINATIONS } from './winning-combination.js';
import GameOver from './components/GameOver.jsx';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedPlayer (gameTurns) {
  let currentPlayer = 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }

  return currentPlayer;
}


function App() {
  const [players, setPlayers] = useState({
    'X': 'Player 1',
    'O': 'Player 2'
  }) 
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = derivedPlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for (const turn of gameTurns) {

    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;

  }

  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    let firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    let secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    let thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
        winner = players[firstSquareSymbol]
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner

  function handleSelectSquare (rowIndex, colIndex) {
    
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedPlayer(prevTurns);
      const newTurns = [{square: { row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns, ];
      return newTurns;
    })
    
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerName(symbol, newName) {
    setPlayers(prevPlayers => {
    return { 
      ...prevPlayers,
      [symbol]: newName,


    }
    })
  }

  return ( 
  <main>
    <div id="game-container">
    <ol id="players" className='highlight-player'>
    <Player initialName="player 1" symbol='X' onNameChange={handlePlayerName} isActive={activePlayer === 'X'}/>
    <Player initialName="player 2" symbol='O' onNameChange={handlePlayerName} isActive={activePlayer === 'O'}/>
    </ol>
    {(winner || hasDraw) && <GameOver onRestart={handleRematch} winner={winner} />}
    <TacBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} board={gameBoard}/> 
    </div>
    <Log turns={gameTurns}/>
  </main>
  ) 
}

export default App
