import { useState, useCallback, InputHTMLAttributes, TextareaHTMLAttributes, useEffect } from 'react';
import { Block } from '../Block';
import { Button } from '../Button/index';
import { getISODateString, getFullTimeString, getTimeString } from '../../utils/datetime';

export type Value = {
  title: string;
  body: string;
  publishedAt: Date;
}

type ReturnBySubmit = {
  isSuccess: boolean;
}
type Props = {
  onSubmit: (value: Value) => Promise<ReturnBySubmit>;
  value?: Value;
}

export const Form = (props: Props) => {
  const [title, setTitle] = useState<string>(props.value?.title || "")
  const [body, setBody] = useState<string>(props.value?.body || "")
  const [publishedAt, setPublishedAt] = useState<Date>(props.value?.publishedAt || new Date())
  const [isSubmitting, setSubmitting] = useState<boolean>(false)

  const handlePublishedAtDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateString = e.target.value
    const newDate = new Date(`${newDateString} ${getFullTimeString(publishedAt)}`)
    setPublishedAt(newDate)
  }, [publishedAt])

  const handlePublishedAtTimeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newTimeString = e.target.value
    const newDate = new Date(`${getISODateString(publishedAt)} ${newTimeString}:00`)
    setPublishedAt(newDate)
  }, [publishedAt])

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }, [])

  const handleBodyChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value)
  }, [])

  const resetForm = useCallback(() => {
    setTitle("")
    setBody("")
    setPublishedAt(new Date())
  }, [])

  const handleSubmit = useCallback(async (e: any) => {
    e.preventDefault()
    setSubmitting(true)
    const result = await props.onSubmit({ publishedAt, title, body, })
    if (result.isSuccess) {
      alert('記事を作成しました')
    } else {
      alert('記事を作成できませんでした')
    }
    setSubmitting(false)
    resetForm()
  }, [props.onSubmit, title, body, publishedAt])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPublishedAt(new Date())
    }, 30000)

    return () => { clearInterval(intervalId) }
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <Block>
        <label htmlFor="publishedAt" className="block">公開日時</label>
        <Input
          id="publishedAtDate"
          value={getISODateString(publishedAt)}
          className="border p-1 rounded-md mt-1"
          onChange={handlePublishedAtDateChange}
          type="date"
          aria-label="公開日"
        />
        <Input
          id="publishedAtTime"
          value={getTimeString(publishedAt)}
          className="ml-2 border p-1 rounded-md"
          onChange={handlePublishedAtTimeChange}
          type="time"
          aria-label="公開時刻"
        />
      </Block>

      <Block>
        <label htmlFor="title" className="block">タイトル</label>
        <Input id="title" onChange={handleTitleChange} className="p-2 w-full border rounded-sm mt-1" value={title} />
      </Block>

      <Block>
        <label htmlFor="body" className="block">本文</label>
        <Textarea id="body" onChange={handleBodyChange} className="p-2 w-full border rounded-sm mt-1" rows={20} value={body} />
      </Block>

      <div className="flex justify-end gap-2 w-full">
        <Button type="button" disabled={isSubmitting}>
          下書き保存
        </Button>
        <Button type="submit" disabled={isSubmitting} theme="primary">
          公開する
        </Button>
      </div>
    </form >
  )
}

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input {...props} />
  )
}

const Textarea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea {...props} />
  )
}
