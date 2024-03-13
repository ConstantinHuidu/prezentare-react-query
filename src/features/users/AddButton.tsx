import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CustomModal } from "../../components/CustomModal";
import { AddUserForm } from "./AddUserForm";

import { Box, Button } from "@mui/material";

import { useModal } from "../../hooks/useModal";
import { showToast } from "../../utils/show-toast";
import { addUser } from "./hooks/useAddUser";

import { User } from "./hooks/useGetUsers";

export const AddButton = () => {
  const { isOpen, handleCloseModal, handleOpenModal } = useModal();

  const queryClient = useQueryClient();

  const { mutateAsync: addNewUser } = useMutation({
    mutationKey: ["add-user"],
    mutationFn: (user: User) => addUser(user),
  });

  const handleAddUser = (user: User) => {
    addNewUser(user, {
      onSuccess: () => {
        handleCloseModal();
        showToast("success", "Added new user");
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    });
  };
  return (
    <>
      <Box display="flex" marginBottom="12px">
        <Button variant="outlined" onClick={handleOpenModal}>
          Add new user
        </Button>
      </Box>
      <CustomModal
        isOpen={isOpen}
        title="Add new user"
        handleClose={handleCloseModal}
        modalBody={
          <AddUserForm
            handleClose={handleCloseModal}
            handleConfirm={handleAddUser}
          />
        }
      />
    </>
  );
};
