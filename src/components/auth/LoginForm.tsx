import React from 'react'
import { Row, Col, Form, Input, Button, Alert } from 'antd'
import { Login, Training } from '../../interfaces'
import { isEmpty } from '../../helpers/isEmpty'
import { colors } from '../../helpers/colors'
import { Link } from 'react-router-dom'
import { path } from '../../helpers/path'

interface LoginFormProps {
  values: Login
  onSubmit(values: Login): void
  isSubmit: boolean
  error: string | null
  onToggleTrainingModal(): void
  trainings: Training[]
}

export const LoginForm: React.FC<LoginFormProps> = ({
  values,
  onSubmit,
  isSubmit,
  error,
  onToggleTrainingModal,
  trainings
}) => {
  return (
    <Row
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '150px'
      }}
    >
      <Col
        className="auth-form-container"
        style={{
          background: colors.white,
          padding: '1rem',
          borderRadius: '0.2rem',
          boxShadow: '0 .5rem 1rem rgba(255,203,170,.25)'
        }}
        sm={12}
        lg={6}
        md={12}
      >
        <h1 style={{ color: colors.blue, fontSize: '1.5rem', fontWeight: 300 }}>
          Login
        </h1>
        {!isEmpty(error) ? (
          <Alert
            type="error"
            message={JSON.stringify(error)}
            style={{ marginBottom: '10px' }}
          />
        ) : null}
        <Form
          layout="vertical"
          name="basic"
          initialValues={values}
          onFinish={onSubmit}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!'
              },
              {
                type: 'email',
                message: 'Enter a valid email address in the form john@doe.com'
              }
            ]}
            hasFeedback
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            hasFeedback
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Row style={{ marginBottom: '1.5rem' }}>
            <Col span={12}>
              <Link
                to={path.reset}
                style={{
                  color: colors.blue,
                  fontWeight: 700,
                  fontSize: '0.9rem'
                }}
              >
                Forgotten Password
              </Link>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Link
                to={path.resend}
                style={{
                  color: colors.blue,
                  fontWeight: 700,
                  fontSize: '0.9rem'
                }}
              >
                Resend Code
              </Link>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmit}>
              {isSubmit ? 'Processing..' : 'Login'}
            </Button>
          </Form.Item>
          <Row style={{ marginTop: '1.5rem' }}>
            <Col span={24}>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: colors.deepGray,
                  fontWeight: 300
                }}
              >
                No account yet?{' '}
                <Link
                  to={path.register}
                  style={{
                    color: colors.blue,
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}
                >
                  Sign Up
                </Link>
              </p>
            </Col>
          </Row>

          <Row style={{ marginTop: '1rem' }}>
            <Col span={24}>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: colors.deepGray,
                  fontWeight: 300
                }}
              >
                {!isEmpty(trainings) ? (
                  <Link
                    to="#"
                    style={{
                      color: colors.orange,
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}
                    onClick={() => onToggleTrainingModal()}
                  >
                    Register for Training
                  </Link>
                ) : null}
              </p>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}
