import { BrowserRouter as Router, Switch } from 'react-router-dom';

import routes from '../config/routes';
import AuthenticatedRoute from '../components/AuthenticatedRoute';
import UnauthenticatedRoute from '../components/UnauthenticatedRoute';
import NotFound from '../components/NotFound';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <AuthenticatedRoute path={routes.dashboard.path} component={routes.dashboard.component} exact />

        <UnauthenticatedRoute path={routes.login.path} component={routes.login.component} />

        <AuthenticatedRoute path={routes.users.path} component={routes.users.component} exact />

        <AuthenticatedRoute path={routes.newUser.path} component={routes.newUser.component} />

        <AuthenticatedRoute path={routes.editUser.path(':id')} component={routes.editUser.component} />

        <AuthenticatedRoute path={routes.settings.path} component={routes.settings.component} exact />

        <AuthenticatedRoute component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
