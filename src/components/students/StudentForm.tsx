import React from 'react'
import { Button, Modal, Input, Row, Col, Select, Checkbox } from 'antd'
import { Student, Programme, School } from '../../interfaces'
import { academicYears } from '../../helpers/constants'

interface StudentFormProps {
  values: Student
  onSubmit(values: Student): void
  isSubmit: boolean
  onCloseModal(): void
  showStudentFormModal: boolean
  addStudent: boolean
  Form: any
  form: any
  programmes: Programme[]
  school: School
}

const { Option } = Select

export const StudentForm: React.FC<StudentFormProps> = ({
  values,
  onSubmit,
  isSubmit,
  onCloseModal,
  showStudentFormModal,
  addStudent,
  Form,
  form,
  programmes,
  school
}) => {
  return (
    <Modal
      title={addStudent ? 'Add Student' : 'Update Student'}
      maskClosable={false}
      centered
      visible={showStudentFormModal}
      onCancel={() => onCloseModal()}
      width={700}
      footer={[
        <Button type="default" key="cancel" onClick={() => onCloseModal()}>
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
            id="studentForm"
            form={form}
          >
            <Row gutter={10}>
              <Col span={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="surname"
                  label="Surname"
                  rules={[
                    { required: true, message: 'Surname is required!' },
                    {
                      min: 3,
                      message: 'Surname must have at least 3 characters'
                    }
                  ]}
                >
                  <Input placeholder="Surname.." />
                </Form.Item>
              </Col>
              <Col span={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="other_names"
                  label="Other names"
                  rules={[
                    { required: true, message: 'Surname is required!' },
                    {
                      min: 3,
                      message: 'Other names must have at least 3 characters'
                    }
                  ]}
                >
                  <Input placeholder="Other names.." />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="application_number"
                  label="Application number"
                  rules={[
                    {
                      required: true,
                      message: 'Application number is required!'
                    },
                    {
                      min: 7,
                      message: 'Application number must have at least 7 digits'
                    }
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
                    { required: true, message: 'Programme is required!' }
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
              <Col span={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="phone"
                  label="Phone number"
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
                  <Input placeholder="Phone number.." />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="hall"
                  label="Hall"
                  rules={[
                    {
                      min: 3,
                      message: 'Hall name must have at least 3 digits'
                    }
                  ]}
                >
                  <Input placeholder="Hall.." />
                </Form.Item>
              </Col>
              <Col span={12} md={12} sm={24} xs={24}>
                <Form.Item name="school_id" hidden={true}>
                  <Input type="text" />
                </Form.Item>
                <Form.Item name="id" hidden={true}>
                  <Input type="text" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={24}>
                <Form.Item name="owing_fees" valuePropName="checked">
                  <Checkbox
                    checked={parseInt(values.owing_fees) === 1 ? true : false}
                  >
                    Check to set student's to 'OWING'
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row>
            {!addStudent && school.fee_payment === 1 ? (
              <Row gutter={10}>
                <Col span={24}>
                  <Form.Item name="fee_receipt" valuePropName="checked">
                    <Checkbox checked={values.fee_receipt === 1 ? true : false}>
                      Check to Grant Student access to print Letter
                    </Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            ) : null}
          </Form>
        </Col>
      </Row>
    </Modal>
  )
}
