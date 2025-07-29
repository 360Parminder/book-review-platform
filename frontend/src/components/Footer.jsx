// src/components/Footer.js
import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        bgcolor: "#fafbfc",
        borderTop: "1px solid #ECEEF1",
        textAlign: "center",
        mt: "auto"
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} Book Review Platform
      </Typography>
    </Box>
  );
}
