import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, message } from 'antd'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../helpers/appDispatch'
import { appSelector } from '../helpers/appSelector'
import { ResetForm } from '../components/auth/ResetForm'
import { ResendReset } from '../interfaces'
import { resetRequest, clearAuthState } from '../store/auth'
import { path } from '../helpers/path'
import { constants } from '../helpers/constants'
import { messages } from '../helpers/messages'
import bg from '../images/bg.png'

interface ResetProps {}

const Reset: React.FC<ResetProps> = () => {
  const dispatch: AppDispatch = useDispatch()
  const auth = appSelector((state) => state.auth)
  const { Content } = Layout
  const [values] = useState<ResendReset>({
    email: ''
  })
  const [isSubmit, setIsSubmit] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const history = useHistory()

  useEffect(() => {
    const { isAuthenticated } = auth
    if (isAuthenticated) {
      history.push(path.home)
    }
    dispatch(clearAuthState())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = (values: ResendReset) => {
    dispatch(resetRequest(values))
  }

  useEffect(() => {
    const { success, error, isSubmitting, page } = auth
    setIsSubmit(isSubmitting)
    setError(error)
    if (success && page === constants.reset) {
      history.push(path.login)
      message.success(messages.resetSuccess, 10)
    }
  }, [auth, history])

  return (
    <Layout>
      <Helmet>
        <title>Admissions Ghana | Reset Password</title>
      </Helmet>
      <Content
        style={{
          background: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh'
        }}
      >
        <ResetForm
          values={values}
          onSubmit={onSubmit}
          isSubmit={isSubmit}
          error={error}
        />
      </Content>
    </Layout>
  )
}

export default Reset
