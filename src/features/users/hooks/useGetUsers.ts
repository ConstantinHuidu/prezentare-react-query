import { axiosApi } from "../../../utils/axios";

const USERS_LIST_ROOT = "/users";

export type User = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
};

export const getUsers = (): Promise<User[]> => {
  return axiosApi.get(`${USERS_LIST_ROOT}`);
};
