//import Http from './Http';
//import { IResponse } from '../interfaces/IHttp';
import { /*ILoginResponse, */ ILoginInput, /*ILoggedInUser ,*/ IPasswordReset } from '../interfaces/IAuth';
import { getToken } from '../utils/token';
import config from '../config';

//const http = new Http();

export default class Auth {
  static login(args: ILoginInput) {
    return Promise.resolve({
      message: 'Login successful',
      data: {
        _id: '1',
        token: 'token',
        refreshToken: 'refresh',
        role: 'admin',
      },
    });
    /*
    return http.post<ILoginResponse>({
      endpoint: '/v1/auth/login',
      payload: args,
    })
    */
  }

  static pingMe = () => {
    const token = getToken({
      name: config.tokenName,
    });

    if (!token) {
      return Promise.reject({
        message: 'Failed',
      });
    }

    return Promise.resolve({
      message: '',
      data: {
        username: 'username',
        email: 'admin@api.com',
        firstName: 'first',
        lastName: 'last',
        createdAt: '2021-06-28',
        updatedAt: '2021-06-28',
      },
    });
    /*
    return http.get<IResponse<ILoggedInUser>>({
      endpoint: '/v1/auth/me',
    });
    */
  };

  static passwordReset = (args: IPasswordReset) => {
    return Promise.reject();
    /*
    return http.post<any>({
      endpoint:`/api/v1/user/onboard/activate/${args.token}/`,
      payload:args.data
    })
    */
  };
}
