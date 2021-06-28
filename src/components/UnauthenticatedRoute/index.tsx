import { Suspense } from 'react';
import { useQuery } from '@apollo/client';
import { Route, RouteProps, useHistory } from 'react-router-dom';

import routes from '../../config/routes';
import { AUTH } from '../../gql/auth';

interface IProps extends RouteProps {}

const UnauthenticatedRoute = (props: IProps) => {
  const history = useHistory();
  const { data } = useQuery(AUTH);

  const isLoggedIn = data?.AuthUser?.isLoggedIn;
  if (isLoggedIn) {
    history.push(routes.dashboard.path);
  }

  return (
    <Suspense fallback={<>Loading...</>}>
      <Route {...props} />
    </Suspense>
  );
};

export default UnauthenticatedRoute;
