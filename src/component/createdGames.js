import React, {useEffect, useContext, useState} from 'react'
import { useHistory } from 'react-router'
import getUserInfoById from '../lib/getUserInfoById'
import { UserContext } from '../UserContext'


function GameHost({hostId, user}) {
    const [pseudo, setPseudo] = useState(null)

    useEffect(function(){
        (async function() {
            const pse = await getUserInfoById(hostId, user)
            setPseudo(pse.pseudo)
        })()
    },[])

    return (
        <p>{pseudo}</p>
    )
}


export default function CreatedGames({listGames}) {
    const { user, setUser } = useContext(UserContext)


    async function handleJoinGame(gameId) {
        const data = {
            gameId: gameId,
            userId: user.userId
        }

        const response = await fetch('http://localhost:8080/api/auth/game/join', {
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            method: "PUT",
            body: JSON.stringify(data)
        })
    }

    let history = useHistory();
    return (
        <div className='createdGames'>
            {listGames ? 
            listGames.map((game)=>
                <div key={game._id}>
                    <p>{game.gameType}</p>
                    {<GameHost hostId={game.host} user={user}/>}
                    <p>{game.opponent ? 2 : 1}/2</p>
                    <button onClick={() => handleJoinGame(game._id)}>JOIN</button>
                    <button style={{background: 'green', marginTop: '10px'}} onClick={() => history.push(`/game/${game._id}`)}>SPECTATE</button>
                </div>
            )
            :
            <p>Loading ...</p>}
        </div>
    )
}
