import React from 'react'
import {Router, Link} from '@reach/router'
import {useAuth} from './context/auth-context'
import ReadingListScreen from './screens/list'
import FinishedBooksScreen from './screens/finished'
import HomeScreen from './screens/home'
import DiscoverBooksScreen from './screens/discover'
import NotFound from './screens/not-found'

function AuthenticatedApp() {
  const {user, logout} = useAuth()
  return (
    <div>
      <div>
        {user.username} <button onClick={logout}>Logout</button>
      </div>
      <Nav />
      <Routes />
    </div>
  )
}

function Nav(params) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/list">Reading List</Link>
        </li>
        <li>
          <Link to="/finished">Finished Books</Link>
        </li>
        <li>
          <Link to="/discover">Discover</Link>
        </li>
      </ul>
    </nav>
  )
}

function Routes() {
  return (
    <Router>
      <HomeScreen path="/" />
      <ReadingListScreen path="/list" />
      <FinishedBooksScreen path="/finished" />
      <DiscoverBooksScreen path="/discover" />
      <NotFound default />
    </Router>
  )
}

export default AuthenticatedApp