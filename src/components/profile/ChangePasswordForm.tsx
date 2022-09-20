import React from 'react';
import { Row, Col, Input, Button, Modal } from 'antd';

interface ChangePasswordFormProps {
  Form: any;
  form: any;
  isSubmit: boolean;
  onChangePassword(values: any): void;
  onTogggleModal(): void;
  showFormModal: boolean;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  Form,
  form,
  isSubmit,
  onChangePassword,
  onTogggleModal,
  showFormModal,
}) => {
  return (
    <Modal
      title="Change Password"
      maskClosable={false}
      centered
      visible={showFormModal}
      onCancel={() => onTogggleModal()}
      width={700}
      footer={[
        <Button type="default" key="cancel" onClick={() => onTogggleModal()}>
          Close
        </Button>,
        <Button
          form="passwordForm"
          key="submit"
          htmlType="submit"
          type="primary"
          loading={isSubmit}
        >
          {isSubmit ? 'Processing..' : 'Change Password'}
        </Button>,
      ]}
    >
      <Row>
        <Col span={24}>
          <Form
            layout="vertical"
            name="basic"
            onFinish={onChangePassword}
            id="passwordForm"
            form={form}
          >
            <Row
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: '10px',
              }}
            >
              <Col span={12} sm={24} xs={24} md={8}>
                <Form.Item
                  name="old_password"
                  label="Old Password"
                  rules={[
                    { required: true, message: 'Old password is required!' },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Old password.." />
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
              <Col span={12} sm={24} xs={24} md={8}>
                <Form.Item
                  name="new_password"
                  label="New Password"
                  rules={[
                    { required: true, message: 'New password is required!' },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="New password.." />
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
              <Col span={12} sm={24} xs={24} md={8}>
                <Form.Item
                  label="Conform New Password"
                  dependencies={['new_password']}
                  name="confirm_password"
                  hasFeedback
                  rules={[
                    { required: true, message: 'Please confirm new password!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('new_password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          'The two passwords that you entered do not match!'
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm new password." />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};
