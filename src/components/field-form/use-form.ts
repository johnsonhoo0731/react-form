import { useRef } from 'react'
import {
  FormInstance,
  EntitiesType,
  CallbackKey,
  ErrorType,
  RegisterEntities,
  Store
} from './interface'

class FormStore<T extends Store> {
  private store: T
  private fieldEntities = [] as EntitiesType<keyof T>[]
  private callbacks = {} as CallbackKey<T>
  constructor() {
    this.store = {} as T
  }
  private setCallbacks = (callback: CallbackKey) => {
    this.callbacks = {
      ...this.callbacks,
      ...callback,
    }
  }
  private registerFieldEntities = (entity: RegisterEntities<T>) => {
    this.fieldEntities.push(entity)

    return () => {
      this.fieldEntities = this.fieldEntities.filter(
        (item) => item.props.name !== entity.props.name
      )
      delete this.store[entity.props.name]
    }
  }
  private getFieldsValue = () => {
    return { ...this.store }
  }
  private getFieldValue = (name: keyof T) => {
    return this.store[name]
  }
  private setFieldValue = (newStore: T) => {
    this.store = {
      ...this.store,
      ...newStore,
    }
    this.fieldEntities.forEach((entity) => {
      entity.onStoreChange()
    })
  }
  private validate = () => {
    const err = [] as ErrorType<keyof T>[]

    this.fieldEntities.forEach((entity) => {
      const { name, rules } = entity.props
      const value = this.getFieldValue(name)

      if (
        rules &&
        rules[0] &&
        rules[0].required &&
        (value === undefined || value === '')
      ) {
        err.push({ message: rules[0].message ?? '', name })
      }
    })
    return err
  }
  private submit = () => {
    const err = this.validate()

    if (err.length === 0) {
      // pass
      this.callbacks.onFinish?.(this.getFieldsValue())
    } else {
      this.callbacks.onFinishFailed?.(err, this.getFieldsValue())
    }
  }

  getForm = () => {
    return {
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setFieldValue: this.setFieldValue,
      registerFieldEntities: this.registerFieldEntities,
      submit: this.submit,
      setCallbacks: this.setCallbacks,
    }
  }
}

export default function useForm<T extends Store>(
  form?: FormInstance<T>
) {
  const formRef = useRef<FormInstance<T> | null>(null)

  if (form) {
    formRef.current = form
  } else {
    if (!formRef.current) {
      const formStore = new FormStore<T>()
      formRef.current = formStore.getForm()
    }
  }

  return formRef.current
}
