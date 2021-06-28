//import querystring from 'query-string';

//import Http from './Http';
import { IUserPagingInput, IUserCreate, /*IUser, */ IUserUpdate, IChangePassword } from '../interfaces/IUser';
//import { IResponse, IPagingResponse } from '../interfaces/IHttp';

//const http = new Http();

const data = [
  {
    _id: '1',
    username: 'username',
    email: 'admin@api.com',
    firstName: 'first',
    lastName: 'last',
    roles: 'admin',
    createdAt: '2021-06-28',
    updatedAt: '2021-06-28',
  },
];

export default class UserService {
  static getUsers(args: IUserPagingInput) {
    return Promise.resolve({
      message: 'fetched',
      data: {
        paging: {
          total: 1,
          startIndex: 0,
          endIndex: 1,
          hasNextPage: false,
        },
        results: data,
      },
    });
    /*
    let query = querystring.stringify(args);
    return http.get<IPagingResponse<IUser>>({
      endpoint: `/v1/users/?${query}`,
    })
    */
  }

  static getUser(id: string) {
    return Promise.resolve({
      message: 'fetched',
      data: data[0],
    });
    /*
    return http.get<IResponse<IUser>>({
      endpoint: `/v1/users/${id}`,
    })
    */
  }

  static addUser(args: IUserCreate) {
    return Promise.resolve({
      message: 'added',
      data: data[0],
    });
    /*
    return http.post<IResponse<IUser>>({
      endpoint: 'v1/users',
      payload: args,
    })
    */
  }

  static updateUser(args: { id: string } & IUserUpdate) {
    return Promise.resolve({
      message: 'updated',
      data: data[0],
    });
    /*
    const { id, ...rest } = args;
    return http.put<IResponse<IUser>>({
      endpoint: `/v1/users/${args.id}`,
      payload: rest,
    })
    */
  }

  static changePassword(args: { id: string } & IChangePassword) {
    return Promise.resolve({
      message: 'changed',
      data: true,
    });
    /*
    const { id, ...rest } = args;
    return http.put<IResponse<boolean>>({
      endpoint: `/v1/users/change-password/${args.id}`,
      payload: rest,
    })
    */
  }
}
