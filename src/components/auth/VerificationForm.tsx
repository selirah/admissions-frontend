import React from 'react'
import { Row, Col, Form, Input, Button, Alert } from 'antd'
import { Verification } from '../../interfaces'
import { isEmpty } from '../../helpers/isEmpty'
import { colors } from '../../helpers/colors'

interface VerificationFormProps {
  values: Verification
  onSubmit(values: Verification): void
  isSubmit: boolean
  error: string | null
}

export const VerificationForm: React.FC<VerificationFormProps> = ({
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
          Verify your account
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
          <Form.Item name="email" label="Email" hasFeedback>
            <Input placeholder="Enter your email address.." disabled />
          </Form.Item>
          <Form.Item
            name="code"
            label="Code"
            rules={[
              { required: true, message: 'Please input your activation code!' }
            ]}
            hasFeedback
          >
            <Input placeholder="Enter your activation code.." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={isSubmit}>
              {isSubmit ? 'Processing..' : 'Verify Account'}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}
