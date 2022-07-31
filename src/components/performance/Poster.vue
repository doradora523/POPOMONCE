<template>
  <div class="container">
    <swiper
      :loop="true"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :modules="modules"
      :slides-per-view="1"
      class="mySwiper"
    >
      <swiper-slide
        v-for="(poster, idx) in posters"
        :key="poster"
        class="posterBox"
      >
        <img :src="poster.thumbnail" class="image" />
        <div class="posterCard">
          <h3>{{ poster.tags[1] }}</h3>
          <h2>{{ poster.title.split('@')[0] }}</h2>
          <p>{{ dateList[idx] }}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

  // import required modules
  import { Pagination, Autoplay } from 'swiper';

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [Pagination, Autoplay],
      };
    },
    computed: {
      posters() {
        return this.$store.state.performance.poster;
      },
      dateList() {
        const posters = this.$store.state.performance.poster;
        const start = posters.map((poster) => {
          const date = poster.title
            .split('@')[1]
            .split('.')
            .map((d) => Number(d));
          const year = date[0] + '년  ';
          const month = date[1] + '월  ';
          const day = date[2] + '일';
          const res = year + month + day;
          return res;
        });

        const end = posters.map((poster) => {
          const date = poster.title
            .split('@')[2]
            .split('.')
            .map((d) => Number(d));
          const year = date[0] + '년  ';
          const month = date[1] + '월  ';
          const day = date[2] + '일';
          const res = year + month + day;
          return res;
        });

        const dateList = [];
        for (let i = 0; i < posters.length; i += 1) {
          // 시작 날짜와 끝나는 날짜가 같을 때(공연이 하루만 할 때)는 시작날짜만 보이도록 함
          const pfDate =
            start[i] === end[i] ? start[i] : start[i] + ' - ' + end[i];
          dateList.push(pfDate);
        }

        return dateList;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .container {
    .swiper {
      position: absolute;
      width: 100%;
      height: 100%;
      margin-top: 60px;
      box-shadow: 3px 0px 10px rgba(192, 192, 192, 0.5);
      .swiper-wrapper {
        .swiper-slide {
          width: 100%;
          height: 100%;
          .image {
            width: 100%;
            position: absolute;
            top: 0;
            background-size: contain;
          }
          .posterCard {
            width: 100%;
            height: 25%;
            background-color: #fff;
            position: absolute;
            bottom: 40px;
            left: 0;
            padding: 20px 40px;
            color: #000;
            box-sizing: border-box;
            h3 {
              font-size: 15px;
              font-weight: 400;
              color: rgb(220, 18, 18);
              margin-top: 20px;
              margin-bottom: 20px;
            }
            h2 {
              font-size: 25px;
              font-weight: 500;
              margin-bottom: 30px;
            }
            p {
              font-size: 15px;
            }
          }
        }
      }
    }
  }
</style>
