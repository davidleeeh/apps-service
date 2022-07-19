import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

import UserContext from "../UserContext";
import { deleteAuthedUser } from "../services/storage";

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

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Apps Service
          </Typography>

          <Button color="inherit" onClick={() => navigate("/signup")}>
            Signup
          </Button>

          {!isSignedIn && (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
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
