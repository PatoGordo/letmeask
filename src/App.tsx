import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'

import { AuthContextProvider } from './contexts/authContext'

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/new" component={NewRoom} />
      </AuthContextProvider>
    </BrowserRouter>
  )
}