import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Layout, Menu, Dropdown, Avatar, Badge, Popover } from 'antd'
import { useDispatch } from 'react-redux'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  BellOutlined
} from '@ant-design/icons'
import { SettingsMenu } from './SettingsMenu'
import { path } from '../../helpers/path'
import { logout } from '../../store/auth'
import { secure } from '../../utils/secure'
import { AppDispatch } from '../../helpers/appDispatch'
import { appSelector } from '../../helpers/appSelector'
import { getTransferCountRequest } from '../../store/transfers/actions'
import { getReceiptStudentsRequest } from '../../store/students/actions'
import { useInterval } from '../../hooks/useInterval'
import { getCurrentAcademicYears } from '../../helpers/functions'
import DrawerComponent from '../students/Drawer'

const { currentYear, nextYear } = getCurrentAcademicYears()

interface TopBarProps {
  collapsed: boolean
  toggle(): void
}

interface ParamProps {
  pageId: string
}

export const TopBar: React.FC<TopBarProps> = ({ collapsed, toggle }) => {
  const dispatch: AppDispatch = useDispatch()
  const history = useHistory()
  const { Header } = Layout
  const [header, setHeader] = useState(<Link to={path.home}>Dashboard</Link>)
  const { pathname } = history.location
  const { pageId } = useParams<ParamProps>()
  const store = appSelector((state) => state.transfersStore)
  const studentStore = appSelector((state) => state.studentsStore)
  const { school } = appSelector((state) => state.schoolStore)
  const [count, setCount] = useState(0)
  const [academicYear] = useState(currentYear + '-' + nextYear)
  const [receiptCount, setReceiptCount] = useState(0)
  const [toggleDrawer, setToggleDrawer] = useState(false)

  const logoutUser = () => {
    secure.removeAll()
    dispatch(logout())
  }

  useEffect(() => {
    if (school) {
      const payload = {
        school_id: school.id,
        academic_year: academicYear
      }
      dispatch(getTransferCountRequest(payload))
      dispatch(getReceiptStudentsRequest(payload))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    switch (pathname) {
      case path.home:
        setHeader(<Link to={path.home}>Home</Link>)
        break
      case path.school:
        setHeader(<Link to={path.school}>School</Link>)
        break
      case path.programmes:
        setHeader(<Link to={path.programmes}>Programmes</Link>)
        break
      case path.students:
        setHeader(
          <React.Fragment>
            <Link to={path.students}>Students</Link>
          </React.Fragment>
        )
        break
      case path.letter:
        setHeader(
          <React.Fragment>
            <Link to={path.letter}>Admission Letter</Link>
          </React.Fragment>
        )
        break
      case path.fees:
        setHeader(
          <React.Fragment>
            <Link to={path.fees}>Fees Setup</Link>
          </React.Fragment>
        )
        break
      case path.transfers:
        setHeader(
          <React.Fragment>
            <Link to={path.transfers}>Transfers</Link>
          </React.Fragment>
        )
        break
      case path.clients:
        setHeader(
          <React.Fragment>
            <Link to={path.clients}>Clients</Link>
          </React.Fragment>
        )
        break
      case path.trainings:
        setHeader(
          <React.Fragment>
            <Link to={path.trainings}>Training</Link>
          </React.Fragment>
        )
        break
      case path.profile:
        setHeader(
          <React.Fragment>
            <Link to={path.profile}>Profile</Link>
          </React.Fragment>
        )
        break
      case path.academics:
        setHeader(
          <React.Fragment>
            <Link to={path.academics}>Academics</Link>
          </React.Fragment>
        )
        break
    }
  }, [pathname, pageId])

  useEffect(() => {
    const { transferCount } = store
    setCount(transferCount)
  }, [store])

  useEffect(() => {
    const { receiptsStudents } = studentStore
    setReceiptCount(receiptsStudents.length ? receiptsStudents.length : 0)
  }, [studentStore, school])

  useInterval(() => {
    if (school) {
      const payload = {
        school_id: school.id,
        academic_year: academicYear
      }
      dispatch(getTransferCountRequest(payload))
      dispatch(getReceiptStudentsRequest(payload))
    }
  }, 60000)

  const onToggleDrawer = () => {
    setToggleDrawer(!toggleDrawer)
  }

  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggle
      })}
      <span className="portal-title">{header}</span>
      <Menu mode="horizontal" className="f-right">
        <Menu.Item key="1">
          <Link to={path.transfers}>
            <Badge size="small" count={count} style={{ cursor: 'pointer' }}>
              <Popover
                title="Student Transfer"
                content={`${count} transfer requests have been submitted`}
              >
                <Avatar
                  shape="square"
                  icon={<BellOutlined style={{ color: '#00C853' }} />}
                  style={{ background: 'transparent' }}
                />
              </Popover>
            </Badge>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="" onClick={onToggleDrawer}>
            <Badge
              size="small"
              count={receiptCount}
              style={{ cursor: 'pointer' }}
            >
              <Popover
                title="Student Receipt Upload"
                content={`${receiptCount} students have uploaded their receipts`}
              >
                <Avatar
                  shape="square"
                  icon={<BellOutlined style={{ color: '#FFA726' }} />}
                  style={{ background: 'transparent' }}
                />
              </Popover>
            </Badge>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Dropdown overlay={<SettingsMenu logoutUser={logoutUser} />}>
            <Avatar
              shape="square"
              icon={<UserOutlined style={{ color: '#42A5F5' }} />}
              style={{ background: 'transparent' }}
            />
          </Dropdown>
        </Menu.Item>
      </Menu>
      <DrawerComponent
        toggleDrawer={toggleDrawer}
        onToggleDrawer={onToggleDrawer}
      />
    </Header>
  )
}
