import { USERS_LIST_ROOT } from "../../../config/constants";
import { axiosApi } from "../../../utils/axios";

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
