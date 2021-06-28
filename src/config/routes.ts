import { lazy } from 'react';

const routes = {
  dashboard: {
    path: '/',
    component: lazy(() => import('../pages/Dashboard')),
    name: 'Dashboard',
  },
  login: {
    path: '/login',
    component: lazy(() => import('../pages/Login')),
    name: 'Login',
  },
  users: {
    path: '/users',
    component: lazy(() => import('../pages/Users')),
    name: 'Users',
  },
  newUser: {
    path: '/users/add',
    component: lazy(() => import('../pages/Users/NewUser')),
    name: 'Add User',
  },
  editUser: {
    path: (id: string) => `/users/edit/${id}`,
    component: lazy(() => import('../pages/Users/EditUser')),
    name: 'Edit User',
  },
  settings: {
    path: '/settings',
    component: lazy(() => import('../pages/Settings')),
    name: 'Settings',
  },
};

export default routes;
