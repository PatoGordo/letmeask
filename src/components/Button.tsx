import React, { ButtonHTMLAttributes } from 'react'
import '../styles/components/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function ButtonPrimary(props: ButtonProps) {
  return (
    <button className="button primary" {...props} />
  )
}