import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { useAppUser } from "../context/UserAppContext";

export const Header: React.FC = () => {
  const { appUser, toggleAdmin } = useAppUser();

  return (
    <AppBar position="static">
      <Toolbar className="header-toolbar">
        <div className="header-left">
          <Link component={RouterLink} color="inherit" to="/" variant="h6">
            <Typography>Main App</Typography>
          </Link>
          <Link component={RouterLink} color="inherit" to="/users" variant="h6">
            <Typography>Users</Typography>
          </Link>
        </div>

        <div className="header-right">
          <Typography component="div">
            {appUser.isAdmin
              ? `Hello, ${appUser.userName} (Admin)`
              : `Hello, ${appUser.userName}`}
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};
