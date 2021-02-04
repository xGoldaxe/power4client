export default async function getUserInfoById(userId){
    const data = {
        userId: userId
    }

    let response = await fetch('https://ultimatepower4.herokuapp.com/api/auth/informationuser', {
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            'Accept': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    response = await response.json()  // convert to json
    return response
}