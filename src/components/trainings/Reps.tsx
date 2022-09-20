import React, { createRef } from 'react'
import { Modal, Row, Col, Button, Avatar, Divider } from 'antd'
import { TrainingList } from '../../interfaces'
import { colors } from '../../helpers/colors'
import ReactToPrint from 'react-to-print'

interface RepsProps {
  list: TrainingList
  onCloseRepsModal(): void
  showRepsModal: boolean
}

export const Reps: React.FC<RepsProps> = ({
  list,
  onCloseRepsModal,
  showRepsModal
}) => {
  let repRef: any = createRef()

  const getInitials = (n: string) => {
    let name = ''
    let initials: string[] = []
    initials = n.match(/\b\w/g) || []
    name = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
    return name
  }

  return (
    <Modal
      title="Representatives"
      maskClosable={false}
      centered
      visible={showRepsModal}
      onCancel={() => onCloseRepsModal()}
      width={500}
      footer={[
        <ReactToPrint
          trigger={() => <Button type="primary">Print</Button>}
          content={() => repRef}
          key="print"
        />,
        <Button type="default" key="cancel" onClick={() => onCloseRepsModal()}>
          Close
        </Button>
      ]}
    >
      <Row
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: '20px'
        }}
        ref={(el: any) => {
          repRef = el
        }}
      >
        <Row
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '10px',
            flexWrap: 'wrap',
            textAlign: 'center'
          }}
        >
          <Col span={24} md={24} sm={24} xs={24}>
            {list.reps.picture_one ? (
              <Avatar size={100} src={list.reps.picture_one} shape="circle" />
            ) : (
              <Avatar
                size={100}
                style={{
                  backgroundColor: '#1890ff',
                  verticalAlign: 'middle'
                }}
                shape="circle"
              >
                {getInitials(list.reps.rep_one)}
              </Avatar>
            )}
            <h4
              style={{
                marginTop: '10px',
                fontWeight: 700,
                color: colors.blue
              }}
            >
              {list.reps.rep_one.toUpperCase()}
            </h4>
            <h4
              style={{
                marginTop: '10px',
                fontWeight: 700,
                color: colors.green
              }}
            >
              {list.school_name.toUpperCase()}
            </h4>
            <h4 style={{ marginTop: '10px', fontWeight: 700 }}>
              {list.reps.phone_one.replace(
                list.reps.phone_one.substr(0, 3),
                '0'
              )}
            </h4>
          </Col>
        </Row>

        {list.reps.rep_two && list.reps.phone_two ? (
          <>
            <Divider />
            <Row
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '10px',
                flexWrap: 'wrap',
                textAlign: 'center'
              }}
            >
              <Col span={24} md={24} sm={24} xs={24}>
                {list.reps.picture_two ? (
                  <Avatar
                    size={100}
                    src={list.reps.picture_two}
                    shape="circle"
                  />
                ) : (
                  <Avatar
                    size={100}
                    style={{
                      backgroundColor: '#1890ff',
                      verticalAlign: 'middle'
                    }}
                    shape="circle"
                  >
                    {getInitials(list.reps.rep_two)}
                  </Avatar>
                )}
                <h4
                  style={{
                    marginTop: '10px',
                    fontWeight: 700,
                    color: colors.blue
                  }}
                >
                  {list.reps.rep_two.toUpperCase()}
                </h4>
                <h4
                  style={{
                    marginTop: '10px',
                    fontWeight: 700,
                    color: colors.green
                  }}
                >
                  {list.school_name.toUpperCase()}
                </h4>
                <h4 style={{ marginTop: '10px', fontWeight: 700 }}>
                  {list.reps.phone_two.replace(
                    list.reps.phone_two.substr(0, 3),
                    '0'
                  )}
                </h4>
              </Col>
            </Row>
          </>
        ) : null}
      </Row>
    </Modal>
  )
}
