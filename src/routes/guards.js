import router from './index';
import axios from 'axios';
import store from '~/store';

const CHECK_POINT =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me';
const headers = {
  'content-type': 'application/json',
  apikey: 'FcKdtJs202204',
  username: 'TeamTwo',
};

// 새로고침이나 창이 이동해도 로그인 상태 유지
router.beforeEach(async () => {
  const accessToken = window.sessionStorage.getItem('token');
  if (!accessToken) return;
  try {
    const { data } = await axios({
      url: CHECK_POINT,
      method: 'POST',
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    Object.keys(data).forEach((key) => {
      store.state.user[key] = data[key];
    });
    store.state.user.isLogin = true;

    // 이메일이 매니저 이메일 일때 관리자 페이지 권한으로 로그인
    if (data.email === 'manager22@management.admin') {
      store.state.isAdmin = true;
    }
  } catch (err) {
    console.log(err);
  }
});
