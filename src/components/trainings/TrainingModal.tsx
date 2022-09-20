import React from 'react'
import { Modal, Row, Col, Button, Select, Input, Upload } from 'antd'
import { Training, School } from '../../interfaces'

interface TrainingModalProps {
  values: any
  onSubmit(values: any): void
  isSubmit: boolean
  onToggleTrainingModal(): void
  showTrainingModal: boolean
  Form: any
  form: any
  schools: School[]
  trainings: Training[]
  handleChangePicOne(info: any): void
  handleChangePicTwo(info: any): void
  imageUrlOne: string
  imageUrlTwo: string
  beforeUpload(file: File): boolean
  uploadButton: React.ReactNode
}

const { Option } = Select

export const TrainingModal: React.FC<TrainingModalProps> = ({
  Form,
  form,
  isSubmit,
  onSubmit,
  onToggleTrainingModal,
  showTrainingModal,
  values,
  schools,
  trainings,
  beforeUpload,
  handleChangePicOne,
  handleChangePicTwo,
  imageUrlOne,
  imageUrlTwo,
  uploadButton
}) => {
  return (
    <Modal
      title="Register for Training"
      maskClosable={false}
      centered
      visible={showTrainingModal}
      onCancel={() => onToggleTrainingModal()}
      width={700}
      footer={[
        <Button
          type="default"
          key="cancel"
          onClick={() => onToggleTrainingModal()}
        >
          Close
        </Button>,
        <Button
          form="trainingForm"
          key="submit"
          htmlType="submit"
          type="primary"
          loading={isSubmit}
        >
          {isSubmit ? 'Registering..' : 'Register'}
        </Button>
      ]}
    >
      <Row
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: '10px'
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
            <Row gutter={10}>
              <Col span={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="school_id"
                  label="Select School"
                  rules={[{ required: true, message: 'School is required!' }]}
                >
                  <Select
                    allowClear
                    placeholder="Select the school.."
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input: any, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {schools.map((school) => (
                      <Option value={school.id} key={school.id}>
                        {school.school_name.toUpperCase()}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="training_id"
                  label="Select Venue"
                  rules={[{ required: true, message: 'Venue is required!' }]}
                >
                  <Select
                    placeholder="Select the school.."
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input: any, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {trainings.map((training) => (
                      <Option value={training.id} key={training.id}>
                        {training.location.toUpperCase()}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <h4
              style={{
                color: '#2196F3'
              }}
            >
              Details of First Representative
            </h4>
            <Row gutter={10}>
              <Col span={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="name_one"
                  label="Name"
                  rules={[
                    { required: true, message: 'Name is required!' },
                    {
                      min: 3,
                      message: 'Name must have at least 3 characters'
                    }
                  ]}
                >
                  <Input placeholder="Name.." />
                </Form.Item>
              </Col>
              <Col span={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="phone_one"
                  label="Phone"
                  rules={[
                    { required: true, message: 'Phone number is required!' },
                    {
                      min: 10,
                      message: 'Phone number must have at least 10 digits'
                    },
                    {
                      max: 12,
                      message: 'Phone number must have at most 12 digits'
                    }
                  ]}
                >
                  <Input placeholder="Phone.." />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={24} md={24} sm={24} xs={24}>
                <Form.Item label="Photo">
                  <Upload
                    name="picture_one"
                    listType="picture-card"
                    className="seo-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleChangePicOne}
                  >
                    {imageUrlOne !== '' ? (
                      <img src={imageUrlOne} alt="" style={{ width: '100%' }} />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <h4
              style={{
                color: '#2196F3'
              }}
            >
              Details of Second Representative
            </h4>
            <Row gutter={10}>
              <Col span={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="name_two"
                  label="Name"
                  rules={[
                    {
                      min: 3,
                      message: 'Name must have at least 3 characters'
                    }
                  ]}
                >
                  <Input placeholder="Name.." />
                </Form.Item>
              </Col>
              <Col span={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="phone_two"
                  label="Phone"
                  rules={[
                    {
                      min: 10,
                      message: 'Phone number must have at least 10 digits'
                    },
                    {
                      max: 12,
                      message: 'Phone number must have at most 12 digits'
                    }
                  ]}
                >
                  <Input placeholder="Phone.." />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={24} md={24} sm={24} xs={24}>
                <Form.Item label="Photo">
                  <Upload
                    name="picture_two"
                    listType="picture-card"
                    className="seo-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleChangePicTwo}
                  >
                    {imageUrlTwo !== '' ? (
                      <img src={imageUrlTwo} alt="" style={{ width: '100%' }} />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  )
}
