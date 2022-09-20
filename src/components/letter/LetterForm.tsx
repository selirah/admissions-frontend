import React from 'react'
import { Space, Divider, Button, Row, Col } from 'antd'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { SaveOutlined } from '@ant-design/icons'
import { colors } from '../../helpers/colors'
import EditorToolbar, { modules, formats } from './EditorToolbar'
import Toolbar, { modules2, formats2 } from './Toolbar'

interface LetterFormProps {
  onChange(value: any): void
  letter: any
  isSubmit: boolean
  onSubmit(): void
  onCancelClick(): void
  acceptance: any
  onChangeAcceptance(value: any): void
}

export const LetterForm: React.FC<LetterFormProps> = ({
  onChange,
  letter,
  isSubmit,
  onSubmit,
  onCancelClick,
  acceptance,
  onChangeAcceptance
}) => {
  console.log(acceptance)
  return (
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
          Admission Letter{' '}
          <span style={{ fontWeight: 'bold', color: colors.red }}>*</span>
        </h4>
        <Divider />
        <EditorToolbar />
        <ReactQuill
          value={letter}
          onChange={onChange}
          theme="snow"
          bounds={'.app'}
          placeholder="Start writing the admission letter for the new academic year, you can tailor the acceptance and reference letter to it"
          modules={modules}
          formats={formats}
        />
      </Col>
      <Divider />
      <Col span={24}>
        <h4 style={{ fontWeight: 'bold' }}>Acceptance Letter </h4>
        <Divider />
        <Toolbar />
        <ReactQuill
          value={acceptance}
          onChange={onChangeAcceptance}
          theme="snow"
          bounds={'.app'}
          placeholder="You can add acceptance letter here"
          modules={modules2}
          formats={formats2}
        />
      </Col>
      <Col span={24} style={{ marginTop: '1.5rem' }}>
        <Space>
          <Button
            type="primary"
            disabled={isSubmit}
            icon={<SaveOutlined />}
            onClick={onSubmit}
            loading={isSubmit}
          >
            {isSubmit ? 'Submiting' : 'Submit'}
          </Button>
          <Button type="primary" danger onClick={() => onCancelClick()}>
            Cancel
          </Button>
        </Space>
      </Col>
    </Row>
  )
}
