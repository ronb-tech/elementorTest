import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

export const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar className="header-toolbar">
        <div className="header-left">
          <Link component={RouterLink} color="inherit" to="/" variant="h6">
            Main App
          </Link>
          <Link component={RouterLink} color="inherit" to="/users" variant="h6">
            Users
          </Link>
        </div>

        <div className="header-right">
          <Typography variant="h6" component="div">
            Hello, Admin
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};
