export default async function sendDataLogin(pseudo, password) {
    const data = {
        pseudo: pseudo,
        password: password
    }
    let response = await fetch('https://ultimatepower4.herokuapp.com/api/auth/login', {
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            'Accept': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    return {
        status: response.status,
        value: await response.json()
    }
}