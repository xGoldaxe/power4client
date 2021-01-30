export default async function sendDataLogin(pseudo, password) {
    const data = {
        pseudo: pseudo,
        password: password
    }
    let response = await fetch('http://localhost:8080/api/auth/login', {
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