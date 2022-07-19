import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import UserContext from "../UserContext";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [authedUser, handleAuthChange] = useContext(UserContext);

  const navigate = useNavigate();

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handlePasswordConfirmChange(event) {
    setPasswordConfirm(event.target.value);
  }

  async function handleSignup() {
    console.log(
      `Username: ${username}, password: ${password}, passwordConfirm: ${passwordConfirm}`
    );

    if (password !== passwordConfirm) {
      return console.error("Password do not match");
    }

    try {
      const result = await registerUser({
        username,
        password,
      });

      if (result.username && result.accessToken) {
        handleAuthChange(result);

        navigate("/");
      } else {
        throw new Error("Missing access token from registration result");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container>
      <Grid container spacing={8} sx={{ paddingTop: "2rem" }}>
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
