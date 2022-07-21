import React, { useState } from "react";
import PropTypes from "prop-types";

import { Button, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

const defaultAppInfo = {
  appname: "",
  description: "",
};

export default function CreateAppView({ onCreate, onCancel }) {
  const [appInfo, setAppInfo] = useState(defaultAppInfo);

  function handleAppInfoChange(changes) {
    setAppInfo({
      ...appInfo,
      ...changes,
    });
  }

  const { appname, description } = appInfo;

  const isUpdated =
    appname !== defaultAppInfo.appname ||
    description !== defaultAppInfo.description;

  return (
    <Box>
      <Typography sx={{ my: 2 }}>Create new app</Typography>

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
              onClick={() => onCreate(appInfo)}
              sx={{ width: "125px" }}
              disabled={!isUpdated}
            >
              Confirm
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

CreateAppView.propTypes = {
  onCreate: PropTypes.func,
  onCancel: PropTypes.func,
};
