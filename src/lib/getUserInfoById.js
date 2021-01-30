export default async function getUserInfoById(userId){
    const data = {
        userId: userId
    }

    const response = await fetch('http://localhost:8080/api/auth/informationuser', {
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            'Accept': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    const responseJson = await response.json()  // convert to json
    return {
        pseudo : responseJson.pseudo
    } 
}