const API_ROOT = "http://localhost:8080";

async function registerUser(data) {
  return await postData(`${API_ROOT}/auth/signup`, data);
}

async function signinUser(data) {
  return await postData(`${API_ROOT}/auth/signin`, data);
}

async function checkAuth(accessToken) {
  return await getData(`${API_ROOT}/auth`, accessToken);
}

async function allApps(accessToken) {
  return await getData(`${API_ROOT}/apps`, accessToken);
}

async function fetchApp(appId, accessToken) {
  return await getData(`${API_ROOT}/apps/${appId}`, accessToken);
}

async function getData(url, accessToken = null) {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Connection: "keep-alive",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json();
}

async function postData(url, data, accessToken = null) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Connection: "keep-alive",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json();
}

async function PutData(url, data, accessToken = null) {
  const response = await fetch(url, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Connection: "keep-alive",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json();
}

export { registerUser, signinUser, checkAuth, allApps, fetchApp };
