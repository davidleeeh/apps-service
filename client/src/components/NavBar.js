import HomeIcon from "@mui/icons-material/Home";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../UserContext";

export default function NavBar() {
  const [authedUser, handleAuthChange] = useContext(UserContext);
  const navigate = useNavigate();

  const isSignedIn = authedUser && authedUser.accessToken;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            <HomeIcon />
          </IconButton>

          {isSignedIn && (
            <Button color="inherit" onClick={() => navigate("/apps")}>
              Apps
            </Button>
          )}

          <Box sx={{ flexGrow: 1 }}></Box>

          <Button color="inherit" onClick={() => navigate("/signup")}>
            Sign up
          </Button>

          {!isSignedIn && (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Log in
            </Button>
          )}

          {isSignedIn && (
            <Button
              color="inherit"
              onClick={() => {
                handleAuthChange(null);
              }}
            >
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
