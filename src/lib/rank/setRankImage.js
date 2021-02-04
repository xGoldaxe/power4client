import bronze from '../../images/rank/bronze.png'
import silver from '../../images/rank/silver.png'
import gold from '../../images/rank/gold.png'
import plat from '../../images/rank/plat.png'
import diam from '../../images/rank/diam.png'
import chall from '../../images/rank/chall.png'
import rankToReadable from './rankToReadable'

const rankImg = {bronze : bronze, silver: silver, gold: gold, platinium: plat, diamond: diam, beast: chall}

export default function setRankImage(rank) {
    return rankImg[rank.split(' ')[0]]
}