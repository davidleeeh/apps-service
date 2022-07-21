import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import { useState } from "react";
import AppsPage from "./components/AppsPage";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import NavBar from "./components/NavBar";
import SignupPage from "./components/SignupPage";
import UserContext from "./UserContext";

import { Alert, Snackbar } from "@mui/material";
import { deleteSavedUser, getSavedUser, saveUser } from "./services/storage";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [authedUser, setAuthedUser] = useState(getSavedUser());
  const [globalError, setGlobalError] = useState(null);
  const [globalSuccess, setGlobalSuccess] = useState(null);

  const navigate = useNavigate();

  function handleAuthChange(data, nextPage = "/") {
    if (data === null) {
      deleteSavedUser();
      setAuthedUser(null);
      return navigate("/login");
    }

    const { username, accessToken } = data;
    if (username && accessToken) {
      saveUser(username, accessToken);
      setAuthedUser({ username, accessToken });
    }

    navigate(nextPage);
  }

  return (
    <UserContext.Provider value={[authedUser, handleAuthChange]}>
      <div className="App">
        <NavBar />

        {globalError && (
          <Alert
            severity="error"
            onClose={() => {
              setGlobalError(null);
            }}
          >
            {globalError}
          </Alert>
        )}

        <Snackbar
          open={globalSuccess !== null}
          autoHideDuration={5000}
          onClose={() => {
            setGlobalSuccess(null);
          }}
        >
          <Alert
            onClose={() => {
              setGlobalSuccess(null);
            }}
            severity="success"
            sx={{ width: "100%" }}
          >
            {globalSuccess}
          </Alert>
        </Snackbar>

        <Routes>
          <Route
            path="/apps"
            element={
              <AppsPage
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setGlobalError={setGlobalError}
                setGlobalSuccess={setGlobalSuccess}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <SignupPage
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setGlobalError={setGlobalError}
                setGlobalSuccess={setGlobalSuccess}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setGlobalError={setGlobalError}
                setGlobalSuccess={setGlobalSuccess}
              />
            }
          />
          <Route
            index
            path="/"
            element={
              <HomePage isLoading={isLoading} setIsLoading={setIsLoading} />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
