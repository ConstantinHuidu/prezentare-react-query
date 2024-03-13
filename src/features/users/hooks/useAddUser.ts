import { USERS_LIST_ROOT } from "../../../config/constants";
import { axiosApi } from "../../../utils/axios";
import { User } from "./useGetUsers";

export const addUser = (requestBody: User): Promise<void> => {
  return axiosApi.post(`${USERS_LIST_ROOT}`, requestBody);
};
