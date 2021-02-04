import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router'
import { motion , AnimatePresence} from 'framer-motion'
import { createPortal } from 'react-dom'


import rankToReadable from '../../../lib/rank/rankToReadable'
import setRankImage from '../../../lib/rank/setRankImage'



export default function WinnerModal({userId, gameValue}) {
    let history = useHistory();
    const [victory, setVictory] = useState(null)
    const [rank, setRank] = useState({})
    
    let userValue
    if(gameValue.host.id === userId) {
        userValue = gameValue.host
    } else if(gameValue.opponent.id === userId) {
        userValue = gameValue.opponent
    }
    
    useEffect(() => {
        let timer
        if(gameValue.winner === userValue.id) {
            setVictory(true)
        } else {
            setVictory(false)
        }
        if(gameValue.gameType === 'ranked') {
            setRank({...rank, 
                img : setRankImage(rankToReadable(userValue.actualRank).split(' ')[0]),
                gem : parseInt(rankToReadable(userValue.actualRank).split(' ')[1]),
                newImg : setRankImage(rankToReadable(userValue.newRank).split(' ')[0]),
                newGem : parseInt(rankToReadable(userValue.newRank).split(' ')[1]),
            })

            timer = setTimeout(()=> {
                setRank((r) => ({...r, 
                    pallierChange: r.img !== r.newImg,
                    rankChange: true
                }))
            }, 1000)
        } else {
            console.log('unranked')
            setRank('unranked')
        }


        return () => {
            clearTimeout(timer)
        }
    }, [])


    return createPortal(
        rank && <div className='winnerModal'>
        <motion.div 
            className="winnerModal__background" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{
                duration:0.4,
            }}
        />
        <motion.div 
            className="winnerModal__userView--container"
            initial={{ y: -500}}
            animate={{ y: 0 }}
            transition={{
                duration:0.4,
            }}
        >
            <div className="winnerModal__userView">
                {rank !== 'unranked' ?
                <>
                    <AnimatePresence>
                        {!rank.pallierChange && <RankImage src={rank.img}/>}
                    </AnimatePresence>
                    <AnimatePresence>
                        {rank.pallierChange && <RankImage src={rank.newImg}/>}
                    </AnimatePresence>
                    <div className="winnerModal__userView__rankBox">
                        {rankToReadable(userValue.newRank).split(' ')[0] === 'beast' ?
                        <div className="winnerModal__userView__rankBox__beast">
                            <motion.p
                                initial={{ y: '-100%', opacity: 0}}
                                animate={{ y: 0, opacity: 1}}
                                exit={{ y: '100%', opacity: 0}}
                                transition={{delay: 1, duration: 0.3}}
                            >{rank.newGem}</motion.p>
                        </div>
                        
                        :[1,2,3].map((x) => 
                            <div  className="winnerModal__userView__rankBox__container" key={x}>
                                {(x<=rank.gem && x<=rank.newGem) ?
                                <div className='winnerModal__userView__rankBox__full'></div> :
                                x<=rank.newGem ?
                                    <motion.div 
                                    className='winnerModal__userView__rankBox__full'
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 1.5, duration: 0.5 }}
                                /> :
                                (x<=rank.gem && x>rank.newGem) &&
                                <motion.div 
                                    className='winnerModal__userView__rankBox__full'
                                    initial={{ scale: 1 }}
                                    animate={{ scale: 0 }}
                                    transition={{ delay: 1.5, duration: 0.5 }}
                                />
                                }

                            </div>
                        )}
                    </div>
                </> :
                <p className='winnerModal__userView__unranked'>No rank change for this game</p>
                }
                <div className="winnerModal__userView__text">
                    {victory === null ?(
                    <p>stop hack me bro :( 
                     win the game !</p>)
                    : victory === true ? (
                        <p className="winnerModal__userView__text__result">Victory !</p>
                    ): (
                        <p className="winnerModal__userView__text__result">Defeat !</p>
                    )
                    }
                </div>
            </div>
            <button 
                className="nextButton"
                onClick={() => history.push(`/`)}
            >HOME</button>
        </motion.div>
        </div>, document.getElementById('root')
    )
}

function RankImage({src}) {
    console.log('render')
    return (
        <motion.img 
            key={src}
            src={src} 
            alt='rank'
            width='300px'
            height='300px'
            initial={{ opacity:0, x: '-100%'}}
            animate={{ opacity: 1, x: 0}}
            exit={{ opacity: 0, x: '100%'}}
            transition={{ duration: 0.5}}
        />
    )
}
