import React from 'react';
import { Modal, Row, Col, Button, Table } from 'antd';
import { TrainingList } from '../../interfaces';
import { isEmpty } from '../../helpers/isEmpty';
import { ModalSpinner } from '../../components/common/Spinner';
import moment from 'moment';

interface ListsProps {
  lists: TrainingList[];
  loading: boolean;
  onCloseListModal(): void;
  showListModal: boolean;
  onShowRepsModal(list: TrainingList): void;
}

export const Lists: React.FC<ListsProps> = ({
  lists,
  loading,
  onCloseListModal,
  showListModal,
  onShowRepsModal,
}) => {
  const columns: any = [
    {
      title: 'School Name',
      dataIndex: 'school_name',
      align: 'left',
      key: 'school_name',
      sorter: (a: TrainingList, b: TrainingList) =>
        a.school_name.length - b.school_name.length,
    },
    {
      title: 'Region',
      dataIndex: 'region',
      align: 'left',
      key: 'region',
      sorter: (a: TrainingList, b: TrainingList) =>
        a.region.length - b.region.length,
    },
    {
      title: 'Training Venue',
      dataIndex: 'location',
      align: 'left',
      key: 'location',
      sorter: (a: TrainingList, b: TrainingList) =>
        a.location.length - b.location.length,
    },
    {
      title: 'Date & Time',
      dataIndex: 'date_time',
      align: 'left',
      key: 'location',
      render: (dateTime: string) => {
        let time = moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format(
          'MMMM D, YYYY (h:mm a)'
        );
        return <span>{time.toUpperCase()}</span>;
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (list: TrainingList) => {
        return (
          <Button type="primary" onClick={() => onShowRepsModal(list)}>
            View Reps
          </Button>
        );
      },
    },
  ];

  let content: React.ReactNode;

  if (loading) {
    content = <ModalSpinner />;
  }
  if (!loading && !isEmpty(lists)) {
    let dataSource: TrainingList[] = [];
    lists.map((l) => {
      dataSource.push({
        created_at: l.created_at,
        date_time: l.date_time,
        id: l.id,
        key: l.id,
        location: l.location.toUpperCase(),
        updated_at: l.updated_at,
        region: l.region.toUpperCase(),
        reps: l.reps,
        school_name: l.school_name.toUpperCase(),
        town: l.town,
      });
      return dataSource;
    });
    content = (
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        pagination={{
          hideOnSinglePage: true,
          total: dataSource.length,
          showTotal: (total, range) => {
            return `Showing ${range[0]} - ${range[1]} of ${total} results`;
          },
        }}
        className="students-table"
      />
    );
  }
  return (
    <Modal
      title="Training Lists"
      maskClosable={false}
      centered
      visible={showListModal}
      onCancel={() => onCloseListModal()}
      width={800}
      footer={[
        <Button type="default" key="cancel" onClick={() => onCloseListModal()}>
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
        <Col span={24}>
          <div>{content}</div>
        </Col>
      </Row>
    </Modal>
  );
};
