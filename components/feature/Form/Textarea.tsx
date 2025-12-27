import { TextareaHTMLAttributes } from 'react'

export const Textarea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea {...props} />
  )
}
