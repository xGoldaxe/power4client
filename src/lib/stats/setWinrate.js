export default function setWinrate(wins, loses) {
    if(wins+loses === 0) {
        return (50).toPrecision(4)
    }
    return (( 100 * wins ) / (wins+loses) ).toPrecision(4)
}