import React, { Fragment } from 'react'
import { Button, Input, Select } from 'antd'
import {
  SyncOutlined,
  FileExcelOutlined,
  PhoneOutlined
} from '@ant-design/icons'
import { Course, Results } from '../../interfaces'

interface Props {
  onShowCoursesDrawer(value: boolean): void
  onShowResultsDrawer(value: boolean): void
  onShowStudentsDrawer(value: boolean): void
  dispatchRefresh(): void
  onSearch(value: string): void
  courses: Course[]
  display: string
  onHandleDisplay: (value: string) => void
  handleCourses(value: string): void
  onSendNotification(): void
  sending: boolean
  results: Results[]
}

const { Search } = Input
const { Option } = Select

const AcademicsPane: React.FC<Props> = (props) => {
  const {
    dispatchRefresh,
    onSearch,
    onShowCoursesDrawer,
    onShowResultsDrawer,
    onShowStudentsDrawer,
    courses,
    display,
    onHandleDisplay,
    handleCourses,
    onSendNotification,
    sending,
    results
  } = props

  return (
    <div className="pane-container">
      <div className="actions">
        {results.length ? (
          <div>
            <Button
              type="default"
              icon={<PhoneOutlined />}
              onClick={() => onSendNotification()}
              className=""
              loading={sending}
              danger
            >
              Send SMS to Students
            </Button>
          </div>
        ) : null}
        <div>
          <Button
            type="default"
            icon={<FileExcelOutlined />}
            onClick={() => onShowStudentsDrawer(true)}
            className="success"
          >
            Upload Students
          </Button>
        </div>
        <div>
          <Select
            onChange={onHandleDisplay}
            placeholder="Display"
            style={{ width: 150 }}
            defaultValue="results"
          >
            <Option value="results" key={1}>
              RESULTS
            </Option>
            <Option value="courses" key={0}>
              COURSES
            </Option>
          </Select>
        </div>
        {display === 'courses' ? (
          <div>
            <Search placeholder="search by course, code" onSearch={onSearch} />
          </div>
        ) : (
          <Fragment>
            {courses.length ? (
              <div>
                <Select
                  onChange={handleCourses}
                  style={{ width: 120 }}
                  allowClear
                  showSearch
                >
                  {courses.map((course) => (
                    <Option value={course.course_code} key={course.course}>
                      {course.course_code}
                    </Option>
                  ))}
                </Select>
              </div>
            ) : null}
          </Fragment>
        )}

        <div>
          <Button
            type="default"
            onClick={() => dispatchRefresh()}
            icon={<SyncOutlined />}
          >
            Refresh List
          </Button>
        </div>
        {display === 'courses' ? (
          <div>
            <Button
              type="primary"
              className="info"
              icon={<FileExcelOutlined />}
              onClick={() => onShowCoursesDrawer(true)}
            >
              Upload Courses
            </Button>
          </div>
        ) : (
          <div>
            <Button
              type="primary"
              icon={<FileExcelOutlined />}
              onClick={() => onShowResultsDrawer(true)}
            >
              Upload Results
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AcademicsPane
