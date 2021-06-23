import React, { useEffect, useState } from 'react'
import CopyImage from '../assets/images/copy.svg'
import '../styles/components/room-code.scss'

type RoomCodeProps = {
  code: string
}

export function RoomCode(props: RoomCodeProps) {
  const [codeText, setCodeText] = useState('')

  function copyRoomCodeToClipboard(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()

    navigator.clipboard.writeText(props.code)
    setCodeText('Copied')
    setTimeout(() => setCodeText(props.code), 1000)
  }

  useEffect(() => {
    setCodeText(props.code)
  }, [])

  return (
    <button className="room-code" onClick={(e) => copyRoomCodeToClipboard(e)}>
      <div>
        <img src={CopyImage} alt="copiar" />
      </div>
      <span>
        {codeText.toLowerCase() !== 'copied'? 'Sala #' + codeText : codeText}
      </span>
    </button>
  )
}