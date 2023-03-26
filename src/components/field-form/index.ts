import _Form from './form'
import Field from './field'
import useForm from './use-form'

type OriginFormType = typeof _Form

type ExportFormType = {
  Field: typeof Field
  useForm: typeof useForm
} & OriginFormType

const Form = _Form as ExportFormType
Form.Field = Field
Form.useForm = useForm

export default Form
export { Field, useForm, Form }