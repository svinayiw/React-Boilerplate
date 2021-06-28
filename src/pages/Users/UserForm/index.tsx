import { useEffect } from 'react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Card, message } from 'antd';

import routes from '../../../config/routes';
import { notifyGraphqlError } from '../../../utils/error';

interface IProps {
  id?: string;
}

const USER = gql`
  query Users($input: UserQueryInput) {
    Users(input: $input) {
      data {
        _id
        email
        firstName
        lastName
      }
    }
  }
`;

const USER_CREATE = gql`
  mutation UserCreate($input: UserCreate!) {
    UserCreate(input: $input) {
      _id
      email
      firstName
      role
    }
  }
`;

const USER_UPDATE = gql`
  mutation UserUpdate($input: UserUpdate!) {
    UserUpdate(input: $input) {
      _id
      firstName
      lastName
    }
  }
`;

const UserForm = (props: IProps) => {
  const history = useHistory();

  const [fetchUser, { data: userData }] = useLazyQuery(USER, {
    variables: {
      input: {
        _id: props?.id,
      },
    },
  });

  const [createUser, { loading: createLoading }] = useMutation(USER_CREATE, {
    onCompleted(response) {
      message.success('User created.');
      history.push(routes.users.path);
    },
    onError(err) {
      notifyGraphqlError(err);
    },
  });

  const [updateUser, { loading: updateLoading }] = useMutation(USER_UPDATE, {
    onCompleted(response) {
      message.success('User updated.');
    },
    onError(err) {
      notifyGraphqlError(err);
    },
  });

  useEffect(() => {
    if (props?.id) {
      fetchUser();
    }
  }, [props?.id, fetchUser]);

  if (props?.id && !userData) {
    return null;
  }

  const user = userData?.Users?.data?.[0];

  const initialValues = {
    email: user?.email,
    firstName: user?.firstName,
    lastName: user?.lastName,
  };

  const onFinish = (values: any) => {
    const email = values.email;
    const password = values.password;
    const firstName = values.firstName;
    const lastName = values.lastName;

    if (props?.id) {
      updateUser({
        variables: {
          input: {
            _id: props?.id,
            firstName,
            lastName,
          },
        },
      });
    } else {
      createUser({
        variables: {
          input: {
            email,
            password,
            firstName,
            lastName,
          },
        },
      });
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish} initialValues={initialValues}>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={18}>
          <Card>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input email!' }]}>
              <Input placeholder="Email" disabled={props?.id ? true : false} />
            </Form.Item>

            {!props?.id && (
              <Form.Item
                label="password"
                name="password"
                rules={[{ required: true, message: 'Please input password!' }]}
              >
                <Input placeholder="Password" type="password" />
              </Form.Item>
            )}

            <Form.Item
              label="First name"
              name="firstName"
              rules={[{ required: true, message: 'Please input first name!' }]}
            >
              <Input placeholder="First name" />
            </Form.Item>

            <Form.Item label="Last name" name="lastName">
              <Input placeholder="Last name" />
            </Form.Item>
          </Card>
        </Col>

        <Col xs={24} md={6}>
          <Card>
            <div>
              <p>Actions</p>
              <Button htmlType="submit" type="primary" loading={createLoading || updateLoading}>
                Save
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};

export default UserForm;
