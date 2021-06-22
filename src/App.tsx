import React, { useEffect, useState } from 'react'
import { db } from './services/firebase'

export function App() {
  const [dbRes, setDbRes] = useState('Not sent yet')

  useEffect(() => {
    db.ref('test').set({
      text: 'Hello World'
    })
    .then(() => {
      setDbRes('Added successfully')
    })
    .catch((err) => {
      setDbRes(err.message)
    })
  }, [])
  return (
    <h1>Data add test: {dbRes}</h1>
  )
}