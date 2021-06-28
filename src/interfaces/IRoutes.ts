export interface IRouteProps {
  Component: any;
  path: string;
  exact?: boolean;
  roles?: any[];
}

export interface IBreadcrumbRoute {
  path: string;
  breadcrumbName: string;
}
