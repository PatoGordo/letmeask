import React from "react";
import { Link } from 'react-router-dom'

import ASideImage from '../assets/images/illustration.svg'
import LogoImg from '../assets/images/logo.svg'

import { ButtonPrimary } from "../components/button";
import { useAuth } from "../hooks/useAuth";

import '../styles/pages/home_and_newroom.scss'

export function NewRoom() {
  const { user } = useAuth()

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
          <form>
            <input
              type="text"
              placeholder="Nome da sala"
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