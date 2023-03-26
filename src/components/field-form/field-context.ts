import React from 'react'
import useForm from './use-form'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const warningFunc: any = () => {
  console.warn('Can not find FieldContext. Please make sure you wrap Field under Form.');
};

const FieldContext = React.createContext<ReturnType<typeof useForm>>({
  getFieldsValue: warningFunc,
  getFieldValue: warningFunc,
  setFieldValue: warningFunc,
  registerFieldEntities: warningFunc,
  submit: warningFunc,
  setCallbacks: warningFunc,
})

export default FieldContext