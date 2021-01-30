import React, { useContext } from 'react'
import UserView from './userView'
import profilePicture from '../images/pierre.jpg'
import { UserContext } from '../UserContext'
import DecoButton from './decoButton'


export default function Header() {
    const { user, setUser } = useContext(UserContext)

    return <header>
        <div className="header">
        {user ? <>
                <div>
                    <DecoButton onClickChanger={setUser}/>
                </div>
                <div className="header__user">
                    <UserView userId={user.userId}/>
                    <div className="profilePicture">
                        <img 
                            alt="profilePicture" 
                            src={profilePicture}
                            width='40px'
                            heigh='40px'
                        />
                        <div className="profilePicture__connectionState"></div>
                    </div>
                </div>
            </>
            :
            <>
                <p>You are not connected</p>
            </>
        }
        </div>
    </header>
}
