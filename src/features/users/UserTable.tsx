import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ToggleUserStatusModalBody } from "./ToggleUserStatusModalBody";
import { CustomModal } from "../../components/CustomModal";
import { UserForm } from "./UserForm";
import { ActionsCell } from "./ActionsCell";
import { StatusCell } from "./StatusCell";

import { showToast } from "../../utils/show-toast";
import { useModal } from "../../hooks/useModal";
import {
  StatusUpdateParams,
  User,
  updateUserInfo,
  useGetUsers,
  useUpdateUserStatus,
} from "./hooks";

import { DEFAULT_PAGINATION } from "../../config/constants";

import {
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";

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

  const { users, isError, isLoading } = useGetUsers();
  const { toggleStatus } = useUpdateUserStatus();

  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { mutateAsync: updateUser } = useMutation({
    mutationFn: ({ id, requestBody }: StatusUpdateParams) =>
      updateUserInfo({ id, requestBody }),
    mutationKey: ["update-user-info"],
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
        Cell: ({ row }) => <StatusCell row={row} />,
      },
      {
        header: "Actions",
        muiTableHeadCellProps: { align: "center" },
        muiTableBodyCellProps: { align: "center" },
        Cell: ({ row }) => {
          return (
            <ActionsCell
              row={row}
              handleEditClick={() => {
                handleOpenEditModal();
                setSelectedUser(row.original);
              }}
              handleToggleClick={() => {
                handleOpenToggleModal();
                setSelectedUser(row.original);
              }}
            />
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
        title="Update user info"
        modalBody={
          <UserForm
            user={selectedUser as User}
            handleClose={handleCloseEditModal}
            handleConfirm={handleUpdateUserInfo}
          />
        }
      />
    </>
  );
};
