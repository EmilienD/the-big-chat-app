import React, { useState } from 'react'

import { Route, Switch } from 'react-router-dom'
import { Room } from './components/pages/Room'

function App() {
  const [user] = useState(JSON.parse(localStorage.getItem('user')))

  return (
    <Switch>
      <Route path="/rooms/:roomName">
        {(route) => <Room roomName={(route.match.params.roomName = 'main')} />}
      </Route>
      <Route path="/terms-and-conditions">{() => 't&c'}</Route>
      <Route path="/">
        <Room roomName="main" user={user} />
      </Route>
    </Switch>
  )
}

export default App
