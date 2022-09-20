import React from 'react'
import { Row, Col, Form, Input, Button, Alert } from 'antd'
import { ResendReset } from '../../interfaces'
import { isEmpty } from '../../helpers/isEmpty'
import { Link } from 'react-router-dom'
import { colors } from '../../helpers/colors'
import { path } from '../../helpers/path'

interface ResendFormProps {
  values: ResendReset
  onSubmit(values: ResendReset): void
  isSubmit: boolean
  error: string | null
}

export const ResendForm: React.FC<ResendFormProps> = ({
  values,
  onSubmit,
  isSubmit,
  error
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
      >
        <h1 style={{ color: colors.blue, fontSize: '1.5rem', fontWeight: 300 }}>
          Resend verification code
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
            <Input placeholder="Enter your email address.." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmit}>
              {isSubmit ? 'Processing..' : 'Resend'}
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
                Account already activated?{' '}
                <Link
                  to={path.login}
                  style={{
                    color: colors.blue,
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}
                >
                  Log in
                </Link>
              </p>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}
