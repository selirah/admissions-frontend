import React, { Fragment } from 'react'
import { AdmissionLetter, Document } from '../../interfaces'
import { Row, Col, Image, Button } from 'antd'
import ReactHtmlParser from 'react-html-parser'

interface LetterBoxProps {
  letter: AdmissionLetter
  docs: Document | null
  onRemove: () => void
  isRemove: boolean
}

export const LetterBox: React.FC<LetterBoxProps> = ({
  letter,
  docs,
  isRemove,
  onRemove
}) => {
  return (
    <Row
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '10px'
      }}
    >
      <Col span={16} md={16} sm={24} xs={24}>
        {docs && docs.letter_head ? (
          <Image src={docs.letter_head} alt="letter-head" preview={false} />
        ) : (
          <h4>Letter head will be displayed here if you have uploaded one</h4>
        )}
        <div
          style={{
            marginTop: '30px',
            textAlign: 'justify',
            textJustify: 'inter-word'
          }}
        >
          {ReactHtmlParser(letter.admission)}
        </div>
        {docs && docs.letter_footer ? (
          <Fragment>
            <Image
              src={docs.letter_footer}
              alt="letter-footer"
              preview={false}
            />
            <Button
              type="primary"
              danger
              style={{ marginTop: '10px' }}
              loading={isRemove}
              onClick={() => onRemove()}
            >
              Remove Footer Image
            </Button>
          </Fragment>
        ) : (
          <h4>Letter footer will be displayed here if you have uploaded one</h4>
        )}
      </Col>
    </Row>
  )
}
