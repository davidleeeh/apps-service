import React, { useContext, useEffect, useState } from "react";

import { Box, Container } from "@mui/system";
import { Navigate } from "react-router-dom";
import {
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Form from "react-jsonschema-form";

import UserContext from "../UserContext";
import { allApps } from "../services/api";
import AppsTable from "./AppsTable";

// const schema = {
//   title: "App",
//   type: "object",
//   required: ["appname"],
//   properties: {
//     appname: { type: "string", title: "App name", default: "" },
//     info: { type: "string", title: "Additional info", default: "" },
//   },
// };

export default function AppInfo(props) {
  const [authedUser, handleAuthChange] = useContext(UserContext);

  function handleAppnameChange(name) {
    console.log(name);
  }

  function handleDescriptionChange(desc) {
    console.log(desc);
  }

  function handleFormError(arg) {
    console.log(arg);
  }

  function handleSubmit() {
    console.log(app);
  }

  const { app } = props;
  const isSignedIn = authedUser && authedUser.accessToken;

  console.log(app);
  return (
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
          variant="outlined"
          value={app.appname}
          onChange={handleAppnameChange}
        />
        <TextField
          id="standard-required"
          label="Description"
          variant="outlined"
          value={app.description}
          multiline
          onChange={handleDescriptionChange}
        />

        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
