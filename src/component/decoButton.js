import React, { useContext } from 'react'
import unsetUser from '../lib/setUser/unsetUser'
import { UserContext } from '../UserContext'
import deconnection from '../images/deco.svg'

export default function DecoButton({onClickChanger}) {
    const { user, setUser } = useContext(UserContext)

    return (
        <div 
        onClick={() => {
            unsetUser(setUser)
        }
        }>
            <img 
                src={deconnection} 
                alt="deconnection"
                width='40px'
                height='40px'
            />
        </div>
    )
}
