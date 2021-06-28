import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Table, Pagination, Skeleton, Button } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';

import config from '../../config';
import routes from '../../config/routes';
import PageHeader from '../../components/PageHeader';
import { IUser } from '../../interfaces/IUser';
import { IBreadcrumbRoute } from '../../interfaces/IRoutes';
import { IPaging } from '../../interfaces/IPaging';

import styles from './style.module.scss';

const USERS = gql`
  query Users($input: UserQueryInput) {
    Users(input: $input) {
      paging {
        total
      }
      data {
        _id
        email
        firstName
        lastName
        createdAt
        updatedAt
      }
    }
  }
`;

const breadcrumbRoutes: IBreadcrumbRoute[] = [
  {
    path: routes.dashboard.path,
    breadcrumbName: routes.dashboard.name,
  },
  {
    path: routes.users.path,
    breadcrumbName: routes.users.name,
  },
];

const Users = () => {
  const perPage = config.paging.perPage;

  const [pagingInput, setPagingInput] = useState<{
    skip: number;
    currentPage: number;
  }>({
    skip: 0,
    currentPage: 1,
  });

  const { data: userData, loading } = useQuery(USERS, {
    fetchPolicy: 'network-only',
    variables: {
      input: {
        skip: pagingInput.skip,
        limit: perPage,
        sort: 'createdAt:desc',
      },
    },
  });

  const users: IUser[] = userData?.Users?.data ?? [];
  const paging: IPaging = userData?.Users?.paging ?? {
    total: 0,
    endIndex: -1,
    startIndex: 0,
    hasNextPage: false,
  };

  const changePage = (page: number) => {
    const newOffset = (page - 1) * perPage;
    setPagingInput({
      ...pagingInput,
      skip: newOffset,
      currentPage: page,
    });
  };

  const columns = [
    {
      title: 'S.N',
      render: (user: any, value: any, index: number) => {
        return <>{pagingInput.skip + index + 1}</>;
      },
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Created at',
      render: (user: IUser) => {
        return <>{moment(user.createdAt).format('YYYY/MM/DD')}</>;
      },
    },
    {
      title: 'Actions',
      render: (user: IUser) => {
        return (
          <Button>
            <Link to={routes.editUser.path(user._id)}>
              <EditOutlined />
            </Link>
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <PageHeader
        title="Users"
        routes={breadcrumbRoutes}
        extra={[
          <Link to={routes.newUser.path} key={routes.newUser.path}>
            <Button type="primary">
              <PlusOutlined /> Add User
            </Button>
          </Link>,
        ]}
      />

      {loading && !users?.length ? (
        <Skeleton />
      ) : (
        <Table
          className="components-table-demo-nested"
          columns={columns}
          dataSource={users}
          pagination={false}
          rowKey={(u: IUser) => u._id}
        />
      )}

      <div className={styles['pagination']}>
        <Pagination current={pagingInput.currentPage} onChange={changePage} total={paging?.total} pageSize={perPage} />
      </div>
    </>
  );
};

export default Users;
