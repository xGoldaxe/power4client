export default function setUserFunction(json, setUser) {
    localStorage.setItem('token', json.token)
    localStorage.setItem('userId', json.userId)
    setUser({
        token: json.token,
        userId: json.userId
    })
}