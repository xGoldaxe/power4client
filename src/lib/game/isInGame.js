export default async function isInGame(userId) {
    
    const data = {
        userId: userId
    }
    let response = await fetch('http://localhost:8080/api/auth/game/isingame', {
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            'Accept': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    response = await response.json()  // convert to json
    return response.gameInfo
}
