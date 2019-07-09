import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { SignIn, SignUp, Assets } from './pages'
import { GlobalStyle } from './globalStyles'

const history = createBrowserHistory()

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/signin" component={() => <SignIn history={history} />} />
        <Route path="/signup" component={() => <SignUp history={history} />} />
        <Route path="/assets" component={() => <Assets />} />
      </Switch>
      <GlobalStyle />
    </Router>
  )
}

export default App
