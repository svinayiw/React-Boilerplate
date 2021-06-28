import { IPaging, IPagingResult } from './IPaging';

export interface IUser {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IUserPagingInput {
  limit?: number;
  skip?: number;
  sort?: string;
}

export interface IUserState {
  listLoading: boolean;
  paging: IPaging;
  users: IUser[];
  error: any;
}

export interface IUserCreate {
  email: string;
  password: string;
  firstName: string;
  username?: string;
  lastName?: string;
  role?: string;
}

export interface IUserUpdate {
  firstName: string;
  lastName?: string;
}

export interface IChangePassword {
  oldPassword: string;
  password: string;
}
