/** @jsx jsx */
/** @jsxFrag React.Fragment */
import {jsx} from '@emotion/core'

import React from 'react'
// React Router DOM exposes a context provider that all the React Router
// components use to implicitely access the router data. We need to wrap our
// AuthenticatedApp in the router
// 🐨 import the BrowserRouter from 'react-router-dom'
import {FullPageSpinner} from './components/lib'
import * as colors from './styles/colors'
import * as authClient from './utils/auth-client'
import {useAsync} from './utils/use-async'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

function App() {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync()

  React.useEffect(() => {
    run(authClient.getUser())
  }, [run])

  const login = form => authClient.login(form).then(user => setData(user))
  const register = form => authClient.register(form).then(user => setData(user))
  const logout = () => {
    authClient.logout()
    setData(null)
  }

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return (
      <div
        css={{
          color: colors.danger,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    )
  }

  if (isSuccess) {
    const props = {user, login, register, logout}
    // 🐨 wrap the BrowserRouter around the AuthenticatedApp
    return user ? (
      <AuthenticatedApp {...props} />
    ) : (
      <UnauthenticatedApp {...props} />
    )
  }
}

export {App}