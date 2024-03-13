import { Box, Button, Typography } from "@mui/material";
import { User } from "./hooks/useGetUsers";

type Props = {
  user: User;
  handleClose: () => void;
  handleConfirm: () => void;
};

export const ToggleUserStatusModalBody = (props: Props) => {
  const { user, handleClose, handleConfirm } = props;

  const modalAction = user.isActive ? "deactivate" : "activate";
  return (
    <Box display="flex" flexDirection="column" gap="38px">
      <Typography>{`By clicking confirm you will ${modalAction} this user`}</Typography>

      <Box display="flex" justifyContent="flex-end" gap="18px">
        <Button
          size="small"
          color="error"
          variant="outlined"
          onClick={handleClose}
        >
          Cancel
        </Button>

        <Button
          size="small"
          color="success"
          variant="contained"
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </Box>
    </Box>
  );
};
