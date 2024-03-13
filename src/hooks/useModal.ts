import { useState } from "react";

export const useModal = () => {
  const [isOpen, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return { isOpen, handleOpenModal, handleCloseModal };
};
