import React, { useState } from "react";
import PropTypes from "prop-types";

import { Button, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function EditAppView({ app, onUpdate, onCancel }) {
  const [appInfo, setAppInfo] = useState({
    ...app,
  });

  function handleAppInfoChange(changes) {
    setAppInfo({
      ...appInfo,
      ...changes,
    });
  }

  const { id, appname, description } = appInfo;

  const canUpdate =
    appname && (appname !== app.appname || description !== app.description);

  return (
    <Box>
      <Typography sx={{ my: 2 }}>Edit app information</Typography>

      <Box
        component="form"
        sx={{
          marginTop: "2rem",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "left",
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={3}>
          <Box>
            <TextField
              id="id"
              label="ID"
              variant="outlined"
              value={id}
              disabled
            />
          </Box>
          <Box>
            <TextField
              required
              id="appname"
              label="Appname"
              variant="outlined"
              value={appname}
              onChange={(event) =>
                handleAppInfoChange({ appname: event.target.value })
              }
            />
          </Box>
          <Box>
            <TextField
              id="desc"
              label="Description"
              variant="outlined"
              value={description}
              multiline
              sx={{ minWidth: "500px" }}
              onChange={(event) =>
                handleAppInfoChange({ description: event.target.value })
              }
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Button
              variant="text"
              onClick={() => onCancel()}
              sx={{ width: "125px" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => onUpdate(appInfo)}
              sx={{ width: "125px" }}
              disabled={!canUpdate}
            >
              Update
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

EditAppView.propTypes = {
  app: PropTypes.object,
  onUpdate: PropTypes.func,
  onCancel: PropTypes.func,
};
