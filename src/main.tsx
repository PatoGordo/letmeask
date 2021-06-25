import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './App'

import './styles/global.scss'

let theme = localStorage.getItem('theme') ?? null

if(theme === null) {
  localStorage.setItem('theme', 'light')
}

if(theme === 'dark') {
  document.querySelector('body')?.classList.add('dark')
}else{
  document.querySelector('body')?.classList.remove('dark')
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
