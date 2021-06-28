import { useSelector } from 'react-redux';
import { Form, Input, Button, message } from 'antd';

import UserService from '../../../services/User';
import { notifyError } from '../../../utils/error';

const ChangePassword = () => {
  const [form] = Form.useForm();
  const { loggedInUser } = useSelector((state: any) => state.auth);

  const onFinish = (values: any) => {
    const oldPassword = values.oldPassword;
    const password = values.password;

    if (!loggedInUser?._id) {
      return;
    }

    UserService.changePassword({
      id: loggedInUser._id,
      oldPassword,
      password,
    })
      .then((response) => {
        message.success(response?.message);
        form.resetFields();
      })
      .catch(notifyError);
  };

  return (
    <>
      <Form layout="vertical" initialValues={{ remember: true }} onFinish={onFinish} form={form}>
        <Form.Item
          label="Old password"
          name="oldPassword"
          rules={[{ required: true, message: 'Please enter old password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="New password"
          name="password"
          rules={[{ required: true, message: 'Please enter new password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirm_password"
          rules={[
            { required: true, message: 'Please re-enter Password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The password that you entered does not match!');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Change
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ChangePassword;
