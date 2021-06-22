import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom'

import ASideImage from '../assets/images/illustration.svg'
import LogoImg from '../assets/images/logo.svg'
import GoogleIconImg from '../assets/images/google-icon.svg'

import { ButtonPrimary } from "../components/button";
import { useAuth } from "../hooks/useAuth";

import '../styles/pages/home_and_newroom.scss'

export function Home() {
  const history = useHistory();
  const { signInWithGoogle, user } = useAuth()

  async function createRoomWithGoogle() {
    if(!user) {
      await signInWithGoogle()
    }

    history.push('/new')
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
          <form>
            <input 
              type="text"
              placeholder="Digite o codigo da sala"  
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