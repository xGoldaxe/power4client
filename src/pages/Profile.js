import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import getUserInfoByPseudo from '../lib/getUserInfoByPseudo'
import profilePicture from '../images/pierre.jpg'
import rankImg from '../images/rank/plat.png'
import rankToReadable from '../lib/rankToReadable'

export default function Profile() {
    const [profileState, setProfileState] = useState(null)
    let {slug} = useParams()

    useEffect(async () => {
        let profileInformation = await getUserInfoByPseudo(slug)
        profileInformation.rank = rankToReadable(profileInformation.rank)
        if(!profileInformation.hasOwnProperty('error')) {
            setProfileState(profileInformation)
        } else {
            setProfileState('unknown')
        }
    }, [])


    return ( 
        <div>
            <h1>PUISSANCE 4 ONLINE</h1>
            <div className="profile--wrapper">
            {profileState === 'unknown' ? <div className="error404">404 - This profile does not exist :( </div> 
            :
            <>
            <div className="profile">
                <div className="profile__picture">
                    <img src={profilePicture} width={300} height={300} />
                </div>
                <div className="profile__text">
                    <h2>{!profileState ?  'Loading ...' : profileState.pseudo}</h2>
                    <p className="profile__text__rank">Rank : {!profileState ?  'Loading ...' : profileState.rank}</p>
                    <p className="profile__text__winrate">Winrate 50% (
                        <span  className="profile__text__winrate__win">12 W</span>/
                        <span  className="profile__text__winrate__null">4 N</span>/
                        <span  className="profile__text__winrate__lose">8 L</span>)
                    </p>
                </div>
                <div className="profile__rank">
                    <img src={rankImg} alt='rank'/> 
                </div>
            </div>
            <div className="history">
                <h2>goldaxe is actually playing !</h2>
                <div className="history__actualGame">
                    <div>
                        <p>Goldaxe</p>
                    </div>
                    <p>VS</p>
                    <div>
                        <p>Lol</p>
                    </div>
                </div>
            </div>
            <div className="history">
                <h2>History</h2>
                <GameHistory />
                <GameHistory />
                <GameHistory />
                <GameHistory />
                <GameHistory />
                <GameHistory />
            </div>
            </>
            }
            </div>
        </div>
    )
}


function GameHistory() {
    return (
        <div className="gameHistory">
            <div className="gameHistory__players">
                <div  className="gameHistory__players__win">
                    <p>Goldaxe</p>
                </div>
                <p>VS</p>
                <div>
                    <p>Lol</p>
                </div>
            </div>
            <p>28 jan. 2021</p>
        </div>
    )
}
