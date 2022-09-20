import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, message } from 'antd'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../helpers/appDispatch'
import { appSelector } from '../helpers/appSelector'
import { VerificationForm } from '../components/auth/VerificationForm'
import { Verification as Auth } from '../interfaces'
import { verifyRequet, clearAuthState } from '../store/auth'
import { path } from '../helpers/path'
import { constants } from '../helpers/constants'
import { messages } from '../helpers/messages'
import bg from '../images/bg.png'
import { isEmpty } from '../helpers/isEmpty'

interface VerificationProps {}

const Verification: React.FC<VerificationProps> = () => {
  const dispatch: AppDispatch = useDispatch()
  const auth = appSelector((state) => state.auth)
  const { Content } = Layout
  const [values] = useState<Auth>({
    email: auth.user!.email === null ? '' : auth.user!.email,
    code: ''
  })
  const [isSubmit, setIsSubmit] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const history = useHistory()

  useEffect(() => {
    const { isAuthenticated, user } = auth
    if (isAuthenticated) {
      history.push(path.home)
    }
    if (isEmpty(user)) {
      history.push(path.login)
    }
    dispatch(clearAuthState())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = (values: Auth) => {
    dispatch(verifyRequet(values))
  }

  useEffect(() => {
    const { success, error, isSubmitting, page } = auth
    setIsSubmit(isSubmitting)
    setError(error)
    if (success && page === constants.verify) {
      history.push(path.login)
      message.success(messages.verifySuccess, 10)
    }
  }, [auth, history])

  return (
    <Layout>
      <Helmet>
        <title>Admissions Ghana | Account Verification</title>
      </Helmet>
      <Content
        style={{
          background: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh'
        }}
      >
        <VerificationForm
          values={values}
          onSubmit={onSubmit}
          isSubmit={isSubmit}
          error={error}
        />
      </Content>
    </Layout>
  )
}

export default Verification
