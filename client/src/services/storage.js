const AUTH_STORAGE_KEY = "app-services-access-token";

function saveUser(username, accessToken) {
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      username,
      accessToken,
    })
  );
}

function deleteSavedUser() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

function getSavedUser() {
  return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));
}

export { saveUser, getSavedUser, deleteSavedUser };
