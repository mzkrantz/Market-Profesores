import React from "react";
import { Modal, Box, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalDialog = ({ open, onClose, children }) => {
  return (
    <Modal open={open} onClose={onClose} ariaHideApp={false}>
      <Box sx={style}>
        {children}
        <Button variant="text" color="primary" fullWidth onClick={onClose} />
      </Box>
    </Modal>
  );
};

export default ModalDialog;
