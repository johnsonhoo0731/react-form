import React from 'react'
import useForm from './use-form'

const FieldContext = React.createContext<ReturnType<typeof useForm> | null>(null)

export default FieldContext