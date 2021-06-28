import routes from '../../../config/routes';
import { IBreadcrumbRoute } from '../../../interfaces/IRoutes';

import UserForm from '../UserForm';
import PageHeader from '../../../components/PageHeader';

const NewUser = () => {
  const breadcrumbRoutes: IBreadcrumbRoute[] = [
    {
      path: routes.dashboard.path,
      breadcrumbName: routes.dashboard.name,
    },
    {
      path: routes.users.path,
      breadcrumbName: routes.users.name,
    },
    {
      path: routes.newUser.path,
      breadcrumbName: routes.newUser.name,
    },
  ];

  return (
    <>
      <PageHeader title="Add user" routes={breadcrumbRoutes} />
      <UserForm />
    </>
  );
};

export default NewUser;
