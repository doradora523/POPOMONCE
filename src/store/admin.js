import axios from 'axios';

const PRODUCT_URL =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products';
const TRADED_URL =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions';

const headers = {
  'content-type': 'application/json',
  apikey: 'FcKdtJs202204',
  username: 'TeamTwo',
  masterKey: true,
};

export default {
  namespaced: true,
  state: () => {
    return {
      allProducts: [],
      willEdit: {},
      loading: false,
      tradedProduct: [],
    };
  },
  mutations: {
    showProducts(state, payload) {
      state.allProducts = payload;
      state.loading = false;
    },
    showDetail(state, payload) {
      state.willEdit = payload;
      state.loading = false;
    },
    tradedProduct(state, payload) {
      state.tradedProduct = payload;
      state.loading = false;
    },
  },
  actions: {
    async showProducts({ state, commit }) {
      state.loading = true;
      const { data } = await axios({
        url: PRODUCT_URL,
        method: 'GET',
        headers,
      });
      commit('showProducts', data);
    },
    async showDetail({ state, commit }, productId) {
      state.loading = true;
      const { data } = await axios({
        url: PRODUCT_URL + `/${productId}`,
        method: 'GET',
        headers,
      });
      commit('showDetail', data);
    },
    async addProduct(context, data) {
      await axios({
        url: PRODUCT_URL,
        method: 'POST',
        headers,
        data,
      });
    },
    async editProduct({ state, dispatch }, payload) {
      const { productId, data } = payload;
      state.loading = true;
      await axios({
        url: PRODUCT_URL + '/' + productId,
        method: 'PUT',
        headers,
        data,
      });
      dispatch('showProducts');
      state.loading = false;
    },
    async DeleteProduct({ dispatch }, productId) {
      await axios({
        url: PRODUCT_URL + '/' + productId,
        method: 'DELETE',
        headers,
      });
      dispatch('showProducts');
    },
    async tradedProduct({ state, commit }) {
      state.loading = true;
      const res = await axios({
        url: TRADED_URL + '/all',
        method: 'GET',
        headers,
      });
      commit('tradedProduct', res.data);
    },
    cancelTrade(context, payload) {
      const detailId = payload[0].id;
      const data = payload[1];
      axios({
        url: TRADED_URL + `/${detailId}`,
        method: 'PUT',
        headers,
        data,
      });
    },
  },
};
