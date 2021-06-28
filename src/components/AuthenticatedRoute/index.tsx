import { Suspense } from 'react';
import { useQuery } from '@apollo/client';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import { Layout } from 'antd';

import { AUTH } from '../../gql/auth';
import { SIDEBAR } from '../../gql/app';
import routes from '../../config/routes';

import Sidebar from '../Sidebar';
import Header from '../Header';

import styles from './style.module.scss';

const { Content, Footer } = Layout;

interface IProps extends RouteProps {}

const AuthenticatedRoute = (props: IProps) => {
  const history = useHistory();
  const { data: authData } = useQuery(AUTH);
  const { data: sidebarData } = useQuery(SIDEBAR);

  const isLoggedIn = authData?.AuthUser?.isLoggedIn;
  if (!isLoggedIn) {
    history.push(routes.login.path);
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Layout className={sidebarData?.Sidebar?.collapsed ? styles['site-content-collapsed'] : styles['site-content']}>
        <Sidebar />
        <Layout className={styles['site-layout']}>
          <Content style={{ padding: '1em' }}>
            <Suspense fallback={<>Loading...</>}>
              <Route {...props} />
            </Suspense>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Footer</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AuthenticatedRoute;
