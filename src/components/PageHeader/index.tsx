import { PageHeader as AntdPageHeader } from 'antd';
import { Link } from 'react-router-dom';

import { IBreadcrumbRoute } from '../../interfaces/IRoutes';

import styles from './style.module.scss';

interface IProps {
  title: string;

  /**
   * Breadcrumbs
   */
  routes?: IBreadcrumbRoute[];

  extra?: [React.ReactNode];
}

const itemRender = (route: IBreadcrumbRoute, params: any, routes: IBreadcrumbRoute[], paths: any) => {
  const last: boolean = routes.indexOf(route) === routes.length - 1;

  return last ? <span>{route.breadcrumbName}</span> : <Link to={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>;
};

const PageHeader = (props: IProps) => {
  return (
    <AntdPageHeader
      title={props.title}
      breadcrumb={{ itemRender, routes: props?.routes }}
      className={styles['page-header']}
      extra={props.extra}
    />
  );
};

export default PageHeader;
