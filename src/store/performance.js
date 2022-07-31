import axios from 'axios';

const SEARCH_URL =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/search';
const headers = {
  'content-type': 'application/json',
  apikey: 'FcKdtJs202204',
  username: 'TeamTwo',
};

export default {
  namespaced: true,

  state: () => ({
    performances: [],
    poster: [
      {
        id: '1Cks7z2HwzS3MX4iSbvr',
        title: '원현정 피아노 독주회@2022.08.02@2022.08.02@1시간 40분',
        price: 20000,
        description:
          ' / /원현정@ @금호아트홀 연세 (금호아트홀 연세)@화요일(20:00)',
        tags: ['만 7세 이상', '클래식', 'N', '서울'],
        isSoldOut: false,
        thumbnail:
          'https://storage.googleapis.com/heropy-api/vAWT1mRUTtv161033.jpg',
        photo:
          'https://storage.googleapis.com/heropy-api/vGu3g56Kiov161034.jpg',
        reservations: [],
      },
      {
        id: '36nXXorX6YhDtU2T5fQC',
        title: '아버지와 살면 [안동]@2022.08.26@2022.08.27@1시간 10분',
        price: 20000,
        description:
          ' / /김귀선, 원소연@ @안동문화예술의전당 (백조홀)@금요일(19:30), 토요일(19:00)',
        tags: ['만 11세 이상', '연극', 'N', '경북'],
        isSoldOut: false,
        thumbnail:
          'https://storage.googleapis.com/heropy-api/vEqQMWYhquv173516.jpg',
        photo:
          'https://storage.googleapis.com/heropy-api/vxCWaAnJzAv173517.jpg',
        reservations: [],
      },
      {
        id: 'FUlKmAGc9dI7sL7DgKW9',
        title:
          '토요스테이지 Ⅳ, 슈트라우스 스트레스@2022.10.22@2022.10.22@2시간',
        price: 30000,
        description:
          ' / /최수열, 김성현, 김규연, 성재창 등@ @아트센터 인천 (콘서트홀)@토요일(15:00)',
        tags: ['만 7세 이상', '클래식', 'N', '인천'],
        isSoldOut: false,
        thumbnail:
          'https://storage.googleapis.com/heropy-api/vfQh2kHq-8v163802.gif',
        photo:
          'https://storage.googleapis.com/heropy-api/vCSONMlBR0Dv163802.jpg',
        reservations: [],
      },
      {
        id: 'KRoqS8oj8tp1dw8sEzlL',
        title:
          '제22회 대전국제음악제, 아메리칸 솔리스트 앙상블: 한국가곡의 밤@2022.08.20@2022.08.20@1시간 30분',
        price: 50000,
        description:
          ' /윤의중/윤의중, 박종해, 정경 등@[프로그램]\r\n\r\n \r\n\r\n오병희 / 새야 새야\r\n박주만 / 어기영차\r\n김광수 / 엄마야 누나야\r\n김광희 / 새노야\r\n변훈 / 명태\r\n조혜영 / 못잊어\r\n미상 / 사의찬미\r\n조혜영 / 무언으로 오는 봄\r\n퐁당퐁당 / 이호준\r\n쾌지나 칭칭나네 / 오병희\r\n경복궁타령 / 김희조\r\n아리랑 / 우효원@대전예술의전당 (아트홀)@토요일(17:00)',
        tags: ['만 7세 이상', '클래식', 'N', '강원'],
        isSoldOut: false,
        thumbnail:
          'https://storage.googleapis.com/heropy-api/vaA-LcGjXnv175431.jpg',
        photo:
          'https://storage.googleapis.com/heropy-api/v-q5iSM-Gov175432.jpg',
        reservations: [],
      },
      {
        id: 'OpFJacG4Ft79WP9eHFJA',
        title: '영남춤축제, 한국춤 안무가전@2022.08.10@2022.08.10@ ',
        price: 10000,
        description:
          ' / /강경희, 박성아 등@ @국립부산국악원 (예지당)@수요일(19:30)',
        tags: ['만 7세 이상', '무용', 'N', '부산'],
        isSoldOut: false,
        thumbnail:
          'https://storage.googleapis.com/heropy-api/vtw-xc2Oyav182551.jpg',
        photo:
          'https://storage.googleapis.com/heropy-api/vOsw6YF6azv182552.jpg',
        reservations: [],
      },
      {
        id: 'omNnKmd0l8dyTX70xApT',
        title: '아트프로젝트보라, 소무 [익산]@2022.08.20@2022.08.21@1시간',
        price: 20000,
        description:
          ' /김보라, 박상미, 최소영 등/ @ @익산예술의전당 (대공연장)@토요일(17:00), 일요일(15:00)',
        tags: ['만 5세 이상', '무용', 'N', '전북'],
        isSoldOut: false,
        thumbnail:
          'https://storage.googleapis.com/heropy-api/vgzwzDwzvWv162747.gif',
        photo:
          'https://storage.googleapis.com/heropy-api/vSkeAd9b8Sv162748.jpg',
        reservations: [],
      },
      {
        id: 'SAXE5r2dPQAgXGLj7BWq',
        title: '황예진 피아노 리사이틀@2022.08.05@2022.08.05@1시간',
        price: 20000,
        description:
          ' / /황예진@[Program]\r\n\r\n\r\nW.A.Mozart - 12 Variations in C Major, “Ah, vous dirai-je Maman”, K.265\r\n\r\n \r\n\r\nL.v.Beethoven - Piano Sonata no.14 in c-sharp minor, ‘Moonlight’, op.27/2\r\n\r\n \r\n\r\nS.Prokofiev - 4 Pieces, op.4\r\n\r\n\r\nIntermission\r\n\r\n\r\nJ.Brahms - Piano Sonata no.1 in C Major, op.1@금호아트홀 연세 (금호아트홀 연세)@금요일(20:00)',
        tags: ['전체 관람가', '클래식', 'N', '서울'],
        isSoldOut: false,
        thumbnail:
          'https://storage.googleapis.com/heropy-api/vJnvinB8Yev161035.jpg',
        photo:
          'https://storage.googleapis.com/heropy-api/vkQGoqwr6bv161036.jpg',
        reservations: [],
      },
      {
        id: 'oCxKY3NG1HDgs8926LTk',
        title: '알피 [세종]@2022.07.30@2022.07.31@1시간 5분',
        price: 30000,
        description:
          ' / / @ @세종예술의전당 (대공연장)@토요일 ~ 일요일(11:00,14:00,16:30)',
        tags: ['36개월 이상', '뮤지컬', 'N', '세종'],
        isSoldOut: false,
        thumbnail:
          'https://storage.googleapis.com/heropy-api/voLotGvLSkv161155.gif',
        photo:
          'https://storage.googleapis.com/heropy-api/v3hCfUvMofv161156.jpg',
        reservations: [],
      },
      {
        id: 'TQL3KbDe5PebAv6zYZTJ',
        title: '심청전을 짓다 [대전]@2022.09.24@2022.09.24@1시간 40분',
        price: 30000,
        description:
          ' /김정숙, 권호성, 박철영 등/정래석, 신문성, 고훈목, 박옥출, 김희경, 최상민, 이민준 등@ @대전시립연정국악원 (큰마당)@토요일(14:00,18:00)',
        tags: ['만 13세 이상', '연극', 'N', '강원'],
        isSoldOut: false,
        thumbnail:
          'https://storage.googleapis.com/heropy-api/vgGrkVJnDgwv175428.gif',
        photo:
          'https://storage.googleapis.com/heropy-api/vVymEb1iW8v175429.jpg',
        reservations: [],
      },
      {
        id: 'OmsiARNWQJzQySzrdT1A',
        title:
          '연출 故주호종 1주기 추모공연: 모돌전@2022.08.16@2022.08.17@1시간 50분',
        price: 70000,
        description:
          ' /김영봉, 한승석, 사성구 등/유태평양, 박애리, 김준수, 최호성, 이용전, 유수정, 김금미 등@ @국립극장 (달오름극장)@화요일 ~ 수요일(19:30)',
        tags: ['만 7세 이상', '연극', 'N', '서울'],
        isSoldOut: false,
        thumbnail:
          'https://storage.googleapis.com/heropy-api/v4E59BjWCfv161039.gif',
        photo:
          'https://storage.googleapis.com/heropy-api/vpbv9ocikvv161040.jpg',
        reservations: [],
      },
      {
        id: 'zUGlz0qWbqVpP20h2jxD',
        title: '알피 [포항]@2022.07.16@2022.07.17@1시간 5분',
        price: 30000,
        description:
          ' / / @ @포항문화예술회관 (대공연장)@토요일 ~ 일요일(11:00,14:00)',
        tags: ['만 4세 이상', '뮤지컬', 'N', '경북'],
        isSoldOut: false,
        thumbnail:
          'https://storage.googleapis.com/heropy-api/vyAwMIVLQev173526.jpg',
        photo:
          'https://storage.googleapis.com/heropy-api/v7vPhf6uoy0v173527.jpg',
        reservations: [],
      },
      {
        id: 'nClkegH9OjALgEKazWCS',
        title: '태양의 꽃@2022.04.22@2022.09.25@1시간 40분',
        price: 30000,
        description:
          '(재)정동극장/추정화, 허수현, 김병진 등/우다현, 장준환, 한성, 황인욱, 김유빈, 이동연, 박선우 등@ @경주세계문화엑스포 (문화센터공연장)@수요일 ~ 금요일(19:00), 토요일 ~ 일요일(19:00)',
        tags: ['만 5세 이상', '뮤지컬', 'N', '경북'],
        isSoldOut: false,
        thumbnail:
          'https://storage.googleapis.com/heropy-api/vdkCcNBDWzv173532.gif',
        photo:
          'https://storage.googleapis.com/heropy-api/vFiQQw9IGxv173533.jpg',
        reservations: [],
      },
      {
        id: 'jlxuGlfSRY5sP4FPEwLP',
        title: '여기, 한때, 가가@2022.07.20@2022.07.24@2시간',
        price: 30000,
        description:
          '프로젝트 레디메이드/강보름, 송은혜, 박한서 등/하지성, 한혜진, 백소정, 임지윤, 신강수@ @성북정보도서관 (천장산우화극장)@목요일 ~ 금요일(19:30), 토요일 ~ 일요일(15:00)',
        tags: ['만 7세 이상', '연극', 'N', '서울'],
        isSoldOut: false,
        thumbnail:
          'https://storage.googleapis.com/heropy-api/vfjenk7Rtov161037.gif',
        photo:
          'https://storage.googleapis.com/heropy-api/vy5XR-mA7Jv161038.jpg',
        reservations: [],
      },
      {
        id: 'ZUxJw6bUIiCfWbBkcwNL',
        title: '제19회 서울국제무용콩쿠르@2022.07.16@2022.07.17@1시간 30분',
        price: 50000,
        description:
          ' / / @ @마포아트센터 (아트홀맥)@토요일(16:00,20:00), 일요일(15:00)',
        tags: ['만 7세 이상', '무용', 'N', '서울'],
        isSoldOut: false,
        thumbnail:
          'https://storage.googleapis.com/heropy-api/vrd55QMQqCv161032.gif',
        photo:
          'https://storage.googleapis.com/heropy-api/vOEud9ahBSFv161033.jpg',
        reservations: [],
      },
      {
        id: 'WohRDDiQ22b98hK7CHPT',
        title: '김예원 귀국 플루트 독주회@2022.08.17@2022.08.17@1시간 20분',
        price: 20000,
        description:
          ' / /김예원, 문재원@ @예술의전당 (리사이틀홀)@수요일(19:30)',
        tags: ['만 7세 이상', '클래식', 'N', '서울'],
        isSoldOut: false,
        thumbnail:
          'https://storage.googleapis.com/heropy-api/vxMkw8vAuvv161037.jpg',
        photo:
          'https://storage.googleapis.com/heropy-api/vm0jUiE4Xsv161038.jpg',
        reservations: [],
      },
      {
        id: 'zHhFzNwYHHvbCn39y0L3',
        title:
          '경기예술인과 발레스타가 함께하는 발레 갈라 콘서트 [수원]@2022.07.28@2022.07.28@1시간 20분',
        price: 20000,
        description:
          ' /이고은/박예은, 하지석, 엄진솔, 윤서준, 윤별, 최유정, 이재우 등@ @경기아트센터(구. 경기도문화의전당) (대극장)@목요일(19:30)',
        tags: ['만 5세 이상', '무용', 'N', '경기'],
        isSoldOut: false,
        thumbnail:
          'https://storage.googleapis.com/heropy-api/vv5-kc4LWRv174739.gif',
        photo:
          'https://storage.googleapis.com/heropy-api/vXtTu86700v174740.jpg',
        reservations: [],
      },
      {
        id: 'qkP9s4J1BLZfzKZQeaW7',
        title: '첼로와 케찹 [세종]@2022.07.23@2022.07.24@1시간 15분',
        price: 20000,
        description:
          '휴먼스토리/이대권, 이지후, 송정하 등/조한나, 이대권@[작품 소개]\r\n\r\n\r\n사랑하다 헤어지면 무엇이 남을까? 시간의 흐름에 따라 남겨지는 것도 변하겠지만 헤어진 직후에는 뜨거웠던 사랑의 순간보다 더 치열한 격정의 시간을 홀로 견뎌내야 한다. 원망, 후회, 그리움, 미련, 감사 등의 복잡한 마음의 기억은 뜨거운 몸의 기억과 뒤섞여 많이 아프다.\r\n<첼로와 케찹>은 작가의 초기 작품으로 작가 자신의 20대 감성이 아픈 생살처럼 생생하게 묻어난다. 이 작품에서 작가는 헤어졌지만 정신적으로 아직 상당히 얽혀있는 두 남녀를 무대 공간의 독특한 사용을 통해 표현하고 있다. 첼리스트 남자와 은행원 여자는 첼로와 케찹과 같은 이질적인 조합으로 만나서 사랑을 하고 헤어졌다. 그저그런 사랑을 하고 헤어진 줄 알았는데, 남자는 남자의 공간에서 여자는 여자의 공간에서 자신들의 사랑을 반추하면서 끝내버린 그 사랑의 크기가 상당함을 알게 되어 각자 쩔쩔맨다. 사랑은 언제 완결되는 걸까?@세종 음악창작소 누리락 (공연장)@토요일 ~ 일요일(16:00)',
        tags: ['만 16세 이상', '연극', 'N', '세종'],
        isSoldOut: false,
        thumbnail:
          'https://storage.googleapis.com/heropy-api/vT1xn5W4ZNv161152.gif',
        photo:
          'https://storage.googleapis.com/heropy-api/v2yPc1AZrlv161152.jpg',
        reservations: [],
      },
      {
        id: 'owgUdo1BABZ2BWJMasmu',
        title:
          '국악하는 요즘 사람들: 트래덜반 [대구]@2022.07.27@2022.07.27@1시간 20분',
        price: 10000,
        description:
          ' / /이선민, 권가연, 박효주, 정규혁@ @대구문화예술회관 (비슬홀)@월요일(19:30)',
        tags: ['만 7세 이상', '국악', 'N', '대구'],
        isSoldOut: false,
        thumbnail:
          'https://storage.googleapis.com/heropy-api/vaOKfrvdSvv180820.jpg',
        photo:
          'https://storage.googleapis.com/heropy-api/v4w4BGZkWjv180821.jpg',
        reservations: [],
      },
      {
        id: 'nPalb18hlddlwbYIGgaZ',
        title: 'ACC 수요극장, 보물섬@2022.07.20@2022.07.20@1시간 55분',
        price: 3000,
        description:
          ' /이대웅 등/ @[줄거리]\r\n\r\n가족과 함께 여인숙을 운영하며 살고 있는 소년 짐 호킨스. 어느 날 늙은 선장이 여인숙으로 찾아오지만 얼마 후 선장은 의문의 죽음으로 숨을 거둔다. 짐은 그의 남겨진 옷가방에서 한 장의 보물지도를 발견한다. 짐은 의사 리브지와 지주 트렐로니와 함께 원정대를 모집하였고, 스몰렛 선장과 요리사 존 실버가 함께한 26명의 원정대가 보물섬을 향한 모험을 떠난다. 먹을 것이 넘치는 풍요로운 항해가 계속되던 중, 짐은 보물을 차지하기 위한 존 실버 일당의 모의를 우연히 엿듣게 되는데...@국립아시아문화전당 (극장3)@수요일(19:00)',
        tags: ['만 7세 이상', '연극', 'N', '광주'],
        isSoldOut: false,
        thumbnail:
          'https://storage.googleapis.com/heropy-api/vRpfChuN8kv173948.jpg',
        photo:
          'https://storage.googleapis.com/heropy-api/vc7kMtxEXfuv173948.jpg',
        reservations: [],
      },
      {
        id: 'nqQguH33CQfDjgUzxcZh',
        title: '사랑의 묘약 [성남]@2022.08.05@2022.08.06@2시간',
        price: 70000,
        description:
          ' /신선섭, 이회수, 신재희 등/김신혜, 손가슬, 서필, 이재식, 박정민, 김종표, 전태현 등@ @성남아트센터 (오페라하우스)@금요일(19:30), 토요일(15:00)',
        tags: ['만 8세 이상', '오페라', 'N', '경기'],
        isSoldOut: false,
        thumbnail:
          'https://storage.googleapis.com/heropy-api/vZ3f1P_HqG3v174732.gif',
        photo:
          'https://storage.googleapis.com/heropy-api/vwIQIiT5AXv174733.jpg',
        reservations: [],
      },
      {
        id: 'mSmhFOPLpl1zfQY6JZIc',
        title: '트로스트 바순 앙상블 연주회@2022.08.28@2022.08.28@1시간',
        price: 20000,
        description:
          ' / /이은호, 최윤경, 백승훈, 어지은, 이재환@ @대구콘서트하우스 (챔버홀(소공연장))@일요일(17:00)',
        tags: ['전체 관람가', '클래식', 'N', '대구'],
        isSoldOut: false,
        thumbnail:
          'https://storage.googleapis.com/heropy-api/vDMHtQnx_qv180819.jpg',
        photo:
          'https://storage.googleapis.com/heropy-api/vPwxo_Y5Wqv180820.jpg',
        reservations: [],
      },
      {
        id: 'mLBC8PolRHQlSiDfOdIQ',
        title: '클랑포룸 빈 [통영]@2022.08.28@2022.08.28@ ',
        price: 80000,
        description:
          ' / /카롤린 멜처, 클랑포룸 빈, 에밀리오 포마리코 등@ @통영국제음악당 (콘서트홀)@일요일(15:00)',
        tags: ['만 7세 이상', '클래식', 'N', '경남'],
        isSoldOut: false,
        thumbnail:
          'https://storage.googleapis.com/heropy-api/vRdwayqkIQv172859.jpg',
        photo:
          'https://storage.googleapis.com/heropy-api/vRpSrijAlZ9v172900.jpg',
        reservations: [],
      },
    ],
    isSearched: false,
    isLoading: false,
    detailData: {},
    showDetail: {},
    selectedDate: '',
    price: 0,
  }),
  mutations: {
    searchList(state, payload) {
      if (!payload) return;
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
      state.isSearched = true;
      state.isLoading = false;
    },
    resetList(state) {
      state.performances = [];
      state.isSearched = false;
    },
    poster(state, payload) {
      payload.forEach((el) => {
        state.poster.push(el);
      });
    },
    setState(state, payload) {
      for (const key in payload) {
        state[key] = payload[key];
      }
      state.isLoading = false;
    },
    selectDate(state, payload) {
      state.selectedDate = payload;
    },
  },

  actions: {
    async searchList({ state, commit }, payload) {
      // 검색 목록 불러오기
      state.isLoading = true;

      try {
        const { data: performances } = await axios({
          url: SEARCH_URL,
          method: 'POST',
          headers,
          data: payload,
        });
        commit('searchList', {
          performances,
        });
      } catch (err) {
        console.log(err);
      }
    },

    async poster({ commit }) {
      // 메인 포스터 슬라이드에 담길 포스터들
      try {
        const res = await axios({
          url: SEARCH_URL,
          method: 'POST',
          headers,
          data: {},
        });
        commit('poster', res.data);
      } catch (err) {
        console.log(err);
      }
    },
    async searchShow({ state, commit }, performancesId) {
      // 상품 상세 페이지
      try {
        state.isLoading = true;
        const { data } = await axios({
          url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${performancesId}`,
          method: 'GET',
          headers,
        });

        const data1 = data.title.split(/\/|@/);
        const description = data.description.split(/\/|@/);
        const showDetail = [...data1, ...description];

        commit('setState', { showDetail });

        const detailData = {
          title: showDetail[0],
          startDate: showDetail[1],
          price: data.price,
          endDate: showDetail[2],
          runtime: showDetail[3],
          producer: showDetail[4],
          crew: showDetail[5],
          cast: showDetail[6],
          story: showDetail[7],
          concertHall: showDetail[8],
          showTime: showDetail[9],
          poster: data.photo,
          mainPoster: data.thumbnail,
        };
        commit('setState', { detailData });
        const price = data.price;
        commit('setState', { price });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
