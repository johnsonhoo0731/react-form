import React from 'react'
import FieldContext from './field-context'
import { ErrorType } from './interface'
import useForm from './use-form'

interface Props<T extends Record<string, number | string>> {
  children?: React.ReactNode
  onFinish?: (data: T) => void
  onFinishFailed?: (err: ErrorType<keyof T>[], data: T) => void
  form?: ReturnType<typeof useForm>
}

export default function Form<T extends Record<string, string | number>>({
  children,
  form,
  onFinish,
  onFinishFailed,
}: Props<T>) {
  const formInstance = useForm(form)

  formInstance.setCallbacks({
    onFinish,
    onFinishFailed,
  })

  return (
    <form
      autoComplete='off'
      onSubmit={(e) => {
        e.preventDefault()
        formInstance.submit()
      }}
    >
      <FieldContext.Provider value={formInstance}>{children}</FieldContext.Provider>
    </form>
  )
}
