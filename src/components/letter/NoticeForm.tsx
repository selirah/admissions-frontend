import React from 'react'
import { Divider, Button, Row, Col, Modal } from 'antd'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { colors } from '../../helpers/colors'
import EditorToolbar, { modules, formats } from './EditorToolbar'

interface NoticeFormProps {
  onChange(value: any): void
  notice: any
  onSubmit(): void
  onToggleNoticeModal(): void
  showNoticeModal: boolean
  isSubmit: boolean
}

export const NoticeForm: React.FC<NoticeFormProps> = ({
  notice,
  onChange,
  onSubmit,
  isSubmit,
  onToggleNoticeModal,
  showNoticeModal
}) => {
  return (
    <Modal
      title="Transfer Request for Duplicates"
      maskClosable={false}
      centered
      visible={showNoticeModal}
      onCancel={() => onToggleNoticeModal()}
      width={900}
      footer={[
        <Button
          type="default"
          key="cancel"
          onClick={() => onToggleNoticeModal()}
        >
          Close
        </Button>,
        <Button
          type="primary"
          key="submit"
          loading={isSubmit}
          onClick={onSubmit}
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
          <h4 style={{ fontWeight: 'bold' }}>
            Notice{' '}
            <span style={{ fontWeight: 'bold', color: colors.red }}>*</span>
          </h4>
          <Divider />
          <EditorToolbar />
          <ReactQuill
            value={notice}
            onChange={onChange}
            theme="snow"
            bounds={'.app'}
            placeholder="Start writing the admission letter for the new academic year, you can tailor the acceptance and reference letter to it"
            modules={modules}
            formats={formats}
            // style={{ width: '21cm' }}
          />
        </Col>
      </Row>
    </Modal>
  )
}
