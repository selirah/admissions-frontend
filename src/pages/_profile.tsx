import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Layout, Col, Divider, Button, message, Space, Form } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../helpers/appDispatch'
import { appSelector } from '../helpers/appSelector'
import {
  updateProfileRequest,
  clearAuthState,
  changePasswordRequest
} from '../store/auth'
import { constants } from '../helpers/constants'
import { messages } from '../helpers/messages'
import { ProfileForm } from '../components/profile/ProfileForm'
import { ChangePasswordForm } from '../components/profile/ChangePasswordForm'

const { Content } = Layout

const Profile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const {
    user,
    isSubmitting,
    success,
    error,
    failure,
    page,
    passwordChange,
    passwordChangeFailure,
    passwordChangeSuccess
  } = appSelector((state) => state.auth)
  const [initialValues, setInitialValues] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    phone: user ? user.phone : ''
  })
  const [form] = Form.useForm()
  const [showFormModal, setShowFormModal] = useState(false)

  useEffect(() => {
    dispatch(clearAuthState())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (success && page === constants.profile) {
      message.success(messages.updateProfile, 5)
      dispatch(clearAuthState())
    }

    if (failure && constants.profile) {
      message.success(JSON.stringify(error), 5)
      dispatch(clearAuthState())
    }

    if (passwordChangeSuccess && page === constants.changePassword) {
      message.success(messages.changePassword, 5)
      form.resetFields()
      dispatch(clearAuthState())
    }

    if (passwordChangeFailure && constants.changePassword) {
      message.success(JSON.stringify(error), 5)
      dispatch(clearAuthState())
    }
    setInitialValues({
      email: user!.email,
      phone: user!.phone,
      name: user!.name
    })
  }, [
    success,
    error,
    dispatch,
    passwordChangeFailure,
    passwordChangeSuccess,
    page,
    failure,
    user,
    form
  ])

  const onSubmit = (values: any) => {
    dispatch(updateProfileRequest(values))
  }

  const onChangePassword = (values: any) => {
    dispatch(changePasswordRequest(values))
  }

  const onTogggleModal = () => {
    setShowFormModal(!showFormModal)
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Admissions Ghana | Profile</title>
      </Helmet>
      <Content className="site-layout-background site-content">
        <Col span={24}>
          <Space>
            <Button
              type="primary"
              icon={<LockOutlined />}
              onClick={() => onTogggleModal()}
              className="success"
            >
              Change Password
            </Button>
          </Space>
        </Col>
        <Divider />
        <ProfileForm
          Form={Form}
          isSubmit={isSubmitting}
          onSubmit={onSubmit}
          values={initialValues}
        />
        <Col span={24}>
          <ChangePasswordForm
            Form={Form}
            form={form}
            isSubmit={passwordChange}
            onChangePassword={onChangePassword}
            onTogggleModal={onTogggleModal}
            showFormModal={showFormModal}
          />
        </Col>
      </Content>
    </React.Fragment>
  )
}

export default Profile
