<template>
  <div class="container">
    <div class="pageWrap">
      <div class="bookingInfo">
        <div class="h2"><p>예매정보</p></div>
        <div v-if="!pfLoading" class="bookingInfo__details">
          <div class="poster">
            <img :src="myChoice.mainPoster" :alt="myChoice.title" />
          </div>
          <div class="tags">
            <h3>{{ myChoice.title }}</h3>
            <p>공연날짜 : {{ selectedDate }}</p>
            <p>공연시간 : {{ myChoice.showTime }}</p>
            <p>공연장소 : {{ myChoice.concertHall }}</p>
            <h4>
              결제금액 :
              <span :style="{ fontSize: 22 + 'px', fontWeight: 800 }"
                >{{ myChoice.price }} 원</span
              >
            </h4>
          </div>
        </div>
      </div>
      <div class="payment">
        <div class="h2"><p>결제수단</p></div>
        <div class="payment__select">
          <h3>간편계좌이체</h3>
          <div v-if="!payLoading" class="payment__select__bank">
            <div
              v-for="bank in ableBankList"
              :key="bank.code"
              :ref="bank.id"
              class="bank-card"
              :class="{ noAccess: !bank.id }"
              @click.stop="accountID(bank.id)"
            >
              <h4>{{ bank.name }}</h4>
              <div v-if="bank.disabled" class="bank-detail">
                <p>{{ bank.accountNumber }}</p>
                <p>잔액: {{ bank.balance }} 원</p>
              </div>
            </div>
            <div class="bank-card new-bank" @click="toggleModal">
              <p><i class="fa-solid fa-plus"></i></p>
              신규계좌등록
            </div>
          </div>
          <div v-else>Loading...</div>
        </div>
        <div class="payment__button" @click="payPerformance">결제하기</div>
        <Modal :modal-active="modalActive" @close="toggleModal" />
      </div>
    </div>
  </div>
</template>

<script>
  import Modal from '../components/modal/Modal.vue';
  import ManagingAccount from '../components/modal/ManagingAccount.vue';
  import NewAccountRegistration from '../components/modal/NewAccountRegistration.vue';
  import { ref } from 'vue';

  export default {
    components: {
      Modal,
      ManagingAccount,
      NewAccountRegistration,
    },
    setup() {
      const modalActive = ref(false);

      const toggleModal = () => {
        modalActive.value = !modalActive.value;
      };

      return { modalActive, toggleModal };
    },
    data() {
      return {
        accountId: '',
      };
    },
    computed: {
      selectedDate() {
        // 상세정보에서 사용자가 선택한 날짜를 표시
        const res = this.$store.state.performance.selectedDate;
        if (!res) return '선택한 날짜가 없습니다';
        const year = res.getFullYear() + '년 ';
        const month = res.getMonth() + '월 ';
        const date = res.getDate() + '일 ';
        const daylist = ['월', '화', '수', '목', '금', '토', '일'];
        const day = daylist[res.getDay()] + '요일';
        const selected = year + month + date + day;
        return selected;
      },
      payLoading() {
        // 은행목록 불러오는 로딩
        return this.$store.state.payment.loading;
      },
      pfLoading() {
        // 공연 상세 정보 불러오는 로딩
        return this.$store.state.performance.isLoading;
      },
      myChoice() {
        // 사용자가 선택한 공연의 상세정보
        return this.$store.state.performance.detailData;
      },
      ableBankList() {
        // 모든 은행목록 & 등록 가능 여부 api에서 가져오는 정보와
        // 이미 등록되어있는 은행목록 api에서 가져오는 정보를 합쳐
        // 등록가능 여부를 확인하고 이미 등록되어 있다면 그 잔액까지 볼 수 있도록 정보를 합침
        const bankIndexes = {};
        const bankList = this.$store.state.payment.bankList;
        const mine = this.$store.state.payment.accountList.accounts;

        mine.forEach((item, idx) => {
          bankIndexes[item.bankCode] = idx;
        });

        const result = bankList.map((item) => {
          const account = mine && mine[bankIndexes[item.code]];

          if (!account) {
            return item;
          }

          return Object.assign(item, account);
        });

        return result;
      },
    },
    created() {
      this.$store.dispatch('payment/bankList');
      this.$store.dispatch('payment/accountList');
      this.$store.dispatch(
        'performance/searchShow',
        this.$route.params.reservationId,
      );
    },
    methods: {
      accountID(accountId) {
        // 선택한 은행 카드에 css 주기
        if (!this.accountId) {
          this.$refs[accountId][0].style.border = '1.5px solid #fe253f';
          this.accountId = accountId;
          return;
        }
        if (accountId === this.accountId) {
          const target = this.$refs[accountId];
          target[0].style.border = '1px solid #fff';
          this.accountId = '';
          return;
        }

        const target = this.$refs[this.accountId];
        target[0].style.border = '1px solid #fff';

        this.accountId = accountId;
        const newTarget = this.$refs[accountId];
        newTarget[0].style.border = '1.5px solid #fe253f';
      },
      async payPerformance() {
        await this.$store.dispatch('payment/buy', {
          productId: this.$route.params.reservationId,
          accountId: this.accountId,
        });
        alert('결제가 완료 되었습니다');
        this.$store.dispatch('payment/accountList');
        this.$router.push('/user/paidlist');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .container {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(27, 27, 31);
    .pageWrap {
      height: 800px;
      width: min(1200px, 80%);
      display: flex;
      position: relative;
      top: 25px;
      border-radius: 20px;
      background-color: #fff;
      overflow: hidden;
      .h2 {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        font-size: 20px;
        color: #fff;
        width: 100%;
        background-color: #141414;
      }
      .bookingInfo {
        width: 35%;
        height: 100%;
        border-right: 1px solid #fff;
        .bookingInfo__details {
          .poster {
            width: 60%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 30px;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow: hidden;
            img {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              background-color: #ddd;
            }
            ::after {
              content: “”;
              width: 100%;
              height: 1px;
              background-color: #aaa;
              position: absolute;
              bottom: 0;
            }
          }
          .tags {
            padding: 40px 30px;
            font-size: 16px;
            line-height: 30px;
            position: relative;
            top: 10px;
            h3 {
              font-size: 22px;
              font-weight: 700;
              margin-bottom: 20px;
            }
            h4 {
              font-weight: 500;
              color: #fe253f;
              margin-top: 20px;
            }
          }
        }
      }
      .payment {
        width: 65%;
        background-color: #eee;
        position: relative;
        overflow: hidden;
        .payment__select {
          width: 100%;
          height: 100%;
          background-color: #eee;
          padding-top: 40px;
          padding-bottom: 150px;
          // letter-spacing: 1.2px;
          overflow-y: scroll;
          &::-webkit-scrollbar {
            display: none;
          }
          h3 {
            text-indent: 40px;
            font-size: 15px;
            font-weight: 800;
            margin-bottom: 20px;
          }
          .payment__select__bank {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            padding: 0 20px;

            .bank-card {
              display: flex;
              justify-content: center;
              flex-direction: column;
              align-items: center;
              font-size: 16px;
              line-height: 30px;
              width: max(200px, 40%);
              min-height: 110px;
              background-color: #fff;
              border: 1px solid #fff;
              border-radius: 20px;
              margin: 10px;
              padding: 10px;
              cursor: pointer;
              transition: all 0.4s;
              p {
                color: #aaa;
                font-size: 14px;
              }
              &:last-child {
                font-size: 14px;
                color: #aaa;
                line-height: 30px;
                p {
                  font-size: 30px;
                }
              }
              &:hover {
                border: 1px solid #fe253f;
                p {
                  color: #fe253f;
                }
              }
              &.noAccess {
                background-color: #e5e5e5;
                border: 3px solid #dfdfdf;
                color: #aaa;
                cursor: not-allowed;
              }
            }
          }
        }
        .payment__button {
          width: 100%;
          height: 74px;
          background-color: #fe253f;
          box-sizing: border-box;
          color: #efefef;
          font-size: 20px;
          font-weight: 800;
          line-height: 74px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          position: absolute;
          bottom: 0;
          &:hover {
            font-size: 18px;
          }
        }
      }
    }
  }

  .selected {
    border: 1.5px solid #fe253f;
  }
</style>
