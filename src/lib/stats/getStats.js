import setWinrate from "./setWinrate"

export default async function getStats(userId){
    const data = {
        userId: userId
    }

    let response = await fetch('https://ultimatepower4.herokuapp.com/', {
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            'Accept': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    response = await response.json()  // convert to json
    response.stats = {
        ...response.stats,
        winrate: setWinrate(response.stats.wins, response.stats.loses)
    }
    return response.stats 
}