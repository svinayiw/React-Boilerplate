import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';

import { updateLoggedInInfo } from '../../../redux/actions/auth';
import { notifyError } from '../../../utils/error';

const BasicInformation = () => {
  const dispatch = useDispatch();
  const { loggedInUser, infoUpdateLoading, error } = useSelector((state: any) => state.auth);
  const firstName = loggedInUser?.firstName;
  const lastName = loggedInUser?.lastName;

  const onFinish = (values: any) => {
    const id = loggedInUser?._id;
    const firstName = values.firstName;
    const lastName = values.lastName;

    if (!loggedInUser?._id) {
      return;
    }

    dispatch(
      updateLoggedInInfo({
        id,
        firstName,
        lastName,
      })
    );
  };

  if (error) {
    notifyError(error);
  }

  if (!loggedInUser) {
    return null;
  }

  return (
    <>
      <Form layout="vertical" initialValues={{ firstName, lastName }} onFinish={onFinish}>
        <Form.Item
          label="First name"
          name="firstName"
          rules={[{ required: true, message: 'Please enter first name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Last name" name="lastName" rules={[{ required: true, message: 'Please enter last name!' }]}>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={infoUpdateLoading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default BasicInformation;
