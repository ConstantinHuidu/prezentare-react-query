import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ToggleUserStatusModalBody } from "./ToggleUserStatusModalBody";
import { CustomModal } from "../../components/CustomModal";

import { Box, IconButton } from "@mui/material";
import { Block, CheckCircle, Edit } from "@mui/icons-material";

import { showToast } from "../../utils/show-toast";
import { useModal } from "../../hooks/useModal";
import { User, getUsers } from "./hooks/useGetUsers";
import {
  StatusUpdateParams,
  toggleUserStatus,
} from "./hooks/useUpdateUserStatus";

import {
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import { AddUserForm } from "./AddUserForm";
import { updateUserInfo } from "./hooks/useUpdateUserInfo";

export const DEFAULT_PAGINATION = {
  pageIndex: 0,
  pageSize: 25,
};

export const UserTable = () => {
  const queryClient = useQueryClient();

  const {
    isOpen: isToggleModalOpen,
    handleCloseModal: handleCloseToggleModal,
    handleOpenModal: handleOpenToggleModal,
  } = useModal();

  const {
    isOpen: isEditModalOpen,
    handleCloseModal: handleCloseEditModal,
    handleOpenModal: handleOpenEditModal,
  } = useModal();

  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { mutateAsync: toggleStatus } = useMutation({
    mutationKey: ["toggle-status"],
    mutationFn: ({ id, requestBody }: StatusUpdateParams) =>
      toggleUserStatus({ id, requestBody }),
  });

  const { mutateAsync: updateUser } = useMutation({
    mutationFn: ({ id, requestBody }: StatusUpdateParams) =>
      updateUserInfo({ id, requestBody }),
    mutationKey: ["update-user-info"],
  });

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  const handleToggleUserStatus = () => {
    const id = selectedUser?.id as string;
    const requestBody = {
      ...(selectedUser as User),
      isActive: !selectedUser?.isActive,
    };

    toggleStatus(
      { id, requestBody },
      {
        onSuccess: () => {
          handleCloseToggleModal();
          showToast("success", "Status updated successfully!");
          queryClient.invalidateQueries({ queryKey: ["users"] });
        },
      }
    );
  };

  const handleUpdateUserInfo = (user: User) => {
    const id = user.id as string;
    updateUser(
      { id, requestBody: user },
      {
        onSuccess: () => {
          handleCloseEditModal();
          showToast("success", "User info updated successfully!");
          queryClient.invalidateQueries({ queryKey: ["users"] });
        },
      }
    );
  };

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      { header: "First Name", accessorKey: "firstName" },
      { header: "Last Name", accessorKey: "lastName" },
      { header: "Email", accessorKey: "email" },
      {
        header: "Status",
        accessorKey: "isActive",
        muiTableHeadCellProps: { align: "center" },
        muiTableBodyCellProps: { align: "center" },
        Cell: ({ row }) => {
          return (
            <Box
              display="flex"
              justifyContent="center"
              color={row.original.isActive ? "#00b150" : "#ff6700"}
              fontWeight="700"
              fontSize="14px"
            >
              {row.original.isActive ? "ACTIVE" : "INACTIVE"}
            </Box>
          );
        },
      },
      {
        header: "Actions",
        muiTableHeadCellProps: { align: "center" },
        muiTableBodyCellProps: { align: "center" },
        Cell: ({ row }) => {
          return (
            <Box display="flex" gap="18px" justifyContent="center">
              <IconButton
                onClick={() => {
                  handleOpenEditModal();
                  setSelectedUser(row.original);
                }}
              >
                <Edit color="primary" />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleOpenToggleModal();
                  setSelectedUser(row.original);
                }}
              >
                {row.original.isActive ? (
                  <Block color="error" />
                ) : (
                  <CheckCircle color="success" />
                )}
              </IconButton>
            </Box>
          );
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable<User>({
    columns,
    data: users as User[],

    enableFullScreenToggle: false,
    enableColumnOrdering: false,
    enableGlobalFilter: false,
    enableFilters: false,
    enableColumnActions: false,
    enableHiding: false,
    enableSorting: false,
    enableSelectAll: false,
    enableExpanding: false,
    manualSorting: false,
    enableTopToolbar: false,
    onPaginationChange: () => setPagination,
    initialState: { density: "compact" },
    state: { pagination, isLoading },
  });

  if (isError) {
    return <p>Something went wrong...</p>;
  }

  return (
    <>
      <MaterialReactTable table={table} />

      <CustomModal
        isOpen={isToggleModalOpen}
        handleClose={handleCloseToggleModal}
        title={selectedUser?.isActive ? "Deactivate user" : "Activate user"}
        modalBody={
          <ToggleUserStatusModalBody
            handleClose={handleCloseToggleModal}
            handleConfirm={handleToggleUserStatus}
            user={selectedUser as User}
          />
        }
      />

      <CustomModal
        isOpen={isEditModalOpen}
        handleClose={handleCloseEditModal}
        title="Edit user info"
        modalBody={
          <AddUserForm
            user={selectedUser as User}
            handleClose={handleCloseEditModal}
            handleConfirm={handleUpdateUserInfo}
          />
        }
      />
    </>
  );
};
