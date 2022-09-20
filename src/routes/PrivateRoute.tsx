import React, { useState, useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { Layout, message } from 'antd';
import { appSelector } from '../helpers/appSelector';
import { path } from '../helpers/path';
import { SideBar } from '../components/menu/SideBar';
import { TopBar } from '../components/menu/TopBar';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../helpers/appDispatch';
import { constants } from '../helpers/constants';
import {
  switchAdminRequest,
  clearBooleanStates,
  switchMenu,
} from '../store/admin';

const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  const dispatch: AppDispatch = useDispatch();
  const auth = appSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;
  const [collapsed, setCollapsed] = useState(false);
  const adminStore = appSelector((state) => state.adminStore);
  const history = useHistory();

  useEffect(() => {
    dispatch(clearBooleanStates());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { switchAdminSuccess, switchAdminFailure, page, error } = adminStore;
    if (switchAdminSuccess && page === constants.admin) {
      dispatch(clearBooleanStates());
      // window.location.href = path.clients;
      dispatch(switchMenu(path.clients));
      history.push(path.clients);
    }
    if (switchAdminFailure && page === constants.admin) {
      message.error(JSON.stringify(error));
      dispatch(clearBooleanStates());
    }
  }, [adminStore, dispatch, history]);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const onImpersonate = () => {
    const payload = {
      id: user!.admin_id,
      admin_id: 0,
      action: 'admin',
    };
    dispatch(switchAdminRequest(payload));
  };

  return (
    <React.Fragment>
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Layout className="min-height-vh">
              <SideBar
                collapsed={collapsed}
                onCollapsed={toggle}
                user={user!}
                onImpersonate={onImpersonate}
              />
              <Layout className="site-layout">
                <TopBar collapsed={collapsed} toggle={toggle} />
                <Component {...props} />
              </Layout>
            </Layout>
          ) : (
            <Redirect to={path.login} />
          )
        }
      />
    </React.Fragment>
  );
};

export { PrivateRoute };
