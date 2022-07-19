import { useContext, useEffect, useState } from "react";

import { Container } from "@mui/system";
import { Navigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import BackIcon from "@mui/icons-material/ArrowBack";
import UserContext from "../UserContext";
import { allApps } from "../services/api";
import AppsTable from "./AppsTable";
import AppInfo from "./AppInfo";

export default function AppsPage() {
  const [authedUser, handleAuthChange] = useContext(UserContext);
  const [apps, setApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);

  const isSignedIn = authedUser && authedUser.accessToken;

  useEffect(() => {
    if (isSignedIn) {
      fetchApps();
    }
  }, []);

  async function fetchApps() {
    try {
      const result = await allApps(authedUser.accessToken);
      setApps(result);
    } catch (error) {
      console.error(error);
    }
  }

  console.log(apps);
  return (
    <Container>
      {!isSignedIn && (
        <Navigate to={"/login"} state={{ foo: "foo" }} replace={true} />
      )}
      {!selectedApp && (
        <Grid container spacing={8} sx={{ paddingTop: "5rem" }}>
          <Grid item xs={12}>
            <Typography variant="h4" component="div">
              Apps
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <AppsTable apps={apps} onAppSelected={setSelectedApp} />
          </Grid>
        </Grid>
      )}
      {selectedApp && (
        <Grid container spacing={8} sx={{ paddingTop: "5rem" }}>
          <Grid item xs={12}>
            <Typography variant="h4" component="div">
              Edit app {selectedApp.appname}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              endIcon={<BackIcon />}
              onClick={() => setSelectedApp(null)}
            >
              Back to apps table
            </Button>
          </Grid>
          <Grid item xs={12}>
            <AppInfo app={selectedApp} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
