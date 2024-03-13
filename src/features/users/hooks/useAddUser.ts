import { axiosApi } from "../../../utils/axios";
import { User } from "./useGetUsers";

const USERS_LIST_ROOT = "/users";

export const addUser = (requestBody: User): Promise<void> => {
  return axiosApi.post(`${USERS_LIST_ROOT}`, requestBody);
};
