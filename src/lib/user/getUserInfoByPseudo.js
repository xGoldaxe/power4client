export default async function getUserInfoByPseudo(pseudo){
    const data = {
        pseudo: pseudo
    }

    const response = await fetch('http://localhost:8080/api/auth/informationpseudo', {
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            'Accept': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    const responseJson = await response.json()  // convert to json
    return responseJson
}