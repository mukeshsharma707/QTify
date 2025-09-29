// Navbar.jsx

import React from "react";
import { Box, Button, InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Navbar() {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        backgroundColor: "#1DB954", // Spotify green look
      }}
    >
      {/* ✅ Your original Qtify logo remains unchanged */}
      <Box>
        <img src="/images/logo.png" alt="Logo" />
      </Box>

      {/* ✅ Search Bar styled like screenshot */}
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: 400,
          borderRadius: "10px",
          border: "1px solid black",
          boxShadow: "none",
          backgroundColor: "white",
        }}
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search a album of your choice"
          inputProps={{ "aria-label": "search album" }}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      {/* ✅ Feedback Button remains same */}
      <Box>
        <Button
  variant="contained"
  sx={{
    backgroundColor: 'black',
    color: 'green',
    textTransform: 'none',
    fontFamily: '"Poppins", sans-serif',  // <-- ensure this
    '&:hover': {
      cursor: 'pointer',
    },
    borderRadius: '4px',
  }}
>
  Give Feedback
</Button>

      </Box>
    </Box>
  );
}

export default Navbar;
