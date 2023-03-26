import React from 'react'
import FieldContext from './field-context'
import useForm from './use-form'

interface Props<T extends Record<string, number | string>> {
  children?: React.ReactNode
  onFinish?: (data: T) => void
  onFinishFailed?: (err: any[], data: T) => void
  form: ReturnType<typeof useForm>
}

export default function Form<T extends Record<string, string | number>>({
  children,
  form,
  onFinish,
  onFinishFailed,
}: Props<T>) {
  if (onFinish) {
    form.setCallbacks({
      onFinish,
    })
  }

  if (onFinishFailed) {
    form.setCallbacks({
      onFinishFailed,
    })
  }

  return (
    <form
      autoComplete='off'
      onSubmit={(e) => {
        e.preventDefault()
        form.submit()
      }}
    >
      <FieldContext.Provider value={form}>{children}</FieldContext.Provider>
    </form>
  )
}
