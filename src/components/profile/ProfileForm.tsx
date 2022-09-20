import React from 'react';
import { Row, Col, Input, Button } from 'antd';

interface ProfileFormProps {
  values: any;
  Form: any;
  isSubmit: boolean;
  onSubmit(values: any): void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  Form,
  isSubmit,
  values,
  onSubmit,
}) => {
  return (
    <Row>
      <Col span={24}>
        <Form
          layout="vertical"
          name="basic"
          initialValues={values}
          onFinish={onSubmit}
          id="profileForm"
        >
          <Row
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          >
            <Col span={8} sm={24} xs={24} md={8}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  { required: true, message: 'Name is required!' },
                  {
                    min: 3,
                    message: 'Name must be at least 3 characters',
                  },
                ]}
                hasFeedback
              >
                <Input placeholder="your name.." />
              </Form.Item>
            </Col>
          </Row>

          <Row
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          >
            <Col span={8} sm={24} xs={24} md={8}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Email address is required' },
                  { type: 'email', message: 'Enter a valid email address' },
                ]}
                hasFeedback
              >
                <Input placeholder="your email adress.." />
              </Form.Item>
            </Col>
          </Row>
          <Row
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          >
            <Col span={8} sm={24} xs={24} md={8}>
              <Form.Item
                name="phone"
                label="Phone Number"
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
            </Col>
          </Row>
          <Row
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          >
            <Col span={8}>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                  {isSubmit ? 'Processing..' : 'Update Profile'}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
