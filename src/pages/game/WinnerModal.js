import React from 'react'
import UserView from '../../component/userView'
import { useHistory } from 'react-router'
import { motion } from 'framer-motion'

export default function WinnerModal({userId}) {
    let history = useHistory();

    return (
        <div className='winnerModal'>
            <motion.div 
                className="winnerModal__background" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{
                    duration:0.4,
                }}
            />
            <motion.div 
                className="winnerModal__userView"
                initial={{ y: -500}}
                animate={{ y: 0 }}
                transition={{
                    duration:0.4,
                }}
            >
                <div className="winnerModal__userView__text">
                    <div>
                        <UserView userId={userId} />
                         won the game !
                    </div>
                </div>

                <button onClick={() => history.push(`/`)}>HOME</button>
            </motion.div>
        </div>
    )
}
