export default function unsetUser(setUser) {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    setUser(null)
}