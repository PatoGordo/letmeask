import React from 'react'
import { useHistory, useParams } from 'react-router'

import { useRoom } from '../hooks/useRoom'
import { db } from '../services/firebase'

import { ButtonPrimary } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { Question } from '../components/Question'

import LogoImg from '../assets/images/logo.svg'
import DeleteImg from '../assets/images/delete.svg'
import '../styles/pages/room.scss'

type RoomParams = {
  id: string
}

export function AdminRoom() {
  // const { user } = useAuth()
  const history = useHistory()
  const params = useParams<RoomParams>()
  const roomId = params.id
  const { questions, title } = useRoom(roomId)

  async function handleDeleteQuestion(questionId: string) {
    if(window.confirm('Tem certeza que você deseja excluir esta pergunta?')){
      const questionRef = await db.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  async function handleEndRoom() {
    await db.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    })
    history.push('/')
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <ButtonPrimary isOutlined onClick={() => handleEndRoom()}>Encerrar sala</ButtonPrimary>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && (<span>{questions.length} pergunta{questions.length > 1 && 's'}</span>)}
        </div>
        <div className="question-list">
          {
            questions.map((data, key) => (
              <Question content={data.content} author={data.author} key={key}>
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(data.id)}
                >
                  <img src={DeleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            ))
          }
        </div>
      </main>
    </div>
  )
}