import React, { Fragment } from 'react'
import { Button, Drawer, Input, Row, Col, Table, Upload, Alert } from 'antd'

interface Props {
  values: any
  onSubmit: (values: any) => void
  Form: any
  form: any
  onShowDrawer: (value: boolean) => void
  showDrawer: boolean
  handleExcelSheet: (info: any) => void
  excelData: any[]
  beforeUpload: (file: File) => boolean
  uploadButton: React.ReactNode
  isSubmit: boolean
  error: any
  handleSheetNumber: (e: any) => void
}

const columns: any[] = [
  {
    title: 'Course Code',
    dataIndex: 'course_code',
    align: 'left',
    key: 'course_code',
    sorter: (a: any, b: any) => a.course_code.length - b.course_code.length
  },
  {
    title: 'Course',
    dataIndex: 'course',
    align: 'left',
    key: 'course',
    sorter: (a: any, b: any) => a.course.length - b.course.length
  }
]

const CoursesDrawer: React.FC<Props> = (props) => {
  const {
    values,
    Form,
    form,
    onShowDrawer,
    onSubmit,
    showDrawer,
    beforeUpload,
    excelData,
    handleExcelSheet,
    uploadButton,
    isSubmit,
    error,
    handleSheetNumber
  } = props

  let data: any[] = []

  excelData.length &&
    excelData.map((d, i) => {
      data.push({
        key: i,
        course_code: d['Course Code'],
        course: d['Course']
      })
      return data
    })

  return (
    <Fragment>
      <Drawer
        width={1000}
        placement="right"
        closable
        onClose={() => onShowDrawer(false)}
        visible={showDrawer}
        title="Upload Courses"
      >
        <Row>
          <Row style={{ marginBottom: 10 }}>
            <Col span={12} md={12} sm={24} xs={24}>
              <Button
                type="primary"
                danger
                href="https://admission.ebitsapps.com/uploads/courses_template.xlsx"
              >
                Download Template
              </Button>
            </Col>
            {error ? (
              <Col span={24} md={24} sm={24} xs={24}>
                <Alert
                  message="Oops"
                  description={JSON.stringify(error)}
                  type="error"
                />
              </Col>
            ) : null}
          </Row>
          <Col span={24}>
            <Form
              layout="vertical"
              name="basic"
              initialValues={values}
              onFinish={onSubmit}
              id="courseform"
              form={form}
            >
              <Form.Item name="school_id" hidden={true}>
                <Input type="text" />
              </Form.Item>
              <Row gutter={10}>
                <Col span={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    name="sheet"
                    label="Sheet number"
                    rules={[
                      { required: true, message: 'Sheet number is required!' }
                    ]}
                  >
                    <Input
                      placeholder="Sheet number.."
                      type="number"
                      onChange={handleSheetNumber}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={24} md={24} sm={24} xs={24}>
                  <Form.Item label="Excel Sheet">
                    <Upload
                      name="excel"
                      listType="picture-card"
                      className="seo-uploader"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleExcelSheet}
                      accept=".xlsx"
                    >
                      {uploadButton}
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
              {excelData.length ? (
                <Row style={{ marginBottom: 20 }}>
                  <Col span={24}>
                    <div>
                      <Table
                        dataSource={data}
                        columns={columns}
                        bordered
                        pagination={{
                          hideOnSinglePage: true,
                          total: excelData.length,
                          showTotal: (total, range) => {
                            return `Showing ${range[0]} - ${range[1]} of ${total} results`
                          }
                        }}
                        className="students-table"
                        scroll={{ x: true }}
                      />
                    </div>
                  </Col>
                </Row>
              ) : null}
              <Row gutter={10}>
                <Col span={24}>
                  <Button
                    form="courseform"
                    key="submit"
                    htmlType="submit"
                    type="primary"
                    loading={isSubmit}
                  >
                    {isSubmit ? 'Saving..' : 'Save'}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Drawer>
    </Fragment>
  )
}

export default CoursesDrawer
