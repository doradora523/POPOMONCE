<template>
  <div class="modal-content">
    <h2>신규 계좌 등록</h2>
    <div class="registration">
      <div class="register-info">
        <h4>* 본인 명의의 계좌만 등록 가능합니다.</h4>
        <p>( 1은행 1계좌 )</p>
      </div>
      <div class="account-form">
        <el-select v-model="bankCode" class="account-select" required>
          <el-option value="은행명" disabled hidden>은행명</el-option>
          <!-- 은행 코드를 key, digits 속성의 숫자를 value값으로 만든 Object로 은행마다 다른 degit들을 각 input마다 다르게 설정 -->
          <el-option
            v-for="bank in ableBankList"
            :key="bank.code"
            :label="bank.name"
            :value="bank.code"
            :disabled="bank.disabled"
          ></el-option>
        </el-select>

        <div class="account-number">
          <h5>계좌번호</h5>
          <div ref="inputGroup" class="account-number__container">
            <input
              v-for="(digit, idx) in bankDigits[bankCode]"
              :key="idx"
              v-model="accountNumberList[idx]"
              required
              :name="`digit${idx}`"
              type="text"
              :maxlength="digit"
              :tabindex="idx + 1"
              class="account-number__input"
              @keydown="keyDownEvent"
              @input="onlyNum"
            />
          </div>
        </div>

        <input
          v-model="phoneNumber"
          required
          class="phone-number"
          name="phone"
          type="text"
          pattern="\d*"
          placeholder="휴대폰 번호를 입력해주세요"
          minlength="11"
          maxlength="11"
        />

        <el-checkbox v-model="checked" class="check-agreement" required>
          계좌 등록에 동의합니다.
        </el-checkbox>
      </div>
    </div>
    <div class="add-btn" @click="submit">
      <p>등록</p>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        accountNumberList: [],
        accountNumber: '',
        phoneNumber: '',
        bankCode: '은행명',
        checked: false,
        bankDigits: {
          은행명: [3, 3, 3],
          '004': [3, 2, 4, 3],
          '088': [3, 3, 6],
          '020': [4, 3, 6],
          '081': [3, 6, 5],
          '089': [3, 3, 6],
          '090': [4, 2, 7],
          '011': [3, 4, 4, 2],
        },
      };
    },
    computed: {
      ableBankList() {
        return this.$store.state.payment.bankList;
      },
    },
    methods: {
      keyDownEvent(event) {
        // 계좌번호 input 창 maxlength에 다다르면 다음 input 창으로 자동 focus 하기
        const inputEl = document.getElementsByName(event.target.name)[0];
        inputEl.value = event.target.value;

        // next input
        if (
          event.target.value.length === event.target.maxLength &&
          event.target.nextElementSibling
        ) {
          event.target.nextElementSibling.focus();
        }

        // previous input
        if (event.code === 'Backspace') {
          if (
            event.target.value.length === 0 &&
            event.target.previousElementSibling
          ) {
            event.target.previousElementSibling.focus();
          }
        }
      },
      onlyNum(event) {
        // input tag의 type을 number로 설정하면 maxlength/minlength를 설정할 수 없어, js code로 제어함
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
      },
      async submit() {
        this.accountNumber = this.accountNumberList.join('');

        if (
          // 하나라도 없다면 함수를 실행시키지 않음
          !(
            this.bankCode &&
            this.accountNumber &&
            this.phoneNumber &&
            this.checked
          )
        )
          return;

        await this.$store.dispatch('payment/connectAccount', {
          bankCode: this.bankCode,
          accountNumber: this.accountNumber,
          phoneNumber: this.phoneNumber,
          signature: true,
        });
        this.$store.dispatch('payment/accountList');
        this.$store.dispatch('payment/bankList');
        alert('등록이 완료되었습니다.');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .modal-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    h2 {
      font-size: 20px;
      line-height: 60px;
      background-color: #000;
      width: 100%;
      color: #fff;
      text-align: center;
    }
    .registration {
      width: 100%;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .register-info {
        text-align: center;
        margin: 50px 0;
        font-weight: 900;
        color: #fe253f;
        letter-spacing: 0.2em;
        h4 {
          font-size: 14px;
        }
        p {
          margin-top: 10px;
          font-size: 12px;
        }
      }

      .account-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .account-select,
        .account-number,
        .phone-number {
          margin: 40px 0 0;
          border: none;
          border-bottom: 1px solid #ccc;
          padding: 10px;
          width: 300px;
          text-align: center;
          &:focus {
            outline: none;
          }
        }
        .account-number {
          .account-number__container {
            display: flex;
            width: 280px;
            justify-content: space-around;
            .account-number__input {
              display: flex;
              width: 100%;
              height: 35px;
              margin-top: 20px;
              margin-right: 10px;
              border: 1px solid #ccc;
              border-radius: 6px;
              padding: 3px 10px;
              text-align: center;
              &:last-child {
                margin-right: 0;
              }
            }
          }
        }
        .account-select {
          font-size: 14px;
          letter-spacing: 1em;
          text-indent: 20px;
        }
        .account-number,
        .phone-number {
          font-size: 14px;
          letter-spacing: 0.5em;
        }
        .check-agreement {
          margin-top: 50px;
          color: #fe253f;
        }
        p {
          margin-top: 20px;
          font-size: 10px;
          letter-spacing: 0.15em;
          color: #999;
        }
      }
    }
    .add-btn {
      width: 50px;
      height: 50px;
      background-color: #fe253f;
      border-radius: 50%;
      margin: 40px 0 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:hover p {
        transform: scale(0.85);
      }
      p {
        color: #fff;
        font-size: 16px;
        line-height: 50px;
        font-weight: 900;
        text-align: center;
        transition: all 0.3s;
      }
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
</style>
