import { useCallback, useEffect, useMemo, useState } from "react";

import { ToggleUserStatusModalBody } from "./ToggleUserStatusModalBody";
import { CustomModal } from "../../components/CustomModal";
import { UserForm } from "./UserForm";
import { ActionsCell } from "./ActionsCell";
import { StatusCell } from "./StatusCell";

import { showToast } from "../../utils/show-toast";
import { useModal } from "../../hooks/useModal";
import { User, getUsers, toggleUserStatus, updateUserInfo } from "./hooks";

import { DEFAULT_PAGINATION } from "../../config/constants";

import {
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";

export const OGUserTable = () => {
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
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldRefetch, setShouldRefetch] = useState(true);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    const userList = await getUsers();
    setUsers(userList);
    setIsLoading(false);
    setShouldRefetch(false);
  }, []);

  useEffect(() => {
    if (shouldRefetch) {
      fetchUsers();
    }
  }, [shouldRefetch]);

  const handleToggleUserStatus = () => {
    const id = selectedUser?.id as string;
    const requestBody = {
      ...(selectedUser as User),
      isActive: !selectedUser?.isActive,
    };

    toggleUserStatus({ id, requestBody }).then(() => {
      handleCloseToggleModal();
      showToast("success", "Status updated");
      setShouldRefetch(true);
    });
  };

  const handleUpdateUserInfo = (user: User) => {
    const id = user.id as string;
    updateUserInfo({ id, requestBody: user }).then(() => {
      handleCloseEditModal();
      showToast("success", "User info updated");
      setShouldRefetch(true);
    });
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
