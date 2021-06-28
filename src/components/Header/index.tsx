import { useQuery, useMutation, gql, useApolloClient } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';

import routes from '../../config/routes';
import { SIDEBAR } from '../../gql/app';
import { sidebarVar, authVar } from '../../App/link';

import styles from './style.module.scss';

const { Header } = Layout;

const LOGOUT = gql`
  mutation Logout {
    Logout
  }
`;

const TopHeader = () => {
  const history = useHistory();
  const client = useApolloClient();

  const { data: sidebarData } = useQuery(SIDEBAR);

  const onClick = () => {
    const collapsed = sidebarData?.Sidebar?.collapsed;
    sidebarVar({
      ...sidebarData.Sidebar,
      collapsed: !collapsed,
    });
  };

  const [logout] = useMutation(LOGOUT, {
    onCompleted(data) {
      authVar({
        isLoggedIn: false,
        token: null,
        user: {
          role: null,
          _id: null,
        },
      });

      client.clearStore();
      history.push(routes.login.path);
    },
  });

  const menu = (
    <Menu style={{ width: 120 }}>
      <Menu.Item>
        <Link to={routes.settings.path}>Settings</Link>
      </Menu.Item>

      <Menu.Item>
        <div onClick={() => logout()}>Logout</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className={styles['header-container']}>
      <div className={styles['logo']} />

      <MenuOutlined onClick={onClick} style={{ fontSize: 20, color: '#fff', marginLeft: 10 }} />

      <div className={styles['header-avatar']}>
        <Dropdown overlay={menu} trigger={['click']}>
          <div className={styles['avatar-icon']}>
            <Avatar size={38} icon={<UserOutlined />} />
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default TopHeader;
