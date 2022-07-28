<template>
  <swiper
    :direction="'vertical'"
    :pagination="{
      clickable: true,
    }"
    :slides-per-view="1"
    :space-between="0"
    :mousewheel="true"
    :modules="modules"
    :speed="600"
    :scrollbar="true"
  >
    <swiper-slide>
      <div :class="`section_1`" class="section">
        <div class="main">
          <div class="main_wrap">
            <div class="main__img">
              <div class="img"></div>
            </div>
            <div class="main__textBox">
              <div class="main__text">
                <div class="text__1">
                  <p>
                    나만의
                    <br />
                    맞춤
                    <br />
                    문화생활
                  </p>
                </div>
                <div class="text__2">
                  <p>
                    다양한 필터를 통해
                    <br />
                    원하는 조건의 공연을 만나보세요
                  </p>
                </div>
              </div>
            </div>
            <CircleAnimation />
          </div>
        </div>
        <div class="scroll_guide">
          <div class="mention">Scroll or Slide down</div>
          <div class="bar__background">
            <div class="bar__slide"></div>
          </div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div :class="`section_2`" class="section">
        <div class="main">
          <div class="main_wrap">
            <div class="main__textBox">
              <div class="main__text">
                <div class="text__1">
                  <p>
                    함께
                    <br />
                    <span>또는</span>
                    <br />
                    혼자
                  </p>
                </div>
                <div class="text__2">
                  <p>
                    평소 보고 싶었던 공연을
                    <br />
                    손쉽게 즐겨보세요
                  </p>
                </div>
                <CircleAnimation />
              </div>
            </div>
            <div class="main__img">
              <div class="img"></div>
            </div>
          </div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div :class="`section_3`" class="section">
        <div class="main">
          <div class="main_wrap">
            <div class="main__img">
              <div class="img"></div>
            </div>
            <div class="main__textBox">
              <div class="main__text">
                <div class="text__1">
                  <p>
                    정보와
                    <br />
                    <span>예매를</span>
                    <br />
                    한번에!
                  </p>
                </div>
                <div class="text__2">
                  <p>
                    한 곳에서 편리하게
                    <br />
                    궁금했던 공연의 정보를 찾고
                    <br />
                    빠르게 예매하세요
                  </p>
                </div>
              </div>
            </div>
            <CircleAnimation />
          </div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div :class="`section_4`" class="section">
        <div class="main">
          <div class="main_wrap">
            <div class="main__textBox">
              <div class="main__text">
                <div class="text__1">
                  <p>
                    ABOUT
                    <br />
                    OUR
                    <br />
                    TEAM
                  </p>
                </div>
                <div class="text__2">
                  <span>MEMBER</span>
                  <p>
                    <br />
                    <a href="https://github.com/whilini">김휘린</a>
                    <br />
                    <a href="https://github.com/doradora523">조수경</a>
                    <br />
                    <a href="https://github.com/k-m-jin">김명진</a>
                    <br />
                    <a href="https://github.com/gyeol2678">정한결</a>
                  </p>
                </div>
              </div>
            </div>
            <div class="main__img">
              <div class="img"></div>
            </div>
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/pagination';
  // Import required modules
  import { Mousewheel, Pagination } from 'swiper';
  // CircleAnimation
  import CircleAnimation from '~/components/CircleAnimation.vue';

  export default {
    components: {
      Swiper,
      SwiperSlide,
      CircleAnimation,
    },
    setup() {
      return {
        modules: [Mousewheel, Pagination],
      };
    },
    data() {
      return {};
    },
  };
</script>

<style lang="scss">
  $bar-slide: 30px;
  @-webkit-keyframes slide {
    0% {
      bottom: 100px;
    }
    100% {
      bottom: -$bar-slide;
    }
  }
  @keyframes slide {
    0% {
      bottom: 100px;
    }
    100% {
      bottom: -$bar-slide;
    }
  }

  .swiper {
    width: 100vw;
    height: 100vh;
  }

  // .swiper-slide-active {
  //   .section {
  //     .main {
  //       .main_wrap {
  //         .main__img {
  //           transform: translate3d(0, 0, 0);
  //         }
  //       }
  //     }
  //   }
  // }

  .swiper-slide {
    position: relative;
    .section {
      height: 100vh;
      width: 100vw;
      .main {
        width: 100%;
        height: 100%;
        .main_wrap {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: translate 1s;
          .main__img {
            width: 50%;
            height: 100%;
            // position: absolute;
            // right: 0;
            // transform: translate3d(0, 100%, 0);

            .img {
              width: 100%;
              height: 100%;
              background-size: cover;
            }
          }
          .main__textBox {
            a {
              text-decoration: none;
              color: #fff;
              &:hover {
                cursor: pointer;
                text-shadow: 1px 1px 2px #eee;
              }
            }
            width: 50%;
            height: 100%;
            // position: absolute;
            // left: 0;

            .main__text {
              height: 82%;
              padding: 15%;
              font-family: 'Noto Serif KR', serif;
              .text__1 {
                font-size: 3.75vw;
                font-weight: 500;
                letter-spacing: 0.5vw;
                line-height: 135%;
                margin-bottom: 20px;
                span {
                  margin-left: 70px;
                }
              }
              .text__2 {
                font-size: 1.3vw;
                font-weight: 500;
                letter-spacing: 0.35vw;
                line-height: 2.5rem;
                position: relative;
                top: 150px;
                &::before {
                  content: '';
                  width: 2px;
                  height: 40px;
                  margin: 10px 0 20px 20px;
                  position: absolute;
                  top: -100px;
                  background-color: rgb(145, 145, 145);
                }
              }
            }
          }
        }
      }
    }
    .section_1 {
      background-color: #797a53;
      .main {
        .main_wrap {
          .main__img {
            .img {
              background-image: url(https://images.pexels.com/photos/63328/wells-theatre-norfolk-virginian-seats-63328.jpeg?auto=compress&cs=tinysrgb&w=1600);
            }
          }
          .main__textBox {
            .main__text {
              .text__1 {
                color: #fff;
                text-shadow: 1px 1px 2px #555;
              }
              .text__2 {
                color: #ddd;
              }
            }
          }
        }
      }
      .scroll_guide {
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        .mention {
          font-size: 20px;
          color: #fff;
          margin-bottom: 25px;
          font-weight: 700;
        }
        .bar__background {
          width: 5px;
          height: 70px;
          border-radius: 2.5px 2.5px 0 0;
          background-color: #c7c7c7c0;
          display: block;
          justify-content: center;
          position: relative;
          left: 49.5%;
          overflow: hidden;
          .bar__slide {
            width: 5px;
            height: $bar-slide;
            border-radius: 2.5px;
            background-color: rgba(255, 255, 255, 0.427);
            display: block;
            position: absolute;
            z-index: 3;
            animation: slide 1.2s infinite linear;
          }
        }
      }
    }
    .section_2 {
      background-color: #f8e8c1;
      .main {
        .main_wrap {
          .main__img {
            .img {
              background-image: url(https://images.pexels.com/photos/6877441/pexels-photo-6877441.jpeg?auto=compress&cs=tinysrgb&w=1600);
            }
          }
          .main__text {
            .text__1 {
              color: #efbc3c;
              text-shadow: 1px 1px 2px #999;
            }
            .text__2 {
              color: #444;
            }
          }
        }
      }
    }
    .section_3 {
      background-color: #7e4f34;
      .main {
        .main_wrap {
          .main__img {
            .img {
              background-image: url(https://concerthouse.daegu.go.kr/icms/file/getImage.do?atchFileId=FILE_000000000042767uUDZhgVQ&fileSn=0);
            }
          }
          .main__text {
            .text__1 {
              color: #eee;
              text-shadow: 1px 1px 2px #333;
            }
            .text__2 {
              color: #ddd;
            }
          }
        }
      }
    }
    .section_4 {
      background-color: #161616;
      .main {
        .main_wrap {
          .main__img {
            .img {
              background-color: #3d6151;
            }
          }
          .main__text {
            .text__1 {
              color: #fff;
            }
            .text__2 {
              color: #ddd;
              text-shadow: 1px 1px 2px #333;
              p {
                font-size: 1.1vw;
              }
            }
          }
        }
      }
    }
  }
  .swiper-pagination-vertical.swiper-pagination-bullets,
  .swiper-vertical > .swiper-pagination-bullets {
    right: 20px;
  }
  .swiper-pagination {
    width: 1px;
    height: 110px;
    background-color: rgba(255, 255, 255, 0.2);
    position: absolute;

    .swiper-pagination-bullet {
      width: 3px;
      height: 20px;
      border-radius: 0%;
      opacity: 0;
      transition: all 0.5s;
      position: relative;
      right: 1px;
      &.swiper-pagination-bullet-active {
        opacity: 1;
        background-color: #fff;
      }
    }
  }
</style>
