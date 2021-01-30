import React, { useRef, useState, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { UserContext } from '../UserContext'
import setUserFunction from '../lib/setUser/setUser'
import sendDataLogin from '../lib/setUser/login/sendDataLogin'

export default function Login() {
    const { user, setUser } = useContext(UserContext)

    const [loginError, setLoginError] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const handleClick = async(e, pseudo, password) => {
        e.preventDefault()
        setLoginError(false)
        let connexion = await sendDataLogin(pseudo, password)
        if(connexion.status === 200) {
            setLoginError(false)
            setUserFunction(connexion.value, setUser)
            setRedirect(true)//only for re-render
        } else {
            setLoginError(true)
        }
    }

    const refPseudo = useRef();
    const refPass = useRef();

    return (
        <div>
            {user && <Redirect to="/" />}
            <h1>Login</h1>
            <div className="accueil">
                <form>
                    <div>
                        <label htmlFor="pseudo">Pseudo :</label>
                        <input type="pseudo" name="pseudo" ref={refPseudo}></input>
                    </div>
                    <div>
                        <label htmlFor="password">Password :</label>
                        <input type="password" name="password" ref={refPass}></input>
                    </div>
                    <button onClick={(e)=> handleClick(e, refPseudo.current.value, refPass.current.value)}>Connexion</button>
                    {loginError && <p className="error">wrong password / login combinaison</p>}
                </form>
                <Link to="/register">
                    <p>I dont have account.</p>
                </Link>
            </div>
        </div>
    )
}
