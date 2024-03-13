import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { User } from "./hooks/useGetUsers";

type Props = {
  handleClose: () => void;
  handleConfirm: (user: User) => void;
};

const defaultUser: User = {
  firstName: "",
  lastName: "",
  email: "",
  isActive: false,
};

export const AddUserForm = (props: Props) => {
  const { handleClose, handleConfirm } = props;
  const [user, setUser] = useState(defaultUser);

  const handleChangeUser = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <Box component="form" display="flex" flexDirection="column" gap="24px">
      <TextField
        name="firstName"
        label="First Name"
        fullWidth
        value={user.firstName}
        onChange={handleChangeUser}
      />
      <TextField
        name="lastName"
        label="Last Name"
        fullWidth
        value={user.lastName}
        onChange={handleChangeUser}
      />
      <TextField
        name="email"
        label="Email"
        fullWidth
        value={user.email}
        onChange={handleChangeUser}
      />

      <Box display="flex" justifyContent="flex-end" gap="18px">
        <Button color="error" variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          color="success"
          variant="contained"
          onClick={() => handleConfirm(user)}
        >
          Add user
        </Button>
      </Box>
    </Box>
  );
};
