import React, {useEffect, useState} from 'react'
import UserView from '../../../component/userView';
import profilePicture from '../../../images/pierre.jpg'
import secondToReadable from '../../../lib/time/secondToReadable'
import rankToReadable from '../../../lib/rank/rankToReadable'
import getUserInfoByPseudo from '../../../lib/user/getUserInfoByPseudo';
import { AnimatePresence, motion } from 'framer-motion'
import { useHistory } from 'react-router';

export default function GamePlayerPreview({gameValue, player, position}) {
    const time = secondToReadable(gameValue.time[player])
    let history = useHistory()

    return (
        <div className={`game__players__player game__players__player__${position}`}>
            <div className={`profilePicture game__players__player__profilePicture profilePicture game__players__player__${position}__profilePicture`}>
                        <img 
                            alt="profilePicture" 
                            src={profilePicture}
                            width='40px'
                            heigh='40px'
                        />
            </div>
            <div className="game__players__player__profile">
                <p className="game__players__player__profile__pseudo" onClick={() => history.push(`/profile/${gameValue[player].pseudo}`)}>{gameValue[player].pseudo}</p>
                <p className="game__players__player__profile__rank">{rankToReadable(gameValue[player].actualRank)}</p>
            </div>

            <div className={`game__players__player__time game__players__player__${position}__time`}>{time}</div>
            <AnimatePresence>
                {gameValue.playerTurn === gameValue[player].id && 
                    <motion.div 
                        className={`game__players__player__pawn game__players__player__${position}__pawn`}
                        key='pawn'
                        initiale={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        exit={{
                            opacity: 0
                        }}
                    ></motion.div>
                }
            </AnimatePresence>
        </div>
    )
}
