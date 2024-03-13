import { axiosApi } from "../../../utils/axios";
import { User } from "./useGetUsers";

const USERS_LIST_ROOT = "/users";

export type StatusUpdateParams = {
  id: string;
  requestBody: User;
};

export const toggleUserStatus = ({
  id,
  requestBody,
}: StatusUpdateParams): Promise<void> => {
  return axiosApi.put(`${USERS_LIST_ROOT}/${id}`, requestBody);
};
