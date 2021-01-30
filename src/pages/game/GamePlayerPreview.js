import React from 'react'
import UserView from '../../component/userView';
import secondToReadable from '../../lib/secondToReadable'

export default function GamePlayerPreview({gameValue, player}) {
    const time = secondToReadable(gameValue.time[player])
    
    return (
        <div className="game__players__player">
            <UserView userId={gameValue[player]}/>
            <p>{time}</p>
        </div>
    )
}
