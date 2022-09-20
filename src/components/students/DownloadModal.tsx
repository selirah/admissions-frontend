import React from 'react'
import { Modal, Button, Row, Col } from 'antd'

interface DownloadModalProps {
  receipts: string[]
  downloadModal: boolean
  onToggleDownloadModal(): void
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  receipts,
  downloadModal,
  onToggleDownloadModal
}) => {
  return (
    <Modal
      title="Download Receipts"
      maskClosable={false}
      centered
      visible={downloadModal}
      onCancel={() => onToggleDownloadModal()}
      width={700}
      footer={[
        <Button
          type="default"
          key="cancel"
          onClick={() => onToggleDownloadModal()}
        >
          Close
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
          {receipts.map((r) => (
            <div key={r}>
              <a href={r} target="_blank" rel="noreferrer">
                {r}
              </a>
            </div>
          ))}
        </Col>
      </Row>
    </Modal>
  )
}
