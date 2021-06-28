import { gql, useQuery, useMutation } from '@apollo/client';
import { Form, Input, Button, message } from 'antd';

import { notifyGraphqlError } from '../../../utils/error';
import { AUTH } from '../../../gql/auth';

const USER = gql`
  query Users($input: UserQueryInput) {
    Users(input: $input) {
      data {
        _id
        firstName
        lastName
      }
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

const BasicInformation = () => {
  const { data: authData } = useQuery(AUTH);

  const { data: userData, loading: userLoading } = useQuery(USER, {
    fetchPolicy: 'cache-first',
    variables: {
      input: {
        _id: authData?.AuthUser?.user?._id,
      },
    },
    onError(err) {
      notifyGraphqlError(err);
    },
  });

  const [updateUser, { loading: updateLoading }] = useMutation(USER_UPDATE, {
    onCompleted(response) {
      if (response?.UserUpdate) {
        message.success('Info updated');
      }
    },
    onError(err) {
      notifyGraphqlError(err);
    },
  });

  const user = userData?.Users?.data?.[0];

  const onFinish = (values: any) => {
    const _id = user?._id;
    const firstName = values.firstName;
    const lastName = values.lastName;

    if (!user) {
      return;
    }

    updateUser({
      variables: {
        input: {
          _id,
          firstName,
          lastName,
        },
      },
    });
  };

  if (userLoading) {
    return <>Loading...</>;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Form
        layout="vertical"
        initialValues={{
          firstName: user?.firstName,
          lastName: user?.lastName,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="First name"
          name="firstName"
          rules={[{ required: true, message: 'Please input first name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Last name" name="lastName">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={updateLoading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default BasicInformation;
