<template>
  <div class="card-container">
    <el-scrollbar max-height="1000px">
      <div
        v-for="traded in tradedList"
        :key="traded.detailId"
        class="saled-card"
      >
        <div class="saled__poster">
          <img
            :src="traded.product.thumbnail"
            :alt="traded.product.thumbnail"
          />
        </div>
        <div class="saled__description">
          <div class="saled__title">
            <p>{{ traded.user.displayName }}</p>
            &nbsp;님 거래 정보
          </div>
          <div class="saled__product">
            <span @click="goPfDetail(traded.product.productId)">{{
              traded.product.title.split('@')[0]
            }}</span>
            <p>
              공연 기간:
              {{
                traded.product.title.split('@')[1] ===
                traded.product.title.split('@')[2]
                  ? traded.product.title.split('@')[1]
                  : traded.product.title.split('@')[1] +
                    ' - ' +
                    traded.product.title.split('@')[2]
              }}
            </p>
            <p>{{ traded.product.tags[1] }} | {{ traded.product.tags[3] }}</p>
          </div>
          <div class="saled__client">
            <p>Email: {{ traded.user.email }}</p>
            <p>
              결제 수단: {{ traded.account.bankName }}
              {{ traded.account.accountNumber }}
            </p>
            <p>결제 금액: {{ traded.product.price }}&nbsp;원</p>
          </div>
          <div class="saled__payment">
            <p>결제일: {{ traded.timePaid.split('T')[0] }}</p>
          </div>
        </div>
        <div class="saled__btn-group">
          <el-button
            type="primary"
            :class="{ change: !traded.isCanceled }"
            @click="isCanceled(traded.detailId, traded.isCanceled)"
          >
            {{ traded.isCanceled ? '거래 재개' : '거래 취소' }}
          </el-button>
          <el-button
            type="primary"
            :class="{ change: traded.done }"
            @click="isDone(traded.detailId, traded.done)"
          >
            {{ traded.done ? '확정 취소' : '거래 확정' }}
          </el-button>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
  export default {
    computed: {
      loading() {
        return this.$store.state.admin.loading;
      },
      tradedList() {
        return this.$store.state.admin.tradedProduct;
      },
    },
    created() {
      this.$store.dispatch('admin/tradedProduct');
    },
    methods: {
      isCanceled(id, isCancel) {
        const isCanceled = !isCancel;
        this.$store.dispatch('admin/cancelTrade', [{ id }, { isCanceled }]);
      },
      isDone(id, isDone) {
        const done = !isDone;
        this.$store.dispatch('admin/cancelTrade', [{ id }, { done }]);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .card-container {
    width: max(900px, 60vw);
    margin: 20px auto;
    background-color: #313131;
    border-radius: 10px;
    overflow: hidden;
    padding: 60px 0;
    height: max(800px, 70vh);
    .saled-card {
      width: max(700px, 50vw);
      height: 260px;
      margin: 20px auto;
      display: flex;
      background-color: #545455;
      border-radius: 8px;
      overflow: hidden;
      color: #cbcbcb;
      box-shadow: 0px 0px 10px #00000061;
      position: relative;
      .saled__poster {
        width: 200px;
        flex-shrink: 0;

        img {
          width: 100%;
        }
      }
      .saled__description {
        width: 60%;
        margin: 20px;
        .saled__title {
          display: flex;
          margin-bottom: 15px;
          p {
            display: flex;
            color: #409eff;
            font-size: 18px;
            font-weight: 700;
          }
        }
        .saled__product {
          margin: 15px 0;
          & > * {
            margin-top: 10px;
          }
          span {
            display: block;
            color: #fff;
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: max(90%, 400px);
            &:hover {
              color: #409eff;
              cursor: pointer;
            }
          }
          p {
            margin-bottom: 10px;
          }
        }
        .saled__client {
          font-size: 18px;
          color: #fff;
          p {
            margin-bottom: 10px;
          }
        }
      }
      .saled__btn-group {
        width: 150px;
        position: absolute;
        right: 0;
        & > * {
          display: block;
          margin: 30px 0;
          height: 92px;
          width: 92px;
          // background-color: #18222c;
          border: 0;
          font-weight: 700;
          // &:hover {
          //   background-color: #3375b9;
          // }
        }
        .change {
          color: #fff;
          background-color: #f56c6c;
          &:hover {
            // color: #fff;
            background-color: #f78989;
          }
        }
      }
    }
  }
</style>
