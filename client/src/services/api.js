import apiConfigs from "../config/api.config.js";

const API_ROOT = apiConfigs.url;

async function registerUser(data) {
  return await postData(`${API_ROOT}/auth/signup`, data);
}

async function signinUser(data) {
  return await postData(`${API_ROOT}/auth/signin`, data);
}

async function allApps(accessToken) {
  return await getData(`${API_ROOT}/apps`, accessToken);
}

async function fetchApp(appId, accessToken) {
  return await getData(`${API_ROOT}/apps/${appId}`, accessToken);
}

async function createApp(data, accessToken) {
  return await postData(`${API_ROOT}/apps`, data, accessToken);
}

async function updateApp(appId, data, accessToken) {
  return await putData(`${API_ROOT}/apps/${appId}`, data, accessToken);
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

async function putData(url, data, accessToken = null) {
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

export { registerUser, signinUser, allApps, fetchApp, createApp, updateApp };
