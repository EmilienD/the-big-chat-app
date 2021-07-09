import React, { useEffect, useState } from 'react'

import { Redirect, Route, Switch } from 'react-router-dom'
import { Room } from './components/pages/Room'
import { Login } from './components/pages/Login'

function App() {
  let storedUser
  try {
    storedUser = JSON.parse(localStorage.getItem('user') || 'null')
  } catch (e) {
    localStorage.removeItem('user')
  }
  const [user, setUser] = useState(storedUser)
  // Quick fix: auto-reload after long time without focus, to prevent websocket disconnection on mobile
  const [focusLostTime, setFocusLostTime] = useState(0)
  useEffect(() => {
    const handleBlur = () => setFocusLostTime(Date.now())
    const handleFocus = () => {
      if (Date.now() - focusLostTime > 180000) {
        location.reload()
      }
    }
    window.addEventListener('blur', handleBlur)
    window.addEventListener('focus', handleFocus)
    return () => {
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('focus', handleFocus)
    }
  }, [focusLostTime])

  return (
    <Switch>
      <Route path="/rooms/:roomName">
        {(route) => (
          <Room
            roomName={route.match.params.roomName}
            user={user}
            setCrown={(crown) => {
              const updatedUser = { ...user, crown }
              localStorage.setItem('user', JSON.stringify(updatedUser))
              setUser(updatedUser)
            }}
          />
        )}
      </Route>
      <Route path="/terms-and-conditions">{() => 't&c'}</Route>
      <Route path="/login">
        {user ? (
          <Redirect to="/" />
        ) : (
          <Login
            onLogin={(user) => {
              setUser(user)
              localStorage.setItem('user', JSON.stringify(user))
            }}
          />
        )}
      </Route>
      {user ? '' : <Redirect to="/login" />}
      <Route path="/">
        <Room
          roomName="main"
          user={user}
          setCrown={(crown) => {
            const updatedUser = { ...user, crown }
            localStorage.setItem('user', JSON.stringify(updatedUser))
            setUser(updatedUser)
          }}
        />
      </Route>
    </Switch>
  )
}

export default App
