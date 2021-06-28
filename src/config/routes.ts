import { lazy } from 'react';

const routes = {
  dashboard: {
    path: '/',
    component: lazy(() => import('../pages/Dashboard')),
    name: 'Dashboard',
    locale: 'dashboard',
  },
  login: {
    path: '/login',
    component: lazy(() => import('../pages/Login')),
    name: 'Login',
    locale: 'login',
  },
  users: {
    path: '/users',
    component: lazy(() => import('../pages/Users')),
    name: 'Users',
    locale: 'users',
  },
  newUser: {
    path: '/users/add',
    component: lazy(() => import('../pages/Users/NewUser')),
    name: 'Add User',
    locale: 'addUser',
  },
  editUser: {
    path: (id: string) => `/users/edit/${id}`,
    component: lazy(() => import('../pages/Users/EditUser')),
    name: 'Edit User',
    locale: 'editUser',
  },
  settings: {
    path: '/settings',
    component: lazy(() => import('../pages/Settings')),
    name: 'Settings',
    locale: 'settings',
  },
};

export default routes;
