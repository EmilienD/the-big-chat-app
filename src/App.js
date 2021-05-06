import React from 'react'

import { Route, Switch } from 'react-router-dom'
import { Room } from './components/pages/Room'

function App() {
  return (
    <Switch>
      <Route path="/rooms/:roomName">
        {(route) => <Room roomName={(route.match.params.roomName = 'main')} />}
      </Route>
      <Route path="/terms-and-conditions">{() => 't&c'}</Route>
      <Route path="/">
        <Room roomName="main" />
      </Route>
    </Switch>
  )
}

export default App
