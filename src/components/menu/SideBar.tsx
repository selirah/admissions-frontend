import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { User } from '../../interfaces'
import {
  HomeOutlined,
  CreditCardOutlined,
  MessageOutlined,
  UsergroupAddOutlined,
  BookOutlined,
  BuildOutlined,
  SyncOutlined,
  LoadingOutlined,
  FieldTimeOutlined,
  BookFilled
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../helpers/appDispatch'
import { appSelector } from '../../helpers/appSelector'
import { switchMenu } from '../../store/admin'
import { path } from '../../helpers/path'

interface SideBarProps {
  collapsed: boolean
  onCollapsed(): void
  user: User
  onImpersonate(): void
}

const { Sider } = Layout

export const SideBar: React.FC<SideBarProps> = ({
  collapsed,
  onCollapsed,
  user,
  onImpersonate
}) => {
  const dispatch: AppDispatch = useDispatch()
  const adminStore = appSelector((state) => state.adminStore)
  const [active, setActive] = useState(adminStore.activMenu)

  const switchActiveMenu = (menu: string) => {
    dispatch(switchMenu(menu))
  }

  useEffect(() => {
    const { activMenu } = adminStore
    setActive(activMenu)
  }, [adminStore])

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth="0"
      onCollapse={onCollapsed}
    >
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[active]}>
        <div className="logo" />
        {user.role === 'ADMIN' ? (
          <>
            <Menu.Item
              key={path.home}
              icon={<HomeOutlined />}
              onClick={() => switchActiveMenu(path.home)}
            >
              <Link to={path.home}>Home</Link>
            </Menu.Item>
            <Menu.Item
              key={path.school}
              icon={<BuildOutlined />}
              onClick={() => switchActiveMenu(path.school)}
            >
              <Link to={path.school}>School</Link>
            </Menu.Item>
            <Menu.Item
              key={path.programmes}
              icon={<BookOutlined />}
              onClick={() => switchActiveMenu(path.programmes)}
            >
              <Link to={path.programmes}>Programmes</Link>
            </Menu.Item>
            <Menu.Item
              key={path.fees}
              icon={<CreditCardOutlined />}
              onClick={() => switchActiveMenu(path.fees)}
            >
              <Link to={path.fees}>Fees Setup</Link>
            </Menu.Item>
            <Menu.Item
              key={path.letter}
              icon={<MessageOutlined />}
              onClick={() => switchActiveMenu(path.letter)}
            >
              <Link to={path.letter}>Admission Letter</Link>
            </Menu.Item>
            <Menu.Item
              key={path.students}
              icon={<UsergroupAddOutlined />}
              onClick={() => switchActiveMenu(path.students)}
            >
              <Link to={path.students}>Students</Link>
            </Menu.Item>
            <Menu.Item
              key={path.transfers}
              icon={<SyncOutlined />}
              onClick={() => switchActiveMenu(path.transfers)}
            >
              <Link to={path.transfers}>Transfers</Link>
            </Menu.Item>

            <Menu.Item
              key={path.academics}
              icon={<BookFilled />}
              onClick={() => switchActiveMenu(path.academics)}
            >
              <Link to={path.academics}>Academics</Link>
            </Menu.Item>

            {user.admin_id !== 0 ? (
              <Menu.Item key="1" icon={<LoadingOutlined spin />}>
                <Link to="" onClick={() => onImpersonate()}>
                  Switch to Admin
                </Link>
              </Menu.Item>
            ) : null}
          </>
        ) : (
          <>
            <Menu.Item
              key={path.clients}
              icon={<UsergroupAddOutlined />}
              onClick={() => switchActiveMenu(path.clients)}
            >
              <Link to={path.clients}>Clients</Link>
            </Menu.Item>
            <Menu.Item
              key={path.trainings}
              icon={<FieldTimeOutlined />}
              onClick={() => switchActiveMenu(path.trainings)}
            >
              <Link to={path.trainings}>Training</Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Sider>
  )
}
