import { useEffect } from 'react'
import { Form, Field, useForm } from './components'

function App() {
  const form = useForm()

  useEffect(() => {
    form.setFieldValue({ username: 'default' })
  }, [form])

  return (
    <div>
      <Form<{
        username: string
        password: string
      }>
        form={form}
        onFinish={(data) => {
          console.log(data)
        }}
        onFinishFailed={(err, data) => {
          console.warn('err: ', err, 'data: ', data)
        }}
      >
        <Field
          name='username'
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <input type='text' />
        </Field>
        <Field
          name='password'
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <input type='text' />
        </Field>
        <button type='submit'>submit</button>
      </Form>
    </div>
  )
}

export default App
