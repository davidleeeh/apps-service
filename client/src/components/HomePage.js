import { useContext } from "react";

import { Container } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

export default function HomePage() {
  const [authedUser, handleAuthChange] = useContext(UserContext);

  const isSignedIn = authedUser && authedUser.accessToken;

  return (
    <Container>
      <Grid container spacing={8} sx={{ paddingTop: "5rem" }}>
        <Grid item xs={12}>
          <Typography variant="h4" component="div">
            Welcome to Apps Service
          </Typography>
        </Grid>
        {!isSignedIn && (
          <Grid item xs={12}>
            <Typography variant="body1" component="p">
              To start using this service, <Link to={"/login"}>log in</Link> to
              your account.
            </Typography>
            <Typography variant="body1" component="p">
              Or, <Link to={"/signup"}>sign up </Link> for a new account.
            </Typography>
          </Grid>
        )}

        {isSignedIn && (
          <Grid item xs={12}>
            Hello {authedUser.username}!
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
