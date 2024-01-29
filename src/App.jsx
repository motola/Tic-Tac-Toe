import {useState} from 'react';
import Player from '../src/components/Player.jsx';
import TacBoard from '../src/components/TacBoard.jsx';




function App() {
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare () {
    setActivePlayer((currentActivePlayer) =>  currentActivePlayer === 'X' ? 'O' : 'X' )}

  return ( 
  <main>
    <div id="game-container">
    <ol id="players" className='highlight-player'>
    <Player initialName="player 1" symbol='X' isActive={activePlayer === 'X'}/>
    <Player initialName="player 1" symbol='O' isActive={activePlayer === 'O'}/>
    </ol>
    <TacBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} /> 
    </div>
  </main>
  ) 
}

export default App
