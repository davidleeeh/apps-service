import { useContext } from "react";

import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

export default function HomePage() {
  const [authedUser] = useContext(UserContext);

  const isSignedIn = authedUser && authedUser.accessToken;

  return (
    <Container sx={{ textAlign: "center" }}>
      <Grid container spacing={8} sx={{ paddingTop: "5rem" }}>
        <Grid item xs={12}>
          <Typography variant="h4" component="div">
            Welcome {isSignedIn ? authedUser.username : ""}
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
      </Grid>
    </Container>
  );
}
