const AUTH_STORAGE_KEY = "app-services-access-token";

function saveAuthedUser(username, accessToken) {
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      username,
      accessToken,
    })
  );
}

function deleteAuthedUser() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

function getAuthedUser() {
  return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));
}

export { saveAuthedUser, getAuthedUser, deleteAuthedUser };
