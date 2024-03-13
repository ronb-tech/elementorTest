import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar className="header-toolbar">
        <Typography variant="h6" component="div">
          Header
        </Typography>
        <Typography variant="h6" component="div">
          Hello Admin
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
