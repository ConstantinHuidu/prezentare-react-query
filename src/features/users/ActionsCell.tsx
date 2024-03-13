import { Box, IconButton } from "@mui/material";
import { Block, CheckCircle, Edit } from "@mui/icons-material";

import { User } from "./hooks";
import { MRT_Row } from "material-react-table";

type Props = {
  row: MRT_Row<User>;
  handleEditClick: () => void;
  handleToggleClick: () => void;
};

export const ActionsCell = (props: Props) => {
  const { row, handleEditClick, handleToggleClick } = props;

  const isRowActive = row.original.isActive;

  return (
    <Box display="flex" gap="18px" justifyContent="center">
      <IconButton onClick={handleEditClick}>
        <Edit color="primary" />
      </IconButton>

      <IconButton onClick={handleToggleClick}>
        {isRowActive && <Block color="error" />}
        {!isRowActive && <CheckCircle color="success" />}
      </IconButton>
    </Box>
  );
};
