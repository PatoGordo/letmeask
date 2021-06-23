import React, { FormEvent, useState } from "react";
import { useHistory } from 'react-router-dom'

import ASideImage from '../assets/images/illustration.svg'
import LogoImg from '../assets/images/logo.svg'
import GoogleIconImg from '../assets/images/google-icon.svg'

import { ButtonPrimary } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

import '../styles/pages/home_and_newroom.scss'
import { db } from "../services/firebase";

export function Home() {
  const history = useHistory();
  const { signInWithGoogle, user } = useAuth()
  const [roomCode, setRoomCode] = useState('')

  async function createRoomWithGoogle() {
    if(!user) {
      await signInWithGoogle()
    }

    history.push('/new')
  }

  async function handleJoinRoom(e: FormEvent) {
    e.preventDefault()

    if(roomCode.trim() === '') {
      return
    }

    const roomRef = await db.ref(`rooms/${roomCode}`).get()

    if(!roomRef.exists()) {
      alert('😕 This room was closed, or not exists.')
      return
    }

    history.push(`/rooms/${roomCode}`)
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
          <button onClick={() => createRoomWithGoogle()} className="auth-google">
            <img src={GoogleIconImg} alt="Google logo" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={(e) => handleJoinRoom(e)}>
            <input 
              type="text"
              placeholder="Digite o codigo da sala"
              onChange={(e) => setRoomCode(e.target.value)}
              value={roomCode}
              required
            />
            <ButtonPrimary type="submit">
              Entrar na sala
            </ButtonPrimary>
          </form>
        </div>
      </main>
    </div>
  )
}