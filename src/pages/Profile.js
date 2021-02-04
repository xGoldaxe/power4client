import React, {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import getUserInfoByPseudo from '../lib/user/getUserInfoByPseudo'
import profilePicture from '../images/pierre.jpg'
import rankImg from '../images/rank/plat.png'
import rankToReadable from '../lib/rank/rankToReadable'
import getGames from '../lib/historic/getGames'
import isInGame from '../lib/game/isInGame'
import getStats from '../lib/stats/getStats'
import setRankImage from '../lib/rank/setRankImage'

export default function Profile() {
    const [profileState, setProfileState] = useState(null)
    const [historic, setHistoric] = useState(null)
    const [actualGame, setActualGame] = useState(null)
    const [stats, setStats] = useState(null)
    const history = useHistory()
    let {slug} = useParams()

    useEffect(async () => {
        //profile
        let profileInformation = await getUserInfoByPseudo(slug)
        profileInformation.rank = rankToReadable(profileInformation.rank)
        if(!profileInformation.hasOwnProperty('error')) {
            setProfileState(profileInformation)
        } else {
            //manage error 404
            setProfileState('unknown')
        }
        //historic
        const allGames = await getGames(profileInformation)
        setHistoric(allGames.historic)
        //stats
        setStats(await getStats(profileInformation.id))
        //actual game
        setActualGame(await isInGame(profileInformation.id))
    }, [])


    return ( 
        <div>
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
                    {stats ? <p className="profile__text__winrate">Winrate {stats.winrate}% (
                        <span  className="profile__text__winrate__win">{stats.wins} W</span>/
                        <span  className="profile__text__winrate__null">{stats.draws} N</span>/
                        <span  className="profile__text__winrate__lose">{stats.loses} L</span>)
                    </p> : <p className="profile__text__winrate">Loading...</p>}
                </div>
                <div className="profile__rank">
                    {(profileState !== 'unknow' && profileState) && <img src={setRankImage(profileState.rank)} alt='rank'/>}
                </div>
            </div>
            {actualGame && 
                <div className="history" onClick={() => history.push(`../game/${actualGame._id}`)}>
                    <h2>{profileState.pseudo} is actually playing !</h2>
                    <div className="history__actualGame">
                        <div>
                            <p>{actualGame.host.pseudo}</p>
                        </div>
                        <p>VS</p>
                        <div>
                            <p>{actualGame.opponent.pseudo}</p>
                        </div>
                    </div>
                </div>
            }
            <div className="history">
                <h2>History</h2>
                {historic ? <GameHistory games={historic}/> : <div className="loader" />}
            </div>
            </>
            }
            </div>
        </div>
    )
}


function GameHistory({games}) {
    return (
        <>
        {games.map(x => 
            <div className="gameHistory" key={x._id}>
                <div className="gameHistory__players">
                    <div className={x.winner === x.host.id ? "gameHistory__players__win" : ""}>
                        <p>{x.host.pseudo}</p>
                    </div>
                    <p>VS</p>
                    <div className={x.winner === x.opponent.id ? "gameHistory__players__win" : ""}>
                        <p>{x.opponent.pseudo}</p>
                    </div>
                </div>
                <p className="gameHistory__date">{x.date.toString().substr(0,10)}</p>
            </div>
        )}
        </>
    )
}


{/* <div className="gameHistory">
<div className="gameHistory__players">
    <div  className="gameHistory__players__win">
        <p>Goldaxe</p>
    </div>
    <p>VS</p>
    <div>
        <p>lol</p>
    </div>
</div>
<p>28 jan. 2021</p>
</div> */}