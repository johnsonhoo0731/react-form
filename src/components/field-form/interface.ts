export interface FieldType<TName> {
  children: React.ReactElement
  name: TName
  rules?: Array<{ required: boolean, message?: string }>
}

export interface EntitiesType<TName> {
  onStoreChange: () => void
  props: FieldType<TName>
}

export interface CallbackKey<T extends Record<string, number | string> = any> {
  onFinish?: (data: T) => void
  onFinishFailed?: (err: any[], data: T) => void
}

export interface ErrorType<TName> {
  name: TName
  message: string
}