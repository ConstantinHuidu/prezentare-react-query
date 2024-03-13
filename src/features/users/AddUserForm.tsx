import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { User } from "./hooks/useGetUsers";

type Props = {
  user?: User;
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
  const { user = defaultUser, handleClose, handleConfirm } = props;
  const [currentUser, setCurrentUser] = useState(user);

  const handleChangeUser = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <Box component="form" display="flex" flexDirection="column" gap="24px">
      <TextField
        name="firstName"
        label="First Name"
        fullWidth
        value={currentUser.firstName}
        onChange={handleChangeUser}
      />
      <TextField
        name="lastName"
        label="Last Name"
        fullWidth
        value={currentUser.lastName}
        onChange={handleChangeUser}
      />
      <TextField
        name="email"
        label="Email"
        fullWidth
        value={currentUser.email}
        onChange={handleChangeUser}
      />

      <Box display="flex" justifyContent="flex-end" gap="18px">
        <Button color="error" variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          color="success"
          variant="contained"
          onClick={() => handleConfirm(currentUser)}
        >
          {user.firstName === "" ? "Add user" : "Update info"}
        </Button>
      </Box>
    </Box>
  );
};
