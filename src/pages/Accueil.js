import React, {useContext, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { SocketContext } from '../SocketContext'
import PvGame from '../component/pvGame'
import RankedGame from '../component/rankedQueue'

export default function Accueil() {
    const { user, setUser } = useContext(UserContext)
    const { socket, setSocket } = useContext(SocketContext)
    const [pvGameVisible, setPvGameVisible] = useState(false)
    const [rankedGameVisible, setRankedGameVisible] = useState(false)
    const [listGames, setlistGames] = useState(null)
    
    useEffect(()=> {
        if(socket){
            socket.on('allGamesRep',(res)=>setlistGames(res));
            socket.emit('allGamesReq');
        }
    }, [socket])
    console.log('render');
    function handleCreateGame() {
        socket.emit('createGame', {
            user: user
        })
    }

    const handleClick = (button) => {
        if(button === 'private') {
            setPvGameVisible(!pvGameVisible)
            setRankedGameVisible(false)
        } else {
            setRankedGameVisible(!rankedGameVisible)
            setPvGameVisible(false)
        }
    }

    return (
        <div>
            <h1>PUISSANCE 4 ONLINE</h1>
            <div className="accueil">
                {user ?
                    <>
                        <button className="createGameButton" onClick={() => handleClick('private')}>Private game</button>
                        {pvGameVisible && <PvGame user={user} onClick={handleClick}/>}
                        <button className="createGameButton" onClick={() => handleClick('ranked')}>Ranked game</button>
                        {rankedGameVisible && <RankedGame user={user} onClick={handleClick}/>}
                    {/* <CreatedGames listGames={listGames}/> */}
                    </>
                    : 
                    <div className="notConnectedWindow">
                        <Link to="/login" className="createGameButton">Connection</Link>
                        <Link to="/register" className="createGameButton">Create an account</Link>
                    </div>

                }
            </div>


        </div>
    )
}
