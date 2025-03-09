import { checkResponse } from "./utils/utils.js";

export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-33",
  headers: {
    authorization: "cc20abdb-a7b4-4c57-8885-5293c31e6f88",
    "Content-Type": "application/json",
  },
};

export function request(endpoint, options) {
  return fetch(`${config.baseUrl}${endpoint}`, {
    ...options,
    headers: config.headers,
  }).then(checkResponse);
};

export function deleteCardFromServer(cardId) {
  return request(`/cards/${cardId}`, {
    method: "DELETE",
  });
};

export function addNewCard(name, link) {
  return request("/cards", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
};

export function updateAvatar(avatarUrl) {
  return request("/users/me/avatar", {
    method: "PATCH",
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  });
};

export function updateUserInfo(name, about) {
  return request("/users/me", {
    method: "PATCH",
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
};

export const getInitialCards = () => {
  return request("/cards", {
    method: "GET",
  });
};

export const getUserInfo = () => {
  return request("/users/me", {
    method: "GET",
  });
};
