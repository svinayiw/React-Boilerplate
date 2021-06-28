import { useQuery } from '@apollo/client';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import { DashboardOutlined, UserOutlined } from '@ant-design/icons';

import routes from '../../config/routes';
import { SIDEBAR } from '../../gql/app';
import { sidebarVar } from '../../App/link';

import styles from './style.module.scss';

const { Sider } = Layout;

const menuKeys = [routes.dashboard.path, routes.users.path];

const Sidebar = (props: any) => {
  const location = useLocation();
  const { data: sidebarData } = useQuery(SIDEBAR);

  const onCollapse = () => {
    const collapsed = sidebarData?.Sidebar?.collapsed;
    sidebarVar({
      ...sidebarData.Sidebar,
      collapsed: !collapsed,
    });
  };

  const selectedMenuKey = menuKeys.find((key) => key === location.pathname) ?? '';

  return (
    <Sider
      className={styles['site-sidebar']}
      width={200}
      collapsible
      collapsed={sidebarData?.Sidebar?.collapsed}
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
          <Link to={routes.dashboard.path}>{routes.dashboard.name}</Link>
        </Menu.Item>

        <Menu.Item icon={<UserOutlined />} key={routes.users.path}>
          <Link to={routes.users.path}>{routes.users.name}</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
