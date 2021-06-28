import { useEffect, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import { Layout } from 'antd';

import Sidebar from '../Sidebar';
import { pingMe } from '../../redux/actions/auth';
import { resetRedirect } from '../../redux/actions/ui';
import Header from '../Header';

import styles from './style.module.scss';

const { Content, Footer } = Layout;

interface IProps extends RouteProps {}

const AuthenticatedRoute = (props: IProps) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { sidebar } = useSelector((state: any) => state.ui);

  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const { redirectLink } = useSelector((state: any) => state.ui);

  useEffect(() => {
    dispatch(pingMe());
  }, [dispatch]);

  useEffect(() => {
    if (redirectLink) {
      history.push(redirectLink);
    }
  }, [history, redirectLink]);

  useEffect(() => {
    return function () {
      dispatch(resetRedirect());
    };
  }, [dispatch]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Layout className={sidebar.collapsed ? styles['site-content-collapsed'] : styles['site-content']}>
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
