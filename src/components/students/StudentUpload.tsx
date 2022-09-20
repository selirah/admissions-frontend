import React from 'react';
import { Button, Modal, Input, Row, Col, Select, Upload } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import { Programme } from '../../interfaces';
import { academicYears } from '../../helpers/constants';

interface StudentUploadProps {
  onUploadStudents(values: any): void;
  isSubmit: boolean;
  toggleUploadModal(): void;
  showUploadModal: boolean;
  Form: any;
  form: any;
  programmes: Programme[];
  onUploadFile(info: any): void;
  fileName: string;
  values: any;
}

const { Option } = Select;

export const StudentUpload: React.FC<StudentUploadProps> = ({
  Form,
  form,
  isSubmit,
  onUploadStudents,
  programmes,
  showUploadModal,
  toggleUploadModal,
  onUploadFile,
  fileName,
  values,
}) => {
  return (
    <Modal
      title={'Upload Students'}
      maskClosable={false}
      centered
      visible={showUploadModal}
      onCancel={() => toggleUploadModal()}
      width={700}
      footer={[
        <Button type="default" key="cancel" onClick={() => toggleUploadModal()}>
          Close
        </Button>,
        <Button
          form="uploadForm"
          key="submit"
          htmlType="submit"
          type="primary"
          loading={isSubmit}
        >
          {isSubmit ? 'Uploading..' : 'Upload'}
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
            onFinish={onUploadStudents}
            id="uploadForm"
            form={form}
            initialValues={values}
          >
            <Row style={{ marginBottom: 30 }}>
              <Col span={12} md={12} sm={24} xs={24}>
                <Button
                  type="primary"
                  danger
                  href="https://admission.ebitsapps.com/uploads/default_template.xlsx"
                >
                  Download Sample
                </Button>
              </Col>
            </Row>
            <Row>
              <Col span={12} md={12} sm={24} xs={24}>
                <Form.Item
                  rules={[{ required: true, message: 'File is required!' }]}
                  label="Excel File"
                >
                  <Upload
                    className="file-uploader"
                    customRequest={onUploadFile}
                    name="excel"
                    showUploadList={false}
                    accept={'.csv, .xls, .xlsx'}
                  >
                    <Button type="default" icon={<FileExcelOutlined />}>
                      {fileName}
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={12} md={12} sm={24} xs={24}>
                <Form.Item name="programme_id" label="Select Programme">
                  <Select placeholder="Select the programme.." allowClear>
                    {programmes.map((programme) => (
                      <Option value={programme.id} key={programme.id}>
                        {programme.programme}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="academic_year"
                  rules={[
                    { required: true, message: 'Academic year is required!' },
                  ]}
                  label="Select Academic Year"
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
            <Row gutter={10}>
              <Col span={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="sheet"
                  rules={[
                    { required: true, message: 'Sheet number is required!' },
                  ]}
                  label="Sheet Number"
                >
                  <Input placeholder="Sheet number.." type="number" min={1} />
                </Form.Item>
              </Col>
              <Col span={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="start_row"
                  rules={[
                    { required: true, message: 'Enter the starting row!' },
                  ]}
                  label="Starting Row"
                >
                  <Input placeholder="Starting row.." type="number" min={1} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};
