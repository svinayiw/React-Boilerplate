import { gql, useQuery, useMutation } from '@apollo/client';
import { Form, Input, Button, message } from 'antd';

import { notifyGraphqlError } from '../../../utils/error';
import { AUTH } from '../../../gql/auth';

const CHANGE_PASSWORD = gql`
  mutation UserChangePassword($input: UserChangePassword!) {
    UserChangePassword(input: $input) {
      message
    }
  }
`;

const ChangePassword = () => {
  const { data: authData } = useQuery(AUTH);
  const [form] = Form.useForm();

  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD, {
    onCompleted(response) {
      if (response?.UserChangePassword) {
        message.success('Changed password.');
        form.resetFields();
      }
    },
    onError(err) {
      notifyGraphqlError(err);
    },
  });

  const onFinish = (values: any) => {
    const _id = authData?.AuthUser?.user?._id;
    const oldPassword = values.oldPassword;
    const password = values.password;

    if (!_id) {
      return;
    }

    changePassword({
      variables: {
        input: {
          _id,
          oldPassword,
          password,
        },
      },
    });
  };

  return (
    <>
      <Form layout="vertical" initialValues={{ remember: true }} onFinish={onFinish} form={form}>
        <Form.Item
          label="Old password"
          name="oldPassword"
          rules={[{ required: true, message: 'Please input old password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="New password"
          name="password"
          rules={[{ required: true, message: 'Please input new password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm password"
          name="confirmPassword"
          rules={[
            { required: true, message: 'Please re enter your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('Passwords do not match');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Change
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ChangePassword;
