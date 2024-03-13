import { Box } from "@mui/material";
import { User } from "./hooks";
import { MRT_Row } from "material-react-table";

type Props = {
  row: MRT_Row<User>;
};

export const StatusCell = (props: Props) => {
  const { row } = props;
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
};
