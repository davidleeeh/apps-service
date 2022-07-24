import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";

import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";

import { Add as AddIcon, ArrowBack as BackIcon } from "@mui/icons-material";
import { allApps, createApp, updateApp } from "../services/api";
import UserContext from "../UserContext";
import AppsTable from "./AppsTable";
import CreateAppView from "./CreateAppView";
import EditAppView from "./EditAppView";

export default function AppsPage({ setGlobalSuccess, setGlobalError }) {
  const [authedUser, handleAuthChange] = useContext(UserContext);
  const [apps, setApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [isCreateMode, setIsCreateMode] = useState(false);

  useEffect(() => {
    fetchApps();
  }, [authedUser]);

  async function fetchApps() {
    try {
      const result = await allApps(authedUser ? authedUser.accessToken : null);
      setApps(result);
    } catch (error) {
      if (error.message === "401" || error.message === "403") {
        handleAuthChange(null);
      }
      setGlobalError(error.message);
    }
  }

  function handleAppSelected(app) {
    setSelectedApp(app);
  }

  async function handleAppCreate(newAppInfo) {
    try {
      const result = await createApp(newAppInfo, authedUser.accessToken);
      if (result !== null) {
        setApps([result].concat(apps));
        setIsCreateMode(false);
        setGlobalSuccess(
          `${newAppInfo.appname} has been successfully created!`
        );
      } else {
        throw new Error(
          "Created app information was missing in server response."
        );
      }
    } catch (error) {
      setGlobalError(error.message);
    }
  }

  async function handleAppUpdate(updatedAppInfo) {
    try {
      const result = await updateApp(
        updatedAppInfo.id,
        {
          appname: updatedAppInfo.appname,
          description: updatedAppInfo.description,
        },
        authedUser.accessToken
      );

      // Update the local copy of the app
      if (result.updatedApp != null) {
        setApps(
          [result.updatedApp].concat(
            apps.filter((app) => app.id !== result.updatedApp.id)
          )
        );
        setSelectedApp(null);
        setGlobalSuccess(
          `${updatedAppInfo.appname} has been successfully updated!`
        );
      } else {
        throw new Error(
          "Updated app information was missing in server response."
        );
      }
    } catch (error) {
      if (error.message === "404") {
        setGlobalError(`App with ID ${updatedAppInfo.id} does not exist.`);
      } else {
        setGlobalError(error.message);
      }
    }
  }

  function renderAppsView() {
    const appsContents =
      apps.length > 0 ? (
        <AppsTable apps={apps} onAppSelected={handleAppSelected} />
      ) : (
        <Typography variant="h5">
          There is no app yet. Go ahead and create one.
        </Typography>
      );
    return (
      <Grid container spacing={8} sx={{ paddingTop: "5rem" }}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="h4" component="div">
              Apps
            </Typography>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setIsCreateMode(true);
              }}
            >
              New App
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {appsContents}
        </Grid>
      </Grid>
    );
  }

  function renderCreateAppView() {
    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{ my: 3, mx: 2 }}>
          <Grid container alignItems={"center"} columnSpacing={1}>
            <Grid item>
              <IconButton
                aria-label="back"
                onClick={() => setIsCreateMode(false)}
              >
                <BackIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h5" component="div">
                Create a new app
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider />
        <CreateAppView
          onCreate={handleAppCreate}
          onCancel={() => setIsCreateMode(false)}
        />
      </Box>
    );
  }

  function renderEditAppView() {
    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{ my: 3, mx: 2 }}>
          <Grid container alignItems={"center"} columnSpacing={1}>
            <Grid item>
              <IconButton
                aria-label="back"
                onClick={() => setSelectedApp(null)}
              >
                <BackIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h5" component="div">
                {selectedApp.appname}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider />
        <EditAppView
          app={selectedApp}
          onUpdate={handleAppUpdate}
          onCancel={() => setSelectedApp(null)}
        />
      </Box>
    );
  }

  let contents = null;
  if (isCreateMode === true) {
    contents = renderCreateAppView();
  } else if (selectedApp !== null) {
    contents = renderEditAppView();
  } else {
    contents = renderAppsView();
  }

  return <Container>{contents}</Container>;
}

AppsPage.propTypes = {
  setGlobalSuccess: PropTypes.func,
  setGlobalError: PropTypes.func,
};
