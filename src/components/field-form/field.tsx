import React, { useContext, useLayoutEffect, useReducer } from 'react'
import FieldContext from './field-context'
import { FieldType } from './interface'

export default function Field<TName extends string = string>(
  props: FieldType<TName>
) {
  const { children, name } = props

  const { getFieldValue, setFieldValue, registerFieldEntities } =
    useContext(FieldContext)

  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  useLayoutEffect(() => {
    const unRegister = registerFieldEntities({
      props,
      onStoreChange: forceUpdate,
    })

    return unRegister
    // eslint-disable-next-line
  }, [])

  const getControlled = (childProps: any = {}) => {
    return {
      ...childProps,
      value: getFieldValue(name) ?? '',
      onChange: (...args: any[]) => {
        const event = args[0]
        if (event && event.target && name) {
          const newValue = event.target.value
          setFieldValue({
            [name]: newValue,
          })
        }
      },
    }
  }
  const returnChildNode = React.Children.map(children, (child) => {
    return React.cloneElement(child, getControlled(child.props))
  })

  return <React.Fragment>{returnChildNode}</React.Fragment>
}
