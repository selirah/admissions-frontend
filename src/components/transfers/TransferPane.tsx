import React from 'react'
import { Button, Input, Select } from 'antd'
import { PlusOutlined, SyncOutlined, FilePdfOutlined } from '@ant-design/icons'
import { Transfer, School } from '../../interfaces'

interface TransferPaneProps {
  handleChange(value: string): void
  academicYears: any[]
  academicYear: string
  dispatchRefresh(): void
  toggleModal(): void
  onSearch(value: string): void
  onStatusSearch(value: number): void
  onRequestSearch(value: string): void
  handleExport(): void
  exporting: boolean
  transfers: Transfer[]
  school: School
}

const { Search } = Input
const { Option } = Select

export const TransferPane: React.FC<TransferPaneProps> = ({
  academicYear,
  academicYears,
  dispatchRefresh,
  handleChange,
  toggleModal,
  onSearch,
  onStatusSearch,
  onRequestSearch,
  exporting,
  handleExport,
  school,
  transfers
}) => {
  let trans: Transfer[] = []

  transfers.map((t) => {
    if (t.destination_school !== school!.id) {
      trans.push(t)
    }
    return trans
  })

  return (
    <div className="pane-container">
      <div className="filter">
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => toggleModal()}
          >
            Create Transfer Request
          </Button>
        </div>
      </div>
      <div className="actions">
        {trans.length ? (
          <div>
            <Button
              type="primary"
              loading={exporting}
              onClick={() => handleExport()}
              danger
            >
              PDF <FilePdfOutlined />
            </Button>
          </div>
        ) : null}
        <div>
          <Select
            onChange={onRequestSearch}
            placeholder="Search by Type"
            allowClear
          >
            <Option value="mine" key={0}>
              Your Requests
            </Option>
            <Option value="others" key={1}>
              Others Requests
            </Option>
          </Select>
        </div>
        <div>
          <Search
            placeholder="search by surname, othernames, phone, app number"
            onSearch={onSearch}
          />
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
              GRANTED
            </Option>
            <Option value={2} key={2}>
              DENIED
            </Option>
          </Select>
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
            onClick={() => dispatchRefresh()}
            icon={<SyncOutlined />}
          >
            Refresh List
          </Button>
        </div>
      </div>
    </div>
  )
}
