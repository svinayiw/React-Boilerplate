import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import { DashboardOutlined, UserOutlined } from '@ant-design/icons';

import routes from '../../config/routes';
import { toggleSidebar } from '../../redux/actions/ui';

import styles from './style.module.scss';

const { Sider } = Layout;

const menuKeys = [routes.dashboard.path, routes.users.path];

const Sidebar = (props: any) => {
  const location = useLocation();

  const dispatch = useDispatch();
  const { sidebar } = useSelector((state: any) => state.ui);

  const onCollapse = () => {
    dispatch(toggleSidebar(!sidebar.collapsed));
  };

  const selectedMenuKey = menuKeys.find((key) => key === location.pathname) ?? '';

  return (
    <Sider
      className={styles['site-sidebar']}
      width={200}
      collapsible
      collapsed={sidebar.collapsed}
      onCollapse={onCollapse}
      breakpoint="lg"
      collapsedWidth="0"
      trigger={null}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
        selectedKeys={[selectedMenuKey]}
      >
        <Menu.Item icon={<DashboardOutlined />} key={routes.dashboard.path}>
          <Link to={routes.dashboard.path}>Dashboard</Link>
        </Menu.Item>

        <Menu.Item icon={<UserOutlined />} key={routes.users.path}>
          <Link to={routes.users.path}>Users</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
