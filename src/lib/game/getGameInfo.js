export default async function getGameInfo(gameId) {
    const data = {
        gameId: gameId
    }
    const response = await fetch('https://ultimatepower4.herokuapp.com/api/auth/game/information', {
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            'Accept': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    const responseJson = await response.json()  // convert to json
    return responseJson.game
}
