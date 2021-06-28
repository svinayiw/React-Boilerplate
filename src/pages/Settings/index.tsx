import { Row, Col, Card } from 'antd';

import routes from '../../config/routes';
import { IBreadcrumbRoute } from '../../interfaces/IRoutes';

import ChangePassword from './ChangePassword';
import BasicInformation from './BasicInformation';
import PageHeader from '../../components/PageHeader';

const breadcrumbRoutes: IBreadcrumbRoute[] = [
  {
    path: routes.dashboard.path,
    breadcrumbName: routes.dashboard.name,
  },
  {
    path: routes.settings.path,
    breadcrumbName: routes.settings.name,
  },
];

const Settings = () => {
  return (
    <>
      <PageHeader title="Settings" routes={breadcrumbRoutes} />
      <Row gutter={[24, 24]}>
        <Col sm={24} md={12}>
          <Card title="Change password">
            <ChangePassword />
          </Card>
        </Col>
        <Col sm={24} md={12}>
          <Card title="Basic information">
            <BasicInformation />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Settings;
