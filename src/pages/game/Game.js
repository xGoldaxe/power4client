import React, {useContext, useState, useEffect} from 'react'
import UserView from '../../component/userView';
import { UserContext } from '../../UserContext'
import { AllCase } from './visualComponents'
import { SocketContext } from '../../SocketContext'
import { useParams } from 'react-router-dom'
import WinnerModal from './WinnerModal'
import GamePlayerPreview from './GamePlayerPreview';

export default function Game() {
    const { user } = useContext(UserContext)
    const {socket} = useContext(SocketContext)
    let {slug} = useParams()

    const [gameValue, setGameValue] = useState(null)
    

    //quand socket et défini
    useEffect(function(){
        if(socket){
            //join the room
            socket.emit('joinGameRoom', slug)
            //game state
            socket.on('gameState', (res)=>{
                console.log(res)
                setGameValue(res.game)
            });
            //game over
            return () => {
                socket.removeAllListeners('gameState')
            }
        }
    }, [socket])

    useEffect(function(){
        if(user){
            (async function() {
                const data = {
                    gameId: slug
                }
                const response = await fetch('http://localhost:8080/api/auth/game/information', {
                    headers: {
                        "Content-type": "application/json;charset=UTF-8",
                        'Accept': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(data)
                })
                const responseJson = await response.json()  // convert to json
                setGameValue(responseJson.game)
            })()
        }
    },[user])

    function handlePlay(moveCase) {
        const data = {
            userId: user.userId,
            token: user.token,
            gameId: slug,
            move: moveCase
        }
        console.log(data.move)
        socket.emit('playMove', data);
    }

    return (
        <div className="game">
            {gameValue !== null ?
            <>
                {gameValue.playerTurn ?
                    <>
                        {gameValue.winner &&
                            <WinnerModal userId={gameValue.winner} />
                        }
                        {/* <div className="game__type">
                            Normal game
                            <div className="game__type__bg"></div>
                        </div> */}
                        <div className="wholeGame">
                            <div className="game__players">
                                <GamePlayerPreview gameValue={gameValue} player={"host"}/>
                                <GamePlayerPreview gameValue={gameValue} player={"opponent"}/>
                            </div> 

                            <div className="gameContainer">
                                {gameValue.moves.length === 0 && <div className="afkAdvertisor"><UserView userId={gameValue.playerTurn}/> 
                                    have to start the game or he will automatically lose in
                                    <div className="aflAdvertisor__count"> {gameValue.afkAdvertisor}s</div>
                                </div>}
                                <AllCase onClick={handlePlay} gameValue={gameValue}/>
                            </div>
                            
                            <div className="playerTurn">
                                <UserView userId={gameValue.playerTurn}/>
                            </div>
                        </div>
                    </>      
                :
                    <h1>Waiting for an opponent</h1>
                }

            </>
            :
            <p>Loading</p>
            }
        </div>
    )
}
