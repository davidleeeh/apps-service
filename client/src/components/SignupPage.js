import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { registerUser } from "../services/api";
import UserContext from "../UserContext";

export default function SignupPage({ setGlobalError, setGlobalSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [, handleAuthChange] = useContext(UserContext);

  function handleUsernameChange(event) {
    setUsername(event.target.value);
    usernameError !== null && setUsernameError(null);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    passwordError !== null && setPasswordError(null);
  }

  function handlePasswordConfirmChange(event) {
    setPasswordConfirm(event.target.value);
    passwordError !== null && setPasswordError(null);
  }

  async function handleSignup() {
    if (password !== passwordConfirm) {
      setPasswordError("Passwords do not match");
    } else {
      try {
        const result = await registerUser({
          username,
          password,
        });

        if (result.username && result.accessToken) {
          handleAuthChange(result, "/");
          setGlobalSuccess(`${username} has been successfully created!`);
          setGlobalError(null);
        } else {
          throw new Error("Missing access token from registration result");
        }
      } catch (err) {
        if (err.message === "400") {
          setUsernameError("User already exists");
          setGlobalError("User already exists");
        } else {
          setGlobalError(err.message);
        }
      }
    }

    setPassword("");
    setPasswordConfirm("");
  }

  return (
    <Container sx={{ textAlign: "center" }}>
      <Grid container spacing={8} sx={{ paddingTop: "5rem" }}>
        <Grid item xs={12}>
          <Typography variant="h4" component="div">
            Sign up for a new account
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Stack spacing={3}>
              <TextField
                required
                id="standard-required"
                label="Username"
                variant="standard"
                value={username}
                error={usernameError !== null}
                helperText={usernameError !== null ? usernameError : null}
                onChange={handleUsernameChange}
              />
              <TextField
                required
                id="standard-required"
                type="password"
                label="Password"
                variant="standard"
                value={password}
                onChange={handlePasswordChange}
              />
              <TextField
                required
                id="standard-required"
                type="password"
                label="Re-enter password"
                variant="standard"
                value={passwordConfirm}
                error={passwordError !== null}
                helperText={passwordError !== null ? passwordError : null}
                onChange={handlePasswordConfirmChange}
              />

              <Button variant="contained" onClick={handleSignup}>
                Sign up
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

SignupPage.propTypes = {
  setGlobalError: PropTypes.func,
  setGlobalSuccess: PropTypes.func,
};
