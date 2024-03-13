import { USERS_LIST_ROOT } from "../../../config/constants";
import { axiosApi } from "../../../utils/axios";
import { User } from "./useGetUsers";

export type StatusUpdateParams = {
  id: string;
  requestBody: User;
};

export const updateUserInfo = ({
  id,
  requestBody,
}: StatusUpdateParams): Promise<void> => {
  return axiosApi.put(`${USERS_LIST_ROOT}/${id}`, requestBody);
};
