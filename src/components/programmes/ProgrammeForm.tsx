import React from 'react';
import { Button, Modal, Input, Row, Col } from 'antd';
import { LoadingOutlined, BookOutlined } from '@ant-design/icons';
import { Programme } from '../../interfaces';

interface ProgrammeFormProps {
  values: Programme;
  onSubmit(values: Programme): void;
  isSubmit: boolean;
  onCloseModal(): void;
  showProgrammeFormModal: boolean;
  addProgramme: boolean;
  Form: any;
  form: any;
}

export const ProgrammeForm: React.FC<ProgrammeFormProps> = ({
  values,
  onSubmit,
  isSubmit,
  onCloseModal,
  showProgrammeFormModal,
  addProgramme,
  Form,
  form,
}) => {
  return (
    <Modal
      title={addProgramme ? 'Add Programme' : 'Update Programme'}
      maskClosable={false}
      centered
      visible={showProgrammeFormModal}
      onCancel={() => onCloseModal()}
      width={700}
      footer={[
        <Button type="default" key="cancel" onClick={() => onCloseModal()}>
          Close
        </Button>,
        <Button
          form="programmeForm"
          key="submit"
          htmlType="submit"
          type="primary"
          icon={isSubmit ? <LoadingOutlined /> : <BookOutlined />}
          disabled={isSubmit ? true : false}
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
            initialValues={values}
            onFinish={onSubmit}
            id="programmeForm"
            form={form}
          >
            <Col span={24}>
              <Form.Item
                name="programme"
                label="Programme Name"
                rules={[
                  { required: true, message: 'Programme Name is required!' },
                  {
                    min: 2,
                    message: 'Programme name must have at least 2 characters',
                  },
                ]}
              >
                <Input placeholder="Name of programme.." />
              </Form.Item>
              <Form.Item hidden={true} name="school_id">
                <Input type="text" />
              </Form.Item>
              <Form.Item hidden={true} name="id">
                <Input type="text" />
              </Form.Item>
            </Col>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};
