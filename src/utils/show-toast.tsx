import { ReactNode } from "react";
import { CheckCircle, Info, Message, Warning } from "@mui/icons-material";
import { toast, ToastOptions } from "react-toastify";
import { Box } from "@mui/material";

const getToastIcon = (type: "success" | "info" | "error") => {
  switch (type) {
    case "error":
      return <Warning sx={{ color: "red" }} />;
    case "info":
      return (
        <Message
          sx={{
            color: "blue",
          }}
        />
      );
    case "success":
      return (
        <CheckCircle
          sx={{
            color: "green",
          }}
        />
      );

    default:
      return (
        <Info
          sx={{
            color: "blue",
          }}
        />
      );
  }
};

export function showToast(
  type: "success" | "info" | "error",
  content: ReactNode,
  options?: ToastOptions
): void {
  const toastOptions = { hideProgressBar: true, ...options };

  toast(
    <Box display="flex" gap="12px">
      <Box>{getToastIcon(type)}</Box>
      <Box>{content}</Box>
    </Box>,
    {
      ...toastOptions,
    }
  );
}
