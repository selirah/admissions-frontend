import React from 'react';
import { Button, Modal, Input, Row, Col, Select, DatePicker } from 'antd';
import { Training } from '../../interfaces';
import { years } from '../../helpers/constants';

interface TrainingFormProps {
  values: Training;
  onSubmit(values: Training): void;
  isSubmit: boolean;
  onCloseModal(): void;
  showTrainingFormModal: boolean;
  addTraining: boolean;
  Form: any;
  form: any;
}

const { Option } = Select;

export const TrainingForm: React.FC<TrainingFormProps> = ({
  values,
  onSubmit,
  isSubmit,
  onCloseModal,
  showTrainingFormModal,
  addTraining,
  Form,
  form,
}) => {
  return (
    <Modal
      title={addTraining ? 'Create Training' : 'Update Training'}
      maskClosable={false}
      centered
      visible={showTrainingFormModal}
      onCancel={() => onCloseModal()}
      width={700}
      footer={[
        <Button type="default" key="cancel" onClick={() => onCloseModal()}>
          Close
        </Button>,
        <Button
          form="trainingForm"
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
            initialValues={values}
            onFinish={onSubmit}
            id="trainingForm"
            form={form}
          >
            <Row>
              <Col span={24}>
                <Form.Item
                  name="year"
                  label="Year"
                  rules={[{ required: true, message: 'Year is required!' }]}
                >
                  <Select placeholder="Select the year.." allowClear>
                    {years.map((year) => (
                      <Option value={year.value} key={year.value}>
                        {year.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="location"
                  label="Venue"
                  rules={[
                    { required: true, message: 'Venue is required!' },
                    {
                      min: 3,
                      message: 'Venue must have at least 3 characters',
                    },
                  ]}
                >
                  <Input placeholder="Venue.." />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="date"
                  label="Date & Time"
                  rules={[{ required: true, message: 'Date is required!' }]}
                >
                  <DatePicker
                    showTime
                    placeholder="Choose date and time"
                    style={{ width: '100%' }}
                    format="MMMM D, YYYY (h:mm a)"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="id" hidden={true}>
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
