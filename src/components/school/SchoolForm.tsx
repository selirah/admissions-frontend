import React from 'react'
import {
  Button,
  Modal,
  Input,
  Row,
  Col,
  Alert,
  Select,
  Divider,
  Checkbox
} from 'antd'
import { School, Category } from '../../interfaces'
import { regions } from '../../helpers/constants'
import { isEmpty } from '../../helpers/isEmpty'
import { academicYears } from '../../helpers/constants'

interface SchoolFormProps {
  values: School
  onSubmit(values: School): void
  isSubmit: boolean
  error: string | null
  onCloseModal(): void
  showSchoolFormModal: boolean
  categories: Category[]
  addSchool: boolean
  Form: any
  form: any
}

export const SchoolForm: React.FC<SchoolFormProps> = ({
  values,
  onSubmit,
  isSubmit,
  error,
  onCloseModal,
  showSchoolFormModal,
  categories,
  addSchool,
  Form,
  form
}) => {
  const { Option } = Select

  return (
    <Modal
      title={addSchool ? 'Add School' : 'Update School'}
      maskClosable={false}
      centered
      visible={showSchoolFormModal}
      onCancel={() => onCloseModal()}
      width={700}
      footer={[
        <Button type="default" key="cancel" onClick={() => onCloseModal()}>
          Close
        </Button>,
        <Button
          form="schoolForm"
          key="submit"
          htmlType="submit"
          type="primary"
          loading={isSubmit}
        >
          {isSubmit ? 'Processing..' : 'Save'}
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
          {!isEmpty(error) ? <Alert type="error" message={error} /> : null}
        </Col>
        <Col span={24}>
          <Form
            layout="vertical"
            name="basic"
            initialValues={values}
            onFinish={onSubmit}
            id="schoolForm"
            form={form}
          >
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item
                  name="school_name"
                  label="School Name"
                  rules={[
                    { required: true, message: 'School name is required!' },
                    {
                      min: 5,
                      message: 'School name must be at least 5 characters'
                    }
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Name of your school.." />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="category_id"
                  label="Category"
                  rules={[{ required: true, message: 'Category is required!' }]}
                  hasFeedback
                >
                  <Select placeholder="Select the type of category school belong to..">
                    {categories.map((category) => (
                      <Option value={category.id} key={category.id}>
                        {category.category}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item name="phone" label="Phone number" hasFeedback>
                  <Input placeholder="Phone number of school.." />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="School email"
                  rules={[
                    { type: 'email', message: 'Enter a valid email address' }
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Email of your school.." />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item
                  name="region"
                  label="Region"
                  rules={[{ required: true, message: 'Region is required!' }]}
                  hasFeedback
                >
                  <Select placeholder="Select the region school is located">
                    {regions.map((region) => (
                      <Option value={region.value} key={region.value}>
                        {region.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="town"
                  label="Town"
                  rules={[{ required: true, message: 'Town is required!' }]}
                  hasFeedback
                >
                  <Input placeholder="Location of your school.." />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item
                  name="sender_id"
                  label="Sender name for SMS"
                  rules={[
                    {
                      required: true,
                      message: 'Sender name is required!'
                    },
                    {
                      max: 11,
                      message: 'Sender ID should not exceed 11 characters'
                    }
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Sender name for sms.." />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="letter_signatory"
                  label="Name of Signatory"
                  rules={[
                    {
                      required: true,
                      message: 'Signatory name is required!'
                    }
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Enter signatory name.." />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item
                  name="signatory_position"
                  label="Position of Signatory"
                  hasFeedback
                >
                  <Input placeholder="Enter signatory position.." />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="academic_year"
                  label="Academic Year"
                  rules={[
                    { required: true, message: 'Academic year is required!' }
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
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item name="address" label="Address" hasFeedback>
                  <Input.TextArea placeholder="Enter school posta address..." />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={24}>
                <Form.Item
                  name="fee_payment"
                  valuePropName="checked"
                  hasFeedback
                >
                  <Checkbox>
                    Prevent student from printing letter when fees is not paid
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Divider />
          </Form>
        </Col>
      </Row>
    </Modal>
  )
}
