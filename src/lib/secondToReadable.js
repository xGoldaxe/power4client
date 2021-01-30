export default function secondToReadable(time) {
    let seconds = time%60
    if(seconds<10) {
        seconds = '0' + seconds
    }
    return Math.floor(time/60) + ':' + seconds
}