import {Route, Redirect, Switch} from 'react-router-dom'

import './App.css'

import LoginMovie from './components/LoginMovie'
import Account from './components/Account'

import Home from './components/Home'
import Popular from './components/Popular'

import ProtectedRoute from './components/ProtectedRoute'

import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginMovie} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/account" component={Account} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
