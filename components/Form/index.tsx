import { useState, useCallback, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { Block } from '../Block';
import styles from './styles.module.css'
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

  return (
    <form onSubmit={handleSubmit} className={styles.root}>
      <Block>
        <label htmlFor="publishedAt" className={styles.label}>公開日時</label>
        <Input
          id="publishedAtDate"
          value={getISODateString(publishedAt)}
          className={styles.dateField}
          onChange={handlePublishedAtDateChange}
          type="date"
          aria-label="公開日"
        />
        <Input
          id="publishedAtTime"
          value={getTimeString(publishedAt)}
          className={styles.timeField}
          onChange={handlePublishedAtTimeChange}
          type="time"
          aria-label="公開時刻"
        />
      </Block>

      <Block>
        <label htmlFor="title" className={styles.label}>タイトル</label>
        <Input id="title" onChange={handleTitleChange} className={styles.titleField} value={title} />
      </Block>

      <Block>
        <label htmlFor="body" className={styles.label}>本文</label>
        <Textarea id="body" onChange={handleBodyChange} className={styles.bodyField} rows={20} value={body} />
      </Block>

      <Block align="right">
        <Button type="submit" disabled={isSubmitting}>
          公開する
        </Button>
      </Block>
    </form>
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
