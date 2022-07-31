<template>
  <div class="box">
    <swiper
      :direction="'vertical'"
      :pagination="{
        clickable: true,
      }"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :modules="modules"
      class="swiper-container"
    >
      <swiper-slide v-if="details.title">
        <p class="Kategorie">공연 제목</p>
        <p class="detail">
          {{ details.title }}
        </p>
      </swiper-slide>
      <swiper-slide v-if="details.startDate">
        <p class="Kategorie">공연 시작일</p>
        <p class="detail">
          {{ details.startDate }}
        </p>
      </swiper-slide>
      <swiper-slide v-if="details.endDate">
        <p class="Kategorie">공연 종료일</p>
        <p class="detail">
          {{ details.endDate }}
        </p>
      </swiper-slide>
      <swiper-slide v-if="details.runtime">
        <p class="Kategorie">런타임</p>
        <p class="detail">
          {{ details.runtime }}
        </p>
      </swiper-slide>
      <swiper-slide v-if="details.producer">
        <p class="Kategorie">제작사</p>
        <p class="detail">
          {{ details.producer }}
        </p>
      </swiper-slide>
      <swiper-slide v-if="details.crew">
        <p class="Kategorie">제작진</p>
        <p class="detail">
          {{ details.crew }}
        </p>
      </swiper-slide>
      <swiper-slide v-if="details.cast">
        <p class="Kategorie">공연진</p>
        <p class="detail">
          {{ details.cast }}
        </p>
      </swiper-slide>
      <swiper-slide v-if="details.story">
        <p class="Kategorie">줄거리</p>
        <p class="detail">
          {{ details.story }}
        </p>
      </swiper-slide>
      <swiper-slide v-if="details.concertHall">
        <p class="Kategorie">공연장</p>
        <p class="detail">
          {{ details.concertHall }}
        </p>
      </swiper-slide>
      <swiper-slide v-if="details.showTime">
        <p class="Kategorie">공연 시간</p>
        <p class="detail">
          {{ details.showTime }}
        </p>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
  // Import Swiper styles
  import 'swiper/css/bundle';
  // import required modules
  import { Autoplay } from 'swiper';

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [Autoplay],
      };
    },
    computed: {
      details() {
        const details = this.$store.state.performance.detailData;
        Object.entries(details).forEach(([k, v]) => {
          if (!String(v).trim()) {
            // 상세 정보에  제작사, 출연진 등의 정보가 없어  " "로 정보가 전달 된 경우
            // 빈칸을 제외했을 때 falsy한 값이면 그 key값을 Object에서 아예 삭제함
            delete details[k];
          }
        });
        return details;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .swiper-container {
    width: 30vw;
    height: 200px;
    .swiper-slide {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .Kategorie {
        font-size: 1rem;
      }
      .detail {
        font-size: 1.3rem;
        font-weight: 500;
        margin: 1rem;
      }
    }
  }
</style>
