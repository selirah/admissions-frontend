import React from 'react';
import { Row, Col, Form, Input, Button, Alert, Checkbox } from 'antd';
import { Register } from '../../interfaces';
import { isEmpty } from '../../helpers/isEmpty';
import { colors } from '../../helpers/colors';
import { Link } from 'react-router-dom';
import { path } from '../../helpers/path';

interface RegisterFormProps {
  values: Register;
  onSubmit(values: Register): void;
  isSubmit: boolean;
  error: string | null;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  values,
  onSubmit,
  isSubmit,
  error,
}) => {
  return (
    <Row
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '50px',
        marginBottom: '50px',
      }}
    >
      <Col
        className="auth-form-container"
        style={{
          background: colors.white,
          padding: '1rem',
          borderRadius: '0.2rem',
          boxShadow: '0 .5rem 1rem rgba(255,203,170,.25)',
        }}
      >
        <h1 style={{ color: colors.blue, fontSize: '1.5rem', fontWeight: 300 }}>
          Register
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
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your full name!',
              },
              {
                min: 5,
                message: 'Name should have at least 5 characters',
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Full name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'Enter a valid email address in the form john@doe.com',
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input phone number in the form 02XXXXXXXX',
              },
              {
                min: 10,
                message: 'Phone number must be 10 numbers',
              },
              {
                max: 10,
                message: 'Phone number must be 10 numbers',
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Phone in the form 02XXXXXXXX. Only one phone number" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            hasFeedback
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            dependencies={['password']}
            name="confirm_password"
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    'The two passwords that you entered do not match!'
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password." />
          </Form.Item>
          <Form.Item
            name="agree"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: 'Please agree to terms and conditions',
              },
            ]}
            hasFeedback
          >
            <Checkbox>
              I agree to{' '}
              <Link
                to={path.terms}
                style={{
                  color: colors.blue,
                  fontWeight: 700,
                  fontSize: '0.9rem',
                }}
              >
                terms and conditions
              </Link>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmit}>
              {isSubmit ? 'Processing..' : 'Register'}
            </Button>
          </Form.Item>
          <Row style={{ marginTop: '1.5rem' }}>
            <Col span={24}>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: colors.deepGray,
                  fontWeight: 300,
                }}
              >
                Already has an account?{' '}
                <Link
                  to={path.login}
                  style={{
                    color: colors.blue,
                    fontWeight: 700,
                    fontSize: '0.9rem',
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
  );
};
