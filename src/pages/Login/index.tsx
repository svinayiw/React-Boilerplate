import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as authService from '../../redux/actions/auth';
import { resetRedirect } from '../../redux/actions/ui';
import { alertError } from '../../utils/error';

import { Layout, Card, Row, Col, Form, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import logo from '../../logo.png';
import styles from './style.module.scss';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading = false, error } = useSelector((state: any) => state.auth);
  const { redirectLink } = useSelector((state: any) => state.ui);

  useEffect(() => {
    if (redirectLink) {
      history.push(redirectLink);
    }
  }, [history, redirectLink]);

  useEffect(() => {
    return function () {
      dispatch(resetRedirect());
      dispatch(authService.resetError());
    };
  }, [dispatch]);

  const handleSubmit = (values: any) => {
    dispatch(
      authService.login({
        email: values.email,
        password: values.password,
      })
    );
  };

  let errorEle = <></>;
  if (error) {
    errorEle = alertError(error);
  }

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
              <Form
                onFinish={handleSubmit}
                layout="vertical"
                // remove after using original api
                initialValues={{
                  email: 'admin@api.com',
                  password: 'password',
                }}
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your email!',
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
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password
                    type="password"
                    placeholder="Password"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>

                {!!errorEle && errorEle}

                <Form.Item style={{ paddingTop: '1em' }}>
                  <Button type="primary" htmlType="submit" className={styles['login-form-button']} loading={loading}>
                    Sign In
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
