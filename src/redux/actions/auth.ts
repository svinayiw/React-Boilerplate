import * as types from '../types/auth';
import { REDIRECT } from '../types/ui';
import { ILoginInput } from '../../interfaces/IAuth';
import routes from '../../config/routes';
import config from '../../config';
import { setToken, removeToken } from '../../utils/token';
import { IUser, IUserUpdate } from '../../interfaces/IUser';
import { IResponse } from '../../interfaces/IHttp';
import { message } from 'antd';

import AuthService from '../../services/Auth';
import UserService from '../../services/User';

export const login = (args: ILoginInput) => (dispatch: any) => {
  dispatch({
    type: types.AUTH_LOADING,
  });

  return AuthService.login(args)
    .then((response) => {
      if (response.data?.role !== config.roles.admin) {
        dispatch({
          type: types.LOGIN_FAILED,
          error: null,
        });
        message.error('Bad credentials');
        return;
      }

      setToken({
        name: config.tokenName,
        value: JSON.stringify(response?.data),
      });

      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: response,
      });

      dispatch({
        type: REDIRECT,
        payload: routes.dashboard,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.LOGIN_FAILED,
        error: err,
      });
    });
};

export const pingMe = () => (dispatch: any) => {
  dispatch({
    type: types.PING_ME_LOADING,
  });

  return AuthService.pingMe()
    .then((response) => {
      dispatch({
        type: types.PING_ME_SUCCESS,
        payload: response?.data,
      });
    })
    .catch((err) => {
      if (err.status === 401) {
        removeToken({
          name: config.tokenName,
        });
      } else {
        dispatch({
          type: types.PING_ME_FAILED,
          error: err.message,
        });
      }

      dispatch({
        type: REDIRECT,
        payload: routes.login.path,
      });
    });
};

export const updateLoggedInInfo = (args: { id: string } & IUserUpdate) => (dispatch: any) => {
  dispatch({
    type: types.LOGGED_IN_UPDATE_LOADING,
  });

  return UserService.updateUser(args)
    .then((response: IResponse<IUser>) => {
      message.success(response?.message);
      dispatch({
        type: types.LOGGED_IN_UPDATE_SUCCESS,
        payload: {
          firstName: response?.data?.firstName,
          lastName: response?.data?.lastName,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.LOGGED_IN_UPDATE_FAILED,
        error: err.data,
      });
    });
};

export const resetError = () => (dispatch: any) => {
  dispatch({
    type: types.AUTH_RESET_ERROR,
  });
};
