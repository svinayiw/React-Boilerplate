import { useParams } from 'react-router-dom';

import routes from '../../../config/routes';
import { IBreadcrumbRoute } from '../../../interfaces/IRoutes';

import UserForm from '../UserForm';
import PageHeader from '../../../components/PageHeader';

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
    path: routes.editUser.path(':id'),
    breadcrumbName: routes.editUser.name,
  },
];

const EditUser = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <PageHeader title="Edit user" routes={breadcrumbRoutes} />
      <UserForm id={id} />
    </>
  );
};

export default EditUser;
