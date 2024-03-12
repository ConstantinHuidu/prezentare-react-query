import { useQuery } from "@tanstack/react-query";
import { User, getUsers } from "./useGetUsers";
import { useMemo, useState } from "react";

import {
  //   MRT_SortingState,
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import { Box, IconButton } from "@mui/material";
import { Block, CheckCircle, Edit } from "@mui/icons-material";

export const DEFAULT_PAGINATION = {
  pageIndex: 0,
  pageSize: 25,
};

export const UserTable = () => {
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  //   const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

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
              <IconButton sx={{ fontSize: "12px" }}>
                <Edit color="primary" />
              </IconButton>
              <IconButton sx={{ fontSize: "12px" }}>
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
    </>
  );
};
