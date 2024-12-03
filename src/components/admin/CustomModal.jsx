import React from "react";
import { Modal, Box, Typography, Stack, TextField, Button } from "@mui/material";

const CustomModal = ({
  open,
  onClose,
  title,
  description,
  onSubmit,
  comentario,
  setComentario,
}) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Comentario"
              variant="outlined"
              fullWidth
              autoFocus
              required
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
            <Button type="submit" variant="contained" color="error">
              Rechazar
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default CustomModal;
