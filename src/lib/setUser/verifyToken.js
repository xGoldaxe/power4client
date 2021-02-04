import unsetUser from './unsetUser'

export default  function verifyUser(setUser) {
    const value = {
        token : localStorage.getItem('token'),
        userId : localStorage.getItem('userId')
    }
    const data = {
        userId: value.id
    }
    fetch('https://ultimatepower4.herokuapp.com/api/auth/verifyUser', {
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + value.token
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    .then((response) => {
        if(response.status === 401) {
            unsetUser(setUser)
        }
        else {
            setUser(value, setUser)
        }
    })

}