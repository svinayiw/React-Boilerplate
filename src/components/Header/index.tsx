import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';

import config from '../../config';
import routes from '../../config/routes';
import { removeToken } from '../../utils/token';
import { toggleSidebar } from '../../redux/actions/ui';

import styles from './style.module.scss';

const { Header } = Layout;

const TopHeader = () => {
  const dispatch = useDispatch();
  const { sidebar } = useSelector((state: any) => state.ui);

  const onClick = () => {
    dispatch(toggleSidebar(!sidebar.collapsed));
  };

  const handleLogout = () => {
    removeToken({ name: config.tokenName });
    window.location.href = '/';
  };

  const menu = (
    <Menu style={{ width: 120 }}>
      <Menu.Item>
        <Link to={routes.settings.path}>Settings</Link>
      </Menu.Item>

      <Menu.Item>
        <div onClick={handleLogout}>Logout</div>
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
