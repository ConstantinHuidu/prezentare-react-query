import { USERS_LIST_ROOT } from "../../../config/constants";
import { axiosApi } from "../../../utils/axios";
import { StatusUpdateParams } from "./useUpdateUserInfo";

export const toggleUserStatus = ({
  id,
  requestBody,
}: StatusUpdateParams): Promise<void> => {
  return axiosApi.put(`${USERS_LIST_ROOT}/${id}`, requestBody);
};
