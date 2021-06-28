import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Card, message } from 'antd';

import routes from '../../../config/routes';
import UserService from '../../../services/User';
import { IUserCreate, IUserUpdate } from '../../../interfaces/IUser';

interface IProps {
  id?: string;
}

const UserForm = (props: IProps) => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<any>(null);

  useEffect(() => {
    if (props?.id) {
      UserService.getUser(props?.id)
        .then((response) => {
          setInitialValues({
            email: response.data?.email,
            firstName: response.data?.firstName,
            lastName: response.data?.lastName,
          });
        })
        .catch((err: any) => {
          handleError(err);
        });
    }
  }, [props?.id]);

  if (props?.id && !initialValues) {
    return null;
  }

  const onFinish = (values: any) => {
    setLoading(true);
    const email = values.email;
    const password = values.password;
    const firstName = values.firstName;
    const lastName = values.lastName;

    if (props?.id) {
      const args: IUserUpdate = {
        firstName,
        lastName,
      };

      UserService.updateUser({ id: props.id, ...args })
        .then((response) => {
          message.success(response.message);
        })
        .catch((err) => {
          handleError(err);
        })
        .finally(() => setLoading(false));
    } else {
      const args: IUserCreate = {
        email,
        password,
        firstName,
        lastName,
      };

      UserService.addUser(args)
        .then((response) => {
          message.success(response.message);
          history.push(routes.users.path);
        })
        .catch((err) => {
          handleError(err);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish} initialValues={initialValues}>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={18}>
          <Card>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input placeholder="Email" disabled={props?.id ? true : false} />
            </Form.Item>

            {!props?.id && (
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input placeholder="Password" type="password" />
              </Form.Item>
            )}

            <Form.Item
              label="First name"
              name="firstName"
              rules={[{ required: true, message: 'Please input your first name!' }]}
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
              <Button htmlType="submit" type="primary" loading={loading}>
                Save
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};

function handleError(err: any) {
  message.error(
    <>
      {err?.data?.message}
      {err?.data?.details?.map((e: string, index: number) => (
        <span style={{ display: 'block' }} key={index}>
          {e}
        </span>
      ))}
    </>
  );
}

export default UserForm;
