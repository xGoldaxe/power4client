import React, {useMemo, useContext} from 'react'
import verifyUser from '../lib/setUser/verifyToken'
import { UserContext } from '../UserContext'


export default function Initialisor() {
    console.log("rendered")
    const { setUser } = useContext(UserContext) 

    useMemo(() => verifyUser(setUser)
    , [])

    return (
        <div>
            
        </div>
    )
}
