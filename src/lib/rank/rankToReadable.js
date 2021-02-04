export default function rankToReadable(rank) {
    const allRanks = ['bronze', 'silver', 'gold', 'platinium', 'diamond', 'beast']
    if(Math.floor((rank)/3) > (allRanks.length-1)) {
      return allRanks[5] + ' ' + (rank-3*5+1)
    }
    return allRanks[Math.floor((rank)/3)] + ' ' + (rank%3+1)
}