import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { LogoutOutlined, ProfileOutlined } from '@ant-design/icons';
import { path } from '../../helpers/path';

interface SettingsMenuProps {
  logoutUser(): void;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({ logoutUser }) => {
  return (
    <Menu>
      <Menu.Item key="1" icon={<ProfileOutlined />}>
        <Link to={path.profile}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<LogoutOutlined />} onClick={() => logoutUser()}>
        Logout
      </Menu.Item>
    </Menu>
  );
};
