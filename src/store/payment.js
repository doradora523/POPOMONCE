import axios from 'axios';

const headers = {
  'content-type': 'application/json',
  apikey: 'FcKdtJs202204',
  username: 'TeamTwo',
};
const CANCEL_URL =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/cancel';
const BANK_ACCESS =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account';
const TRADEDALL_URL =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/details';
const TRADEDDETAIL_URL =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/detail';

export default {
  namespaced: true,
  state: () => {
    return {
      bankList: [],
      accountList: {
        accounts: [],
      },
      paidInfo: [],
      loading: false,
    };
  },
  mutations: {
    bankList(state, payload) {
      state.bankList = payload;
    },
    accountList(state, payload) {
      state.accountList = payload;
    },
    paymentAll(state, payload) {
      state.paidInfo = payload;
      state.loading = false;
    },
    connectAccount(state, payload) {
      const newAccounts = [...state.accountList.accounts, payload];

      state.accountList.accounts = newAccounts;
    },
  },
  actions: {
    async bankList({ commit }) {
      // 전체 은행목록 및 등록 가능 여부
      const accessToken = window.sessionStorage.getItem('token');
      const { data } = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account/banks',
        method: 'GET',
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      commit('bankList', data);
    },
    async accountList({ state, commit }) {
      // 이미 연결된 은행 목록 및 잔액
      const accessToken = window.sessionStorage.getItem('token');
      state.loading = true;
      try {
        const { data } = await axios({
          url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account',
          method: 'GET',
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
        });
        commit('accountList', data);
      } catch (error) {
        console.log(error);
      } finally {
        state.loading = false;
      }
    },
    async connectAccount({ commit }, data) {
      // 신규 계좌 연결
      const accessToken = window.sessionStorage.getItem('token');
      const res = await axios({
        url: BANK_ACCESS,
        method: 'POST',
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        },
        data,
      });
      commit('connectAccount', res.data);
    },
    async disconnect(context, accountId) {
      // 기존 계좌 해지
      try {
        const accessToken = window.sessionStorage.getItem('token');
        await axios({
          url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account',
          method: 'DELETE',
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            accountId,
            signature: true,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    async buy(context, data) {
      // 물품 구매
      const accessToken = window.sessionStorage.getItem('token');
      try {
        await axios({
          url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/buy',
          method: 'POST',
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
          data,
        });
        console.log('paid!');
      } catch (error) {
        console.log(error);
      }
    },
    async paymentAll({ state, commit }) {
      // 구매한 물품 전체 조회(고객)
      try {
        state.loading = true;
        const accessToken = window.sessionStorage.getItem('token');
        const { data } = await axios({
          url: TRADEDALL_URL,
          method: 'GET',
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(data);
        commit('paymentAll', data);
      } catch (error) {
        console.log(error);
      }
    },
    async paymentDetail({ state, commit }, data) {
      // 구매한 물품 상세정보 조회
      try {
        state.loading = true;
        const accessToken = window.sessionStorage.getItem('token');
        const { data } = await axios({
          url: TRADEDDETAIL_URL,
          method: 'POST',
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
          data,
        });
        console.log(data);
        commit('paymentAll', data);
      } catch (error) {
        console.log(error);
      }
    },
    async cancelPayment(context, data) {
      // 구매 취소(고객)
      try {
        const accessToken = window.sessionStorage.getItem('token');
        await axios({
          url: CANCEL_URL,
          method: 'GET',
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
          data,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
