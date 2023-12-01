import React from "react";
import { Modal, Box, Button } from "@mui/material";
import "./ModalCustomStyles.css";

const style = {
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalDialog = ({ open, onClose, children }) => {
  return (
    <Modal open={open} onClose={onClose} ariaHideApp={false}>
      <Box sx={style} className="custom-modal">
        {children}
        <Button variant="text" color="primary" fullWidth onClick={onClose} />
      </Box>
    </Modal>
  );
};

export default ModalDialog;
