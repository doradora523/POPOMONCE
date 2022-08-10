<template>
  <div class="container">
    <h2>공연 구매 내역</h2>
    <div class="ticket_listbox">
      <ul class="ticket_list">
        <li v-for="payment in payments" :key="payment.id" class="ticket_info">
          <div class="ticket_title_wrap">
            <h4 class="performance_date">
              {{ payment.product.title.split('@')[1] }}
            </h4>
            <div class="circle_big">
              <div class="circle_sm"></div>
            </div>
            <div class="title_wrap">
              <h3 class="title">
                공연명: {{ payment.product.title.split('@')[0] }}
              </h3>
            </div>
          </div>
          <div class="ticket_card">
            <div class="info_area">
              <div class="thumbnail">
                <img :src="payment.product.thumbnail" alt="poster" />
              </div>
              <div class="info">
                <p>
                  공연일시 :
                  <span>{{ payment.product.title.split('@')[1] }}</span>
                </p>
                <p>
                  공연시간 :
                  <span>{{ payment.product.title.split('@')[3] }}</span>
                </p>
                <p>
                  공연장 :
                  <span> {{ payment.product.description.split('@')[2] }}</span>
                </p>
                <div class="paid_toggle" @click="openPaid(payment.detailId)">
                  결제내역
                </div>
              </div>

              <transition
                v-show="payment.account && paidOpen"
                name="openFade"
                class="paid"
              >
                <div class="paid_info">
                  <p>
                    결제일시 :
                    <span>{{
                      payment.timePaid.split('.')[0].replace('T', ' ')
                    }}</span>
                  </p>
                  <div class="paid_check">
                    <p>
                      결제취소 여부 :
                      <span>{{ payment.isCanceled ? 'O' : 'X' }}</span>
                    </p>
                    <p>
                      결제완료 :
                      <span>{{
                        payment.done ? '결제 완료' : '결제 미완료'
                      }}</span>
                    </p>
                  </div>
                  <p>
                    총 결제 금액 : <span>{{ payment.product.price }}</span>
                  </p>
                  <div class="paid_bank">
                    <p>결제 정보</p>

                    <span v-if="payment && payment.account">
                      <span>{{
                        payment.account && payment.account.bankName
                      }}</span>
                      <span>{{
                        payment.account && payment.account.accountNumber
                      }}</span>
                    </span>
                  </div>
                  <div class="btn">
                    <el-button
                      round
                      type="info"
                      @click="cancelPD(payment.detailId)"
                      >결제 취소 및 환불</el-button
                    >
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        paidOpen: false,
      };
    },
    computed: {
      payments() {
        return this.$store.state.payment.paidInfo;
      },
    },
    watch: {
      payments: {
        handler() {
          return this.payments;
        },
        deep: true,
        immediate: true,
      },
    },
    created() {
      this.$store.dispatch('payment/paymentAll');
    },
    methods: {
      async openPaid(detailId) {
        // 상세보기를 눌렀을 때, 상세 정보를 불러오기
        this.paidOpen = !this.paidOpen;
        const accessToken = window.sessionStorage.getItem('token');
        const headers = {
          'content-type': 'application/json',
          apikey: 'FcKdtJs202204',
          username: 'TeamTwo',
        };
        const res = await axios({
          url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/detail',
          method: 'POST',
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            detailId,
          },
        });

        const newPayments = this.payments
          .filter((paid) => paid.detailId === res.data.detailId)
          .map((paid) => {
            paid.account = res.data.account;
            return paid;
          });

        this.payments = [...newPayments];
      },
      async cancelPD(detailId) {
        const res = confirm(
          '결제를 취소하시겠습니까? \n (환불은 은행영업일 기준 2~3일 소요됩니다.)',
        );
        if (!res) return;
        await this.$store.dispatch('payment/cancelPayment', { detailId });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .container {
    margin-top: 120px;
    width: 100%;
    position: relative;
    text-align: center;
    background-color: rgb(27, 27, 31);
    padding-bottom: 50px;
    font-size: 14px;
    line-height: 30px;
    letter-spacing: 0.5px;
    h2 {
      color: #eee;
      font-size: 24px;
      padding-bottom: 2rem;
    }
    .ticket_listbox {
      border-radius: 30px;
      width: 70%;
      height: 100%;
      background-color: rgba(239, 239, 239, 0.964);
      overflow: hidden;
      margin: 50px auto;
      padding-top: 50px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      .ticket_list {
        width: 80%;
        margin: 10px auto;
        .ticket_info {
          width: 100%;
          position: relative;
          padding: 50px 0;
          &::before {
            content: '';
            height: 100%;
            border-left: 1px dashed #999;
            position: absolute;
            left: 15%;
          }
          .ticket_title_wrap {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            .performance_date {
              font-weight: 600;
              width: 15%;
              display: flex;
              align-items: center;
              position: relative;
            }
            .circle_big {
              position: relative;
              top: 2px;
              right: 2.5%;
              width: 20px;
              height: 20px;
              background-color: #e5294b;
              border-radius: 50%;
              .circle_sm {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 7px;
                height: 7px;
                background-color: rgb(255, 255, 255);
                border-radius: 50%;
              }
            }
            .title_wrap {
              width: 80%;
              display: flex;
              align-items: center;

              .title {
                font-size: 22px;
                font-weight: 600;
                text-align: left;
                margin-right: 20px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                flex-grow: 1;
              }

              .reservation_info {
                font-size: 14px;
                font-weight: 500;
                color: #222;
                flex-shrink: 0;
              }
            }
          }
          .ticket_card {
            border-radius: 10px;
            padding: 20px 0;
            width: 80%;
            position: relative;
            right: -20%;
            background-color: rgba(243, 243, 243, 0.85);
            color: #111;
            .info_area {
              display: flex;
              align-items: center;
              .thumbnail {
                border: 1px solid #000;
                border-radius: 10px;
                overflow: hidden;
                width: 150px;
                height: 200px;
                margin-left: 20px;
                img {
                  width: inherit;
                }
              }
              .info {
                display: flex;
                flex-direction: column;
                text-align: start;
                margin-left: 4%;
                .paid_toggle {
                  background-color: rgb(18, 18, 19);
                  color: #fff;
                  text-align: center;
                  margin-top: 20px;
                  font-size: 12px;
                  letter-spacing: 2px;
                  border: 1px solid rgb(18, 18, 19);
                  border-radius: 20px;
                  transition: all 0.3s;
                  cursor: pointer;
                  &:hover {
                    background-color: transparent;
                    color: rgb(18, 18, 19);
                    font-weight: 700;
                  }
                  width: 100px;
                }
              }
              .paid {
                position: relative;
                left: 50px;
                text-align: start;
                font-size: 14px;
                line-height: 25px;
                .paid_info {
                  margin-left: 50px;
                  margin-right: 20px;
                  .paid_check {
                    display: flex;
                    span {
                      margin-right: 10px;
                    }
                  }
                  .paid_bank {
                    display: flex;
                    flex-direction: column;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .btn {
    margin-top: 15px;
  }

  // paid transition
  .openFade-enter-active {
    animation: fade-in 0.7s ease-out forwards;
    transition: opacity 0.7s;
  }
  .openFade-leave-active {
    animation: fade-out 0.8s ease-out forwards;
    transition: opacity 0.5s;
    opacity: 0;
  }

  @keyframes fade-in {
    from {
      transform: translateX(-50px);
    }
    to {
      transform: translateX(0px);
    }
  }

  @keyframes fade-out {
    from {
      transform: translateX(0px);
    }
    to {
      transform: translateX(50px);
    }
  }
</style>
