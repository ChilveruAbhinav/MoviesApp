import {Route, Redirect, Switch} from 'react-router-dom'

import './App.css'
import MovieDetails from './components/MovieDetails'
import LoginMovie from './components/LoginMovie'
import Account from './components/Account'
import SearchContainer from './components/SearchContainer'
import Home from './components/Home'
import Popular from './components/Popular'

import ProtectedRoute from './components/ProtectedRoute'

import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginMovie} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/search" component={SearchContainer} />
    <ProtectedRoute exact path="/account" component={Account} />
    <ProtectedRoute exact path="/movies/:id" component={MovieDetails} />
    <Route component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
