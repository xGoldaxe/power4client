import React, { useRef, useState, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import sendDataLogin from '../lib/setUser/login/sendDataLogin'
import setUserFunction from '../lib/setUser/setUser'
import { UserContext } from '../UserContext'

//http://localhost:3000/api/auth/signup
export default function Register() {

    const { user, setUser } = useContext(UserContext)

    const [pseudoError, setPseudoError] = useState(false)
    const [passError, setPassError] = useState(false)
    const [PseudoAlreadyUse, setPseudoAlreadyUse] = useState(false)

    async function sendDataRegister(e) {
        e.preventDefault()
        const data = {
            pseudo: refPseudo.current.value,
            password: refPass.current.value
        }
        if(data.pseudo.length < 3 || data.password.length < 4) {
            if(data.pseudo.length < 3) {
                setPseudoError(true)
            }
            if(data.password.length < 4) {
                setPassError(true)
            }
            return ''
        }
        else {
            setPseudoError(false)
            setPassError(false)
            setPseudoAlreadyUse(false)
            let response = await fetch('http://localhost:8080/api/auth/signup', {
                headers: {
                    "Content-type": "application/json;charset=UTF-8",
                    'Accept': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            }).catch(()=> {
                setPseudoAlreadyUse(true)
            })
            if(response.status === 201) {
                const connexion = await sendDataLogin(data.pseudo, data.password)
                if(connexion.status === 200) {
                    setUserFunction(connexion.value, setUser)
                } 
            }
        }
    }

    const refPseudo = useRef();
    const refPass = useRef();

    return (
        <div>
            {user !== null && <Redirect to="/" />}
            <h1>Register</h1>
            <div className="accueil">
                <form>
                    <div>
                        <label htmlFor="pseudo">Pseudo :</label>
                        <input type="pseudo" name="pseudo" ref={refPseudo}></input>
                        {pseudoError && <p className="error">Must contain 3 charachters minimum !</p>}
                        {PseudoAlreadyUse && <p className="error">This pseudo is already used</p>}
                    </div>
                    <div>
                        <label htmlFor="password">Password :</label>
                        <input type="password" name="password" ref={refPass}></input>
                        {passError && <p className="error">Must contain 4 charachters minimum !</p>}
                    </div>
                    <button onClick={(e) => sendDataRegister(e)}>Create my account</button>
                </form>
                <Link to="/login">
                    <p>I already have an account.</p>
                </Link>
            </div>
        </div>
    )
}
