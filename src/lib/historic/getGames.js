export default async function getGames(userId) {
    const data = {
        userId: userId
    }
    let response = await fetch('http://localhost:8080/api/auth/historic/getGames', {
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            'Accept': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    response = await response.json()
    return(response)
}