import axios from 'axios';
import store from '~/store';

const SIGNUP_POINT =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup';
const LOGIN_POINT =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login';
const LOGOUT_POINT =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout';
const EDITUSER_POINT =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/user';
const TRADEDALL_URL =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/details';
const CANCEL_URL =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/cancel';

const headers = {
  'content-type': 'application/json',
  apikey: 'FcKdtJs202204',
  username: 'TeamTwo',
};

export default {
  namespaced: true,

  state: () => {
    return {
      email: '',
      displayName: '',
      profileImg: '',
      signUp: false,
      isLogin: false,
      loading: false,
      defaultProfile:
        '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',
    };
  },
  mutations: {
    signUp(state) {
      state.signUp = true;
    },
    login(state, payload) {
      window.sessionStorage.setItem('token', payload.accessToken);
      Object.keys(payload.user).forEach((key) => {
        state[key] = payload.user[key];
      });
      state.isLogin = true;
    },
    logout(state) {
      // 로그아웃 시, 화면에 보이는 사용자 정보 모두 초기화 및 token 삭제
      state.isLogin = false;
      store.state.isAdmin = false;
      state.email = '';
      state.displayName = '';
      state.profileImg = '';
      window.sessionStorage.removeItem('token');
      console.log('log out');
    },
    editUser(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
  },
  actions: {
    async signUp(context, payload) {
      // 신규 회원가입
      try {
        await axios({
          url: SIGNUP_POINT,
          method: 'POST',
          headers,
          data: payload,
        });
        // commit('signUp');
      } catch (err) {
        console.log(err);
      }
    },
    async login({ commit }, payload) {
      // 로그인
      try {
        const { data } = await axios({
          url: LOGIN_POINT,
          method: 'POST',
          headers,
          data: payload,
        });
        commit('login', data);
      } catch (err) {
        console.log(err);
      }
    },
    async logout({ commit }) {
      // 로그아웃
      try {
        const accessToken = window.sessionStorage.getItem('token');
        await axios({
          url: LOGOUT_POINT,
          method: 'POST',
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
        });
        commit('logout');
      } catch (err) {
        console.log(err);
      }
    },
    async editUserInfo({ commit }, payload) {
      // 사용자 정보 편집
      try {
        const accessToken = window.sessionStorage.getItem('token');
        const { data } = await axios({
          url: EDITUSER_POINT,
          method: 'PUT',
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
          data: payload,
        });
        commit('editUser', data);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
