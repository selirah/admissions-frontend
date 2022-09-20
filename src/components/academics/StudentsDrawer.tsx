import React, { Fragment } from 'react'
import {
  Button,
  Drawer,
  Input,
  Row,
  Col,
  Table,
  Upload,
  Select,
  Alert
} from 'antd'
import { Programme } from '../../interfaces'

interface Props {
  values: any
  onSubmit: (values: any) => void
  Form: any
  form: any
  programmes: Programme[]
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

const { Option } = Select

const columns: any[] = [
  {
    title: 'Index Number',
    dataIndex: 'index_no',
    align: 'left',
    key: 'index_no'
  },
  {
    title: 'Surname',
    dataIndex: 'surname',
    align: 'left',
    key: 'surname'
  },
  {
    title: 'Other Names',
    dataIndex: 'other_names',
    align: 'left',
    key: 'other_names'
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    align: 'left',
    key: 'phone'
  }
]

const StudentsDrawer: React.FC<Props> = (props) => {
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
    programmes,
    isSubmit,
    error,
    handleSheetNumber
  } = props

  let data: any[] = []

  excelData.length &&
    excelData.map((d, i) => {
      data.push({
        key: i,
        index_no: d['Index Number'],
        surname: d['Surname'],
        other_names: d['Other Names'],
        phone: d['Phone']
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
        title="Upload Students"
      >
        <Row>
          <Row style={{ marginBottom: 10 }}>
            <Col span={12} md={12} sm={24} xs={24} style={{ marginBottom: 10 }}>
              <Button
                type="primary"
                href="https://admission.ebitsapps.com/uploads/students_template.xlsx"
                className="success"
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
              id="studentsForm"
              form={form}
            >
              <Form.Item name="school_id" hidden={true}>
                <Input type="text" />
              </Form.Item>
              <Form.Item name="academic_year" hidden={true}>
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
                <Row style={{ marginBottom: 10 }}>
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
              <Row gutter={20}>
                <Col span={24}>
                  <Button
                    form="studentsForm"
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

export default StudentsDrawer
