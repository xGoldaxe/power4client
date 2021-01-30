import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router'
import getUserInfoById from '../lib/getUserInfoById'

export default function UserView({userId}) {    
    const [state, setState] = useState({
        userInfo: {},
        loading: true
    })

    let history = useHistory();

    useEffect(function() {
        (async function() {
            const userInfo = await getUserInfoById(userId)
            setState({
                userInfo: userInfo,
                loading: false
            })
        })()
    }, [userId])   



    return (
        <>
            {state.loading === true ? "loading ..." :
                <div onClick={() => history.push(`/profile/${state.userInfo.pseudo}`)}>{state.userInfo.pseudo}</div>
            }
        </>
    )
}
