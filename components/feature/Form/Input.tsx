import { InputHTMLAttributes } from 'react'

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input {...props} />
  )
}
