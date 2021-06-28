import * as types from '../types/user';
import UserService from '../../services/User';
import { IUser, IUserPagingInput } from '../../interfaces/IUser';
import { IPagingResponse } from '../../interfaces/IHttp';

export const getUsers = (args: IUserPagingInput) => (dispatch: any) => {
  dispatch({
    type: types.USER_LIST_LOADING,
  });

  return UserService.getUsers(args)
    .then((response: IPagingResponse<IUser>) => {
      dispatch({
        type: types.USER_LIST_SUCCESS,
        payload: {
          users: response.data?.results,
          paging: response.data?.paging,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.USER_LIST_FAILED,
        error: err,
      });
    });
};
