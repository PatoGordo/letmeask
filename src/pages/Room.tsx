import React, { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import LogoImg from '../assets/images/logo.svg'
import { ButtonPrimary } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { db } from '../services/firebase'
import '../styles/pages/room.scss'

type RoomParams = {
  id: string
}
type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}>

export function Room() {
  const { user } = useAuth()
  const params = useParams<RoomParams>()
  const [newQuestion, setNewQuestion] = useState('')
  const roomId = params.id

  useEffect(() => {
    const roomRef = db.ref(`rooms/${roomId}`)

    roomRef.once('value', room => {
      const firebaseQuestions: FirebaseQuestions = room.val().questions ?? {}

      const toArray = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
        }
      })

      console.log(toArray)

    })
  }, [roomId])

  async function handleSendQuestion(e: FormEvent) {
    e.preventDefault()

    if(newQuestion.trim() === '') {
      return
    }

    if(!user) {
      throw new Error('You must be logged in')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false
    }

    await db.ref(`rooms/${roomId}/questions`).push(question)
    setNewQuestion('')
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala react</h1>
          <span>4 perguntas</span>
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            onChange={(e) => setNewQuestion(e.target.value)}
            value={newQuestion}
            placeholder="Qual é a sua pergunta?"
          />
          <div className="form-footer">
            {!user ? 
            (<span>Para enviar uma pergunta, <button>faça seu login</button></span>) : (<div className="user-info">
              <img src={user.avatar} alt={user.name} />
              <span>{user.name}</span>
            </div>)}
            <ButtonPrimary type="submit" disabled={!user}>Enviar pergunta</ButtonPrimary>
          </div>
        </form>
      </main>
    </div>
  )
}