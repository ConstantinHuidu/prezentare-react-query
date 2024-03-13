import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

type Props = {
  title: string;
  isOpen: boolean;
  modalBody: ReactNode;
  handleClose: () => void;
};

export const CustomModal = (props: Props) => {
  const { title, modalBody, isOpen, handleClose } = props;

  return (
    <div>
      <Modal open={isOpen} onClose={handleClose}>
        <Box sx={style} display="flex" flexDirection="column" gap="30px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          {modalBody}
        </Box>
      </Modal>
    </div>
  );
};
