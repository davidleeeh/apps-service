import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signinUser } from "../services/api";
import UserContext from "../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authedUser, handleAuthChange] = useContext(UserContext);

  const navigate = useNavigate();

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSignin() {
    try {
      const result = await signinUser({
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

  function renderSigninForm() {
    return (
      <Grid container spacing={8} sx={{ paddingTop: "5rem" }}>
        <Grid item xs={12}>
          <Typography variant="h4" component="div">
            Sign in to your account
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

              <Button variant="contained" onClick={handleSignin}>
                Sign in
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    );
  }

  function renderSignedInMessage() {
    return (
      <Grid container spacing={8} sx={{ paddingTop: "5rem" }}>
        <Grid item xs={12}>
          <Typography variant="h4" component="div">
            You are already logged in
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="body1" component="div">
            To log into a different account, please log out first.
          </Typography>
        </Grid>
      </Grid>
    );
  }

  const isSignedIn = authedUser && authedUser.accessToken;

  return (
    <Container>
      {!isSignedIn && renderSigninForm()}
      {isSignedIn && renderSignedInMessage()}
    </Container>
  );
}
