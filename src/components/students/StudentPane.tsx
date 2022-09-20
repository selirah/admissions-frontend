import React from 'react'
import { Button, Input, Select, Dropdown, Menu } from 'antd'
import {
  PlusOutlined,
  SyncOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  DownOutlined,
  PhoneOutlined,
  StopOutlined,
  CheckCircleOutlined,
  UploadOutlined
} from '@ant-design/icons'
import { Programme, Student, School } from '../../interfaces'

interface StudentPaneProps {
  onShowFormModal(value: boolean): void
  handleChange(value: string): void
  programmes: Programme[]
  academicYears: any[]
  academicYear: string
  dispatchRefresh(values: Student): void
  values: Student
  onProgrammeSearch(value: number): void
  onStatusSearch(value: number): void
  onSearch(value: string): void
  handleExport(type: string): void
  handleAction(action: string): void
  performAction: boolean
  toggleUploadModal(): void
  exporting: boolean
  school: School
  onFeeStatusSearch(value: string): void
}

const { Search } = Input
const { Option } = Select

export const StudentPane: React.FC<StudentPaneProps> = ({
  onShowFormModal,
  handleChange,
  programmes,
  academicYears,
  academicYear,
  dispatchRefresh,
  values,
  onProgrammeSearch,
  onStatusSearch,
  onSearch,
  handleExport,
  handleAction,
  performAction,
  toggleUploadModal,
  exporting,
  school,
  onFeeStatusSearch
}) => {
  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        icon={<FileExcelOutlined />}
        onClick={() => handleExport('EXCEL')}
      >
        Excel
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<FilePdfOutlined />}
        onClick={() => handleExport('PDF')}
      >
        PDF
      </Menu.Item>
    </Menu>
  )

  const actions = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => handleAction('block')}
        icon={<StopOutlined />}
      >
        Block Pending Students
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => handleAction('unblock')}
        icon={<CheckCircleOutlined />}
      >
        Unblock Pending Students
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={() => handleAction('sms')}
        icon={<PhoneOutlined />}
      >
        SMS Pending Students
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="pane-container">
      <div className="filter">
        {school.fee_payment === 1 ? (
          <div>
            <Select
              onChange={onFeeStatusSearch}
              placeholder="Search by Fees"
              allowClear
              style={{ width: 150 }}
            >
              <Option value="paid" key={0}>
                PAID
              </Option>
              <Option value="notpaid" key={1}>
                NOT PAID
              </Option>
            </Select>
          </div>
        ) : null}
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => onShowFormModal(true)}
          >
            Add Student
          </Button>
        </div>
        <div>
          <Button
            type="primary"
            className="info"
            icon={<UploadOutlined />}
            onClick={() => toggleUploadModal()}
          >
            Upload Students from Excel
          </Button>
        </div>
      </div>
      <div className="actions">
        <div>
          <Search
            placeholder="search by surname, othernames, phone, app number"
            onSearch={onSearch}
          />
        </div>
        <div>
          <Select
            onChange={onProgrammeSearch}
            placeholder="Search by programme"
            allowClear
          >
            {programmes.map((programme) => (
              <Option value={programme.id} key={programme.id}>
                {programme.programme}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <Select
            onChange={onStatusSearch}
            placeholder="Search by status"
            allowClear
          >
            <Option value={0} key={0}>
              PENDING
            </Option>
            <Option value={1} key={1}>
              ACCESSED
            </Option>
            <Option value={2} key={2}>
              BLOCKED
            </Option>
          </Select>
        </div>
        <div>
          <Dropdown overlay={actions}>
            <Button type="primary" danger loading={performAction}>
              Action <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <div>
          <Dropdown overlay={menu}>
            <Button type="primary" className="success" loading={exporting}>
              Export <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <div>
          <Select defaultValue={academicYear} onChange={handleChange}>
            {academicYears.map((academicYear) => (
              <Option value={academicYear.value} key={academicYear.value}>
                {academicYear.label}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <Button
            type="default"
            onClick={() => dispatchRefresh(values)}
            icon={<SyncOutlined />}
          >
            Refresh List
          </Button>
        </div>
      </div>
    </div>
  )
}
