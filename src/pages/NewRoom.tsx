import React, { FormEvent, useState } from "react";
import { Link, useHistory } from 'react-router-dom'

import ASideImage from '../assets/images/illustration.svg'
import LogoImg from '../assets/images/logo.svg'

import { ButtonPrimary } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { db } from "../services/firebase";

import '../styles/pages/home_and_newroom.scss'

export function NewRoom() {
  const { user } = useAuth()
  const history = useHistory()
  const [roomName, setRoomName] = useState('')

  async function handleCreateRoom(e: FormEvent) {
    e.preventDefault()

    if(roomName.trim() === '') {
      return
    }

    const roomRef = db.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: roomName,
      authorId: user?.id
    })

    history.push(`/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id="home-component">
      <aside>
        <img src={ASideImage} alt="Ilustração representando perguntas e respostas" />
        <strong>Crie salas de Q&A ao-vivo</strong>
        <p>Tire as duvidas da sua audiencia em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={LogoImg} alt="LetMeAsk logo" />
          <h2 className="create_new_room_h2">Criar uma nova sala</h2>
          <form onSubmit={(e) => handleCreateRoom(e)}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(e) => setRoomName(e.target.value)}
              value={roomName}
              required
            />
            <ButtonPrimary type="submit">
              Criar sala
            </ButtonPrimary>
          </form>
          <p className="create_new_room_p">
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}