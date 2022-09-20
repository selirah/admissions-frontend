import React from 'react';
import { Button, Modal, Input, Row, Col, Select } from 'antd';
import { LoadingOutlined, AccountBookOutlined } from '@ant-design/icons';
import { Fee, Programme } from '../../interfaces';
import { academicYears } from '../../helpers/constants';

interface FeeFormProps {
  values: Fee;
  onSubmit(values: Fee): void;
  isSubmit: boolean;
  onCloseModal(): void;
  showFeeFormModal: boolean;
  programmes: Programme[];
  success: boolean;
  Form: any;
  form: any;
}

const { Option } = Select;

export const FeeForm: React.FC<FeeFormProps> = ({
  values,
  onSubmit,
  isSubmit,
  onCloseModal,
  showFeeFormModal,
  programmes,
  success,
  Form,
  form,
}) => {
  if (success) {
    form.resetFields();
  }

  return (
    <Modal
      title="Add Fee"
      maskClosable={false}
      centered
      visible={showFeeFormModal}
      onCancel={() => onCloseModal()}
      width={700}
      footer={[
        <Button type="default" key="cancel" onClick={() => onCloseModal()}>
          Close
        </Button>,
        <Button
          form="feeForm"
          key="submit"
          htmlType="submit"
          type="primary"
          icon={isSubmit ? <LoadingOutlined /> : <AccountBookOutlined />}
          disabled={isSubmit ? true : false}
        >
          {isSubmit ? 'Saving..' : 'Add Fee'}
        </Button>,
      ]}
    >
      <Row
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: '10px',
        }}
      >
        <Col span={24}>
          <Form
            layout="vertical"
            name="basic"
            initialValues={values}
            onFinish={onSubmit}
            id="feeForm"
            form={form}
          >
            <Col span={24}>
              <Form.Item
                name="academic_year"
                label="Academic Year"
                rules={[
                  { required: true, message: 'Academic year is required!' },
                ]}
              >
                <Select placeholder="Select the programme.." allowClear>
                  {academicYears.map((aca) => (
                    <Option value={aca.value} key={aca.value}>
                      {aca.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="programme_id"
                label="Programme"
                rules={[{ required: true, message: 'Programme is required!' }]}
              >
                <Select placeholder="Select the programme.." allowClear>
                  {programmes.map((programme) => (
                    <Option value={programme.id} key={programme.id}>
                      {programme.programme}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="amount"
                label="Amount"
                rules={[{ required: true, message: 'Fee amount is required!' }]}
              >
                <Input placeholder="Amount of fees.." />
              </Form.Item>
            </Col>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};
