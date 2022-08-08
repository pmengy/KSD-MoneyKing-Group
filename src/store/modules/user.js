import { login, getUserInfo } from "@/api/user";
import { Message } from "element-ui";
import router from "@/router";
import { setTokenTime, setUserId, setUserName, setToken } from "@/utils/auth";

export default {
  namespaced: true,
  state: {
    token: {},
    userInfo: {},
    loginForm:{}   //登录时的信息包括账号密码验证码.验证码token
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
    // 定义方法修改loginForm
    setLoginForm(state,payload){
      state.loginForm = payload
    }
  },
  actions: {
    async getToken({ commit }, payload) {
      const res = await login(payload);
      if (res.data.success) {
        commit("setToken", res.data);
        router.push("/");
        Message.success(res.data.msg);
        setTokenTime();
        // 存入username  ==>cookies
        setUserName(res.data.userName);
        // 存入id  ==>cookies
        setUserId(res.data.userId);
        // 存入yoken  ===>cookies
        setToken(res.data.token);
      } else {
        Message.error(res.data.msg);
      }
    },
    async getUserInfo({ commit }, payload) {
      const res = await getUserInfo(payload);
      commit("setUserInfo", res.data);
    },
    logout({ commit }) {
      commit("setToken", {});
      commit("setUserInfo", {});
    },
    // 定义好actions，准备让外界触发该方法并接受传值
    getLoginForm(context, payload){
      context.commit('setLoginForm',payload)
    }
  },
};
