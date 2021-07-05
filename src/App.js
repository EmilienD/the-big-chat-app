import React, { useState } from 'react'

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
