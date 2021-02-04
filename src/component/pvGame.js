import React, { useState, useContext, useRef, useEffect } from 'react'
import { SocketContext } from '../SocketContext'
import { useHistory } from 'react-router';
import secondToReadable from '../lib/time/secondToReadable'
import TimeBlock from './TimeBlock'
import { motion } from 'framer-motion'
import cross from '../images/cross.svg'

export default function PvGame({user, onClick}) {
    const { socket } = useContext(SocketContext)
    const [tab, setTab] = useState('join')
    let createClass = '';
    let joinClass = '';
    if(tab === 'join') {
        joinClass = 'pvGame__tab__selected'
        createClass = 'pvGame__tab__notSelected'
    } else {
        joinClass = 'pvGame__tab__notSelected'
        createClass = 'pvGame__tab__selected'
    }

    return (
        <div className="pvGame--container">
            <motion.div 
                className="pvGame__background" 
                onClick={() => onClick('private')}
                initial={{opacity: 0}}
                animate={{ opacity: 0.8}}
                transition={{
                    duration: 0.4,
                    ease: 'linear'
                }}
            />
            <motion.div 
                className="pvGame"
                initial={{ 
                    opacity: 0,
                    y: '-100%'
                 }}
                animate={{ 
                    opacity: 1,
                    y: 0
                 }}
                transition={{duration: 0.4}}
            >
                <div className="pvGame__return" onClick={() => onClick('private')}><img src={cross} /></div>
                <div className="pvGame__tab">
                    <div onClick={() => {setTab('create')}} className={createClass}>Create</div>
                    <div onClick={() => {setTab('join')}} className={joinClass}>Join</div>
                </div>
                {tab === 'join' ? (
                    <Join user={user} socket={socket}/>
                ) : (
                    <Create user={user} socket={socket}/>
                )}
            </motion.div>
        </div>
    )
}

function Join({ user, socket }) {
    const inputRef = useRef(null)
    const [joining, setJoining] = useState(false)
    const [error, setError] = useState(false)
    let history = useHistory();

    useEffect(() => {
        socket._callbacks.$joinedPvGame = null
        socket.on('joinedPvGame', (socketData) => {
            if(socketData) {
                history.push("/game/" + socketData)
            } else {
                setJoining(false)
                setError(true)
            }
        })

        return () => {
            socket.removeAllListeners('joinedPvGame')
        }
    }, [])

    const handleClick = function() {
        socket.emit('joinPvGame', {
            userId: user.userId,
            token: user.token,
            gameId: inputRef.current.value
        })
        setJoining(true)
    }

    return joining ? 
    <div className="pvGame__create">
        <h2>Loading...</h2>
    </div>
    :
    <div className="pvGame__create">
        <h2>Copy the link here</h2>
        <div className="pvGame__create__linkAndError">
            <input ref={inputRef}></input>
            {error && <p className="error">Invalid link</p>}
        </div>
        <button onClick={handleClick}>Validate</button>
    </div>
}


function Create({ user, socket }) {
    const [copied, setCopied] = useState(false)
    const [timeSelected, setTimeSelected] = useState('3:00')
    const [created, setCreated] = useState(false)
    const [gameValue, setGameValue] = useState(null)
    let history = useHistory();
    
    useEffect(() => {
        socket._callbacks.$createdPvGame = null
        socket.on('createdPvGame', (socketData) => {
            setGameValue(socketData.game)
            setCreated(true)
            console.log(socketData)
        })
        //clear all the repetitions of useless events 'on'
        socket._callbacks.$joinedPvGame = null
        socket.on('joinedPvGame', (socketData) => {
            if(socketData) {
                history.push("/game/" + socketData)
            } 
        })

        return () => {
            if(gameValue) {
                console.log('lets goo')
                socket.removeAllListeners('joinedPvGame')
                socket.removeAllListeners('createdPvGame')
                socket.emit('deletePvGame', {gameId : gameValue._id})
            }
        }
    }, [gameValue])

    
    async function createGame(time, socket) {
        setCreated('loading')
        // dataResult = await dataResult.json()
        socket.emit('createPvGame', {
            userId: user.userId,
            token: user.token,
            time: time
        })
    }

    return (
        <div className="pvGame__create">
            {!created ? 
                <>
                    <h2>Create your game</h2>
                    <div className="pvGame__create__timeContainer">
                        <TimeBlock time='0:15' timeSelected={timeSelected} onClick={(time) => setTimeSelected(time)} />
                        <TimeBlock time='0:30' timeSelected={timeSelected} onClick={(time) => setTimeSelected(time)} />
                        <TimeBlock time='1:00' timeSelected={timeSelected} onClick={(time) => setTimeSelected(time)} />
                        <TimeBlock time='3:00' timeSelected={timeSelected} onClick={(time) => setTimeSelected(time)} />
                        <TimeBlock time='5:00' timeSelected={timeSelected} onClick={(time) => setTimeSelected(time)} />
                    </div>
                    
                    <div className="pvGame__create__buttonCreate">
                        <button 
                        onClick={() => createGame(
                            parseInt(timeSelected.split(':')[0])*60 + (parseInt(timeSelected.split(':')[1])),
                            socket
                        )}>Lets go</button>
                    </div>
                    {/* this button create a game => if the creator is already in game, redirect on it instead */}
                </>
                :
                <>
                {created === 'loading' ? <h2>Loading ...</h2>
                :
                    <>
                        {/* wait for the friend to join, when he's there, start the game + redirect both players*/}
                        <div className="loader"></div>
                        <h2>Send this code to your friend</h2>
                        <div className="pvGame__create__linkBox" onClick={()=>setCopied(true)}>
                            <div className="pvGame__create__linkBox__text">{gameValue._id}</div>
                            <div className="pvGame__create__linkBox__copy">copy</div>
                            {copied && <p className="pvGame__create__linkCopied">you have successfully copied :)</p>}
                        </div>
                        <div className="pvGame__create__timeContainer">
                            <div className="pvGame__create__timeContainer__block pvGame__create__timeContainer__block__selected">
                                {secondToReadable(gameValue.time.host)}
                            </div>
                        </div>
                    </>}
                </>}

        </div>
    )
}
