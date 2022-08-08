import Cookies from "js-cookie";

const TokenKey = "ksd_user_token"; //token
const id = "ksd_user_id"; //id
const userName = "loginName"; //name
const TokenTime = "liked_current_token_time"; //登录时时间戳

//存储登录token
export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
export function setTokenTime() {
  return Cookies.set(TokenTime, Date.now());
}
export function getTokenTime() {
  return Cookies.get(TokenTime);
}

//存储用户id
export function setUserId(token) {
  return Cookies.set(id, token);
}
export function getUserId() {
  return Cookies.get(id);
}

// 存储用户name
export function setUserName(token) {
  return Cookies.set(userName, token);
}
export function getUserName() {
  return Cookies.get(userName);
}
