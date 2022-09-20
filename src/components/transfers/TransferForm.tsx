import React from 'react';
import { Button, Modal, Input, Row, Col, Select } from 'antd';
import { Student, Programme } from '../../interfaces';
import { academicYears } from '../../helpers/constants';

interface TransferFormProps {
  onSubmit(values: Student): void;
  isSubmit: boolean;
  toggleModal(): void;
  showTransferFormModal: boolean;
  Form: any;
  form: any;
  programmes: Programme[];
  values: any;
}

const { Option } = Select;

export const TransferForm: React.FC<TransferFormProps> = ({
  Form,
  form,
  isSubmit,
  toggleModal,
  onSubmit,
  programmes,
  showTransferFormModal,
  values,
}) => {
  return (
    <Modal
      title="Create Transfer Request"
      maskClosable={false}
      centered
      visible={showTransferFormModal}
      onCancel={() => toggleModal()}
      width={700}
      footer={[
        <Button type="default" key="cancel" onClick={() => toggleModal()}>
          Close
        </Button>,
        <Button
          form="studentForm"
          key="submit"
          htmlType="submit"
          type="primary"
          loading={isSubmit}
        >
          {isSubmit ? 'Saving..' : 'Save'}
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
            onFinish={onSubmit}
            id="studentForm"
            form={form}
            initialValues={values}
          >
            <Row gutter={10}>
              <Col span={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="application_number"
                  label="Application number"
                  rules={[
                    {
                      required: true,
                      message: 'Application number is required!',
                    },
                    {
                      min: 7,
                      message: 'Application number must have at least 7 digits',
                    },
                  ]}
                >
                  <Input placeholder="Application number.." />
                </Form.Item>
              </Col>
              <Col span={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="programme_id"
                  label="Programme"
                  rules={[
                    { required: true, message: 'Programme is required!' },
                  ]}
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
            </Row>
            <Row gutter={10}>
              <Col span={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="academic_year"
                  label="Academic Year"
                  rules={[
                    { required: true, message: 'Academic year is required!' },
                  ]}
                >
                  <Select placeholder="Select the academic year..">
                    {academicYears.map((aca) => (
                      <Option value={aca.value} key={aca.value}>
                        {aca.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12} md={12} sm={24} xs={24}>
                <Form.Item name="school_id" hidden={true}>
                  <Input type="text" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};
