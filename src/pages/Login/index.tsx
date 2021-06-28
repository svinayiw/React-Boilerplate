import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Layout, Card, Row, Col, Form, Input, Button, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import config from '../../config';
import routes from '../../config/routes';
import { notifyGraphqlError } from '../../utils/error';
import { authVar } from '../../App/link';

import logo from '../../logo.png';
import styles from './style.module.scss';

const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    Login(input: $input) {
      _id
      role
      token
      refreshToken
    }
  }
`;

const Login = () => {
  const history = useHistory();

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted(response) {
      const auth = response?.Login;
      if (auth?.role !== config.roles.admin) {
        message.error('Bad credentials');
        return;
      }

      authVar({
        token: auth?.token,
        user: {
          _id: auth?._id,
          role: null,
        },
        isLoggedIn: true,
      });

      history.push(routes.dashboard.path);
    },
    onError(err) {
      notifyGraphqlError(err);
    },
  });

  const handleSubmit = (values: any) => {
    login({
      variables: {
        input: {
          email: values.email,
          password: values.password,
        },
      },
    });
  };

  return (
    <Layout>
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col>
          <Card>
            <div className={styles['signin-content']}>
              <div className={styles['signin-header']}>
                <img className={styles.logo} alt="logo" src={logo} />
                <h1>Sign In</h1>
              </div>
              <Form onFinish={handleSubmit} layout="vertical">
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input email!',
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input password!',
                    },
                  ]}
                >
                  <Input.Password
                    type="password"
                    placeholder="Password"
                    iconRender={(visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>

                <Form.Item style={{ paddingTop: '1em' }}>
                  <Button type="primary" htmlType="submit" className={styles['login-form-button']} loading={loading}>
                    Sign in
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Login;
