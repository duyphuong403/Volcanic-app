import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import React from "react";

export interface NotificationBarDataType {
  isOpen: boolean;
  content?: string;
  type?: "error" | "info" | "success" | "warning";
  setPopup: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      content?: string;
      type?: "error" | "info" | "success" | "warning" | undefined;
    }>
  >;
}

export interface NotificationBarProps extends NotificationBarDataType {}

const NotificationBar: React.FC<NotificationBarProps> = (props) => {
  const { content, setPopup, isOpen, type } = props;

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={() => setPopup({ isOpen: false })} anchorOrigin={{ horizontal: "right", vertical: "top" }}>
      <Alert onClose={() => setPopup({ isOpen: false })} severity={type} sx={{ width: "100%" }}>
        {content}
      </Alert>
    </Snackbar>
  );
};

export default NotificationBar;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
