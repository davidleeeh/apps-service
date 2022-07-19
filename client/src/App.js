import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import { useEffect, useState } from "react";
import AppsPage from "./components/AppsPage";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import NavBar from "./components/NavBar";
import SignupPage from "./components/SignupPage";
import UserContext from "./UserContext";

import { checkAuth } from "./services/api";
import {
  getAuthedUser,
  saveAuthedUser,
  deleteAuthedUser,
} from "./services/storage";

function App() {
  const [authedUser, setAuthedUser] = useState(null);

  function handleAuthChange(data) {
    if (data === null) {
      deleteAuthedUser();
      setAuthedUser(null);
      return;
    }

    const { username, accessToken } = data;
    if (username && accessToken) {
      saveAuthedUser(username, accessToken);
      setAuthedUser({ username, accessToken });
    }
  }

  useEffect(() => {
    (async () => {
      let user = getAuthedUser();

      console.log("authed user");
      console.log(user);

      try {
        if (user && user.accessToken) {
          await checkAuth(user.accessToken);
        }
      } catch (error) {
        user = null;
      } finally {
        setAuthedUser(user);
      }
    })();
  }, []);

  console.log(authedUser);

  return (
    <UserContext.Provider value={[authedUser, handleAuthChange]}>
      <div className="App">
        <NavBar />

        <Routes>
          <Route path="/apps" element={<AppsPage />} />
          {/* <Route path="/apps/:appId" element={<AppInf />} /> */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route index path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
