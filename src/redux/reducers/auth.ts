import * as types from '../types/auth';
import { IAuthState } from '../../interfaces/IAuth';

const defaultState: IAuthState = {
  loading: false,
  error: null,
  isLoggedIn: false,
  loggedInUser: null,
  pingMeLoading: false,
  infoUpdateLoading: false,
};

const user = (state: IAuthState = defaultState, action: any) => {
  switch (action.type) {
    case types.AUTH_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Login
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        isLoggedIn: true,
      };

    case types.LOGIN_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    // Ping me
    case types.PING_ME_LOADING:
      return {
        ...state,
        pingMeLoading: true,
      };

    case types.PING_ME_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        loggedInUser: action.payload,
        pingMeLoading: false,
      };

    case types.PING_ME_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        loggedInUser: null,
        pingMeLoading: false,
      };

    // Logged in info update
    case types.LOGGED_IN_UPDATE_LOADING:
      return {
        ...state,
        infoUpdateLoading: true,
      };

    case types.LOGGED_IN_UPDATE_SUCCESS:
      return {
        ...state,
        infoUpdateLoading: false,
        loggedInUser: {
          ...state.loggedInUser,
          firstName: action?.payload?.firstName,
          lastName: action?.payload?.lastName,
        },
      };

    case types.LOGGED_IN_UPDATE_FAILED:
      return {
        ...state,
        infoUpdateLoading: true,
        error: action.error,
      };

    case types.AUTH_RESET_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default user;
