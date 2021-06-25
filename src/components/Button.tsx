import React, { ButtonHTMLAttributes } from 'react'
import '../styles/components/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
}

export function ButtonPrimary({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button className={`button primary ${isOutlined && 'outlined'}`} {...props} />
  )
}