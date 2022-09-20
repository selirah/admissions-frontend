import React from 'react'
import { School, Category } from '../../interfaces'
import { Row, Col, Divider, Avatar, Button, Image, Switch } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { isEmpty } from '../../helpers/isEmpty'
import { colors } from '../../helpers/colors'

interface DetailProps {
  school: School
  categories: Category[]
  onShowFormModal(): void
}

export const Detail: React.FC<DetailProps> = ({
  school,
  categories,
  onShowFormModal
}) => {
  const category = categories.find((c) => c.id === school.category_id)

  let initials: string[] = []
  let name = ''
  if (school) {
    initials = school.school_name.match(/\b\w/g) || []
    name = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
  }

  return (
    <Row
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 24
      }}
    >
      {!isEmpty(school.logo) ? (
        <Avatar
          size={100}
          src={school.logo}
          style={{ verticalAlign: 'middle' }}
        />
      ) : (
        <Avatar
          size={100}
          style={{ backgroundColor: colors.orange, verticalAlign: 'middle' }}
        >
          {name}
        </Avatar>
      )}
      <Divider />
      <Col span={24}>
        <Row>
          <Col span={12}>
            <h4 className="school-labels">School Name</h4>
            <h4 className="school-values">{school.school_name}</h4>
          </Col>
          <Col span={12}>
            <h4 className="school-labels">Category</h4>
            <h4 className="school-values">{category!.category}</h4>
          </Col>
          <Divider />
          <Col span={12}>
            <h4 className="school-labels">Phone number</h4>
            <h4 className="school-values">{school.phone}</h4>
          </Col>
          <Col span={12}>
            <h4 className="school-labels">Email</h4>
            <h4 className="school-values">{school.email}</h4>
          </Col>
          <Divider />
          <Col span={12}>
            <h4 className="school-labels">Region</h4>
            <h4 className="school-values">{school.region}</h4>
          </Col>
          <Col span={12}>
            <h4 className="school-labels">Town</h4>
            <h4 className="school-values">{school.town}</h4>
          </Col>
          <Divider />
          <Col span={12}>
            <h4 className="school-labels">Letter Signatory</h4>
            <h4 className="school-values">{school.letter_signatory}</h4>
          </Col>
          <Col span={12}>
            <h4 className="school-labels">
              Position of Signatory (This will default to "Principal" if left
              empty)
            </h4>
            <h4 className="school-values">{school.signatory_position}</h4>
          </Col>

          <Divider />
          {!isEmpty(school.letter_signature) ? (
            <Col span={12}>
              <h4 className="school-labels">Letter Signature</h4>
              <Image src={school.letter_signature} width={100} />
            </Col>
          ) : null}
          <Col span={12}>
            <h4 className="school-labels">
              Allow students to print admission letter only when fees is paid
            </h4>
            <Switch
              checked={school.fee_payment === 1 ? true : false}
              disabled
            />
          </Col>
          <Divider />
          <Col span={12}>
            <h4 className="school-labels">Address</h4>
            <h4 className="school-values">{school.address}</h4>
          </Col>
        </Row>
      </Col>
      <Divider />
      <div className="edit-school">
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => onShowFormModal()}
        >
          Edit
        </Button>
      </div>
    </Row>
  )
}
