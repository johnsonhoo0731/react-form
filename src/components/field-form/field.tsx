import React, { useContext, useLayoutEffect, useReducer } from 'react'
import FieldContext from './field-context'
import { FieldType } from './interface'


export default function Field<TName extends string = string>(props: FieldType<TName>) {
  const { children, name } = props

  const useForm = useContext(FieldContext)

  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  useLayoutEffect(() => {
    const unRegister = useForm?.registerFieldEntities({
      props,
      onStoreChange: forceUpdate
    })

    return unRegister
    // eslint-disable-next-line
  }, [])

  const getControlled = () => {
    return {
      value: useForm?.getFieldValue(name) ?? '',
      onChange: (e: React.ChangeEvent<any>) => {
        const newValue = e.target.value
        useForm?.setFieldValue({
          [name]: newValue
        })
      }
    }
  }

  const returnChildNode = React.cloneElement(children, getControlled())
  return returnChildNode
}