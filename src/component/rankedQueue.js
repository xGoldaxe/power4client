import React, { useState, useContext, useRef, useEffect } from 'react'
import getGameInfo from '../lib/getGameInfo';
import { io } from 'socket.io-client';
import { SocketContext } from '../SocketContext'
import { useHistory } from 'react-router';
import secondToReadable from '../lib/secondToReadable'
import TimeBlock from './TimeBlock';
import { motion } from 'framer-motion'



export default function RankedGame({user, onClick}) {
    const { socket, setSocket } = useContext(SocketContext)

    return (
        <div className="pvGame--container">
            <motion.div 
                className="pvGame__background" 
                onClick={() => onClick('ranked')}
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
                <CreatedQueue user={user} socket={socket}/>
            </motion.div>
        </div>
    )
}



function CreatedQueue({ user, socket }) {
    const [timeSelected, setTimeSelected] = useState('3:00')
    const [isQueue, setIsQueue] = useState(false)
    const [queueTime, setQueueTime] = useState(0)
    const history = useHistory()
    let interval = ''

    useEffect(() => {
        socket.on('gameStart', (socketData) => {
            console.log('data received')
            history.push(`/game/${socketData}`)
        })

        return () => {
            console.log('deleiting')
            socket.emit('leaveMatchmaking', user)
            socket.removeAllListeners('gameStart')
        }
    }, [])

    useEffect(() => {
        if(isQueue) {
            interval = setInterval(()=> {
                setQueueTime(queueTime => queueTime += 1)
            }
            ,1000)
        }
        return () => {
            clearInterval(interval)
        }
    }, [isQueue])

    const handleClick = () => {
        setIsQueue(true)
        socket.emit('joinMatchmaking', user)
    }

    return (
        <div className="pvGame__create">
            {!isQueue ? 
                <>
                    <h2>Select your preference</h2>
                    <div className="pvGame__create__timeContainer">
                        <TimeBlock time='0:30' timeSelected={timeSelected} onClick={(time) => setTimeSelected(time)} />
                        <TimeBlock time='3:00' timeSelected={timeSelected} onClick={(time) => setTimeSelected(time)} />
                        <TimeBlock time='5:00' timeSelected={timeSelected} onClick={(time) => setTimeSelected(time)} />
                    </div>
                    <button onClick={handleClick}>Lets go</button>
                </>
                :
                <>
                {isQueue === 'loading' ? <h2>Loading ...</h2>
                :
                    <div className="pvGame__create__queue">
                        {/* wait for the friend to join, when he's there, start the game + redirect both players*/}
                        <h2>You are actually in queue</h2>
                        <div className="loader"></div>
                        
                        <h3>{secondToReadable(queueTime)}</h3>

                        <div className="pvGame__create__timeContainer">
                            <div className="pvGame__create__timeContainer__block pvGame__create__timeContainer__block__selected">
                                {timeSelected}
                            </div>
                        </div>
                        
                    </div>}
                </>}

        </div>
    )
}
