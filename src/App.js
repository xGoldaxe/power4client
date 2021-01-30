import React, {useState, useMemo, useEffect} from 'react'
import './main.scss'
import {BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './pages/Login'
import Accueil from './pages/Accueil'
import Register from './pages/Register'
import Game from './pages/game/Game'
import Profile from './pages/Profile'
import {UserContext} from './UserContext'
import verifyUser from './lib/setUser/verifyToken'
import Header from './component/header'
import { SocketContext } from './SocketContext'
import { io } from 'socket.io-client';

function App() {
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null)
  
  useEffect(() => {
    verifyUser(setUser)
    setSocket(io('http://localhost:8080'))
  }, [])

  const value = useMemo(() => ({user, setUser}), [])
  const valueSocket = useMemo(() => ({socket, setSocket}), [])

  return (
    <div>
        <SocketContext.Provider value={{socket, setSocket}}>
          <UserContext.Provider value={{user, setUser}}>
            <Router>
                  <Header />
                  <Route path="/" component={Accueil} exact/>
                  <Route path="/login" component={Login} exact/>
                  <Route path="/register" component={Register} exact/>
                  <Route path="/game/:slug" component={Game} exact/>
                  <Route path="/profile/:slug" component={Profile} exact/>
            </Router>
          </UserContext.Provider>
        </SocketContext.Provider>
    </div>
  );
}

export default App;
