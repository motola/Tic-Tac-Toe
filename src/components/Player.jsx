import {useState} from 'react'

export default function Player({initialName, symbol, isActive}) {
   const [playerName, setPlayerName] = useState(initialName); 
   const [isEditing, setIsEditing] = useState(false);

   function buttonClicked () {
     setIsEditing(editing => !editing);

   }
   function handleChange (event) {
     setPlayerName(isPlayerName => isPlayerName = event.target.value)
   }

   let editablePlayerName = <span className="player-name">{playerName}</span> 
   
   if (isEditing) {
     editablePlayerName = <input onChange={handleChange} type="text" value={playerName} required  />  
   }

     return (
        <li className={isActive ? 'active' : undefined}>
        <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span> 
        <button onClick={buttonClicked}>{isEditing ? 'Save' : 'Edit'}</button>
        </span>    
      </li>
     )




}