import React from 'react';
import { Button, Modal, Row, Col, Space } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Duplicate } from '../../interfaces';

interface DuplicateModalProps {
  duplicates: Duplicate[];
  onTransferDuplicatesClick(): void;
  isTransferring: boolean;
  showDuplicatesModal: boolean;
  onCloseDuplicatesModal(): void;
  success: boolean;
}

export const DuplicateModal: React.FC<DuplicateModalProps> = ({
  duplicates,
  isTransferring,
  onCloseDuplicatesModal,
  onTransferDuplicatesClick,
  showDuplicatesModal,
  success,
}) => {
  return (
    <Modal
      title="Transfer Request for Duplicates"
      maskClosable={false}
      centered
      visible={showDuplicatesModal}
      onCancel={() => onCloseDuplicatesModal()}
      width={700}
      footer={[
        <Button
          type="default"
          key="cancel"
          onClick={() => onCloseDuplicatesModal()}
        >
          Close
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
        {!success ? (
          <Col span={24} md={24} sm={24} xs={24}>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ fontSize: 18, fontWeight: 300 }}>
                {duplicates.length} duplicates has been detected during
                importation. Do you want to send in a transfer request for these
                students?
              </h4>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Space>
                <Button
                  type="primary"
                  className="success"
                  icon={<CheckCircleOutlined />}
                  loading={isTransferring}
                  onClick={() => onTransferDuplicatesClick()}
                >
                  {isTransferring ? 'Transferring..' : 'Transfer'}
                </Button>
                <Button
                  type="primary"
                  danger
                  icon={<CloseCircleOutlined />}
                  onClick={() => onCloseDuplicatesModal()}
                >
                  Cancel
                </Button>
              </Space>
            </div>
          </Col>
        ) : (
          <Col span={24} md={24} sm={24} xs={24}>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ fontSize: 18, fontWeight: 300 }}>
                {duplicates.length} student(s) transfer request successfully
                sent!
              </h4>
            </div>
          </Col>
        )}
      </Row>
    </Modal>
  );
};
