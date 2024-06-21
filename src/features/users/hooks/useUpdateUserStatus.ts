import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USERS_LIST_ROOT } from "../../../config/constants";
import { axiosApi } from "../../../utils/axios";
import { StatusUpdateParams } from "./useUpdateUserInfo";

export const toggleUserStatus = ({
  id,
  requestBody,
}: StatusUpdateParams): Promise<void> => {
  return axiosApi.put(`${USERS_LIST_ROOT}/${id}`, requestBody);
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: toggleStatus } = useMutation({
    mutationKey: ["toggle-status"],
    mutationFn: ({ id, requestBody }: StatusUpdateParams) =>
      toggleUserStatus({ id, requestBody }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { toggleStatus };
};
