<template>
  <div class="login-container">
    <div class="page-container">
      <div class="login__title">로그인</div>
      <el-form
        label-width="100px"
        class="login-form"
        status-icon
        @keydown.enter="submit"
      >
        <el-form-item label="E-mail" class="form__composition form__Id">
          <el-input
            v-model="email"
            type="email"
            placeholder="ex) abc12@gmail.com"
          />
        </el-form-item>
        <el-form-item label="password" class="form__composition form__password">
          <el-input v-model="password" type="password" placeholder="비밀번호" />
        </el-form-item>
        <el-button class="login-btn" type="success" @click="submit">
          로그인
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    computed: {
      validation() {
        // 이메일 형식 확인 + 비밀번호 유무 확인
        const re =
          /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(this.email) && this.password;
      },
    },
    methods: {
      async submit(event) {
        event.preventDefault();
        if (!this.validation) return;

        await this.$store.dispatch('user/login', {
          email: this.email,
          password: this.password,
        });
        this.$router.push('/');
      },
      async logout() {
        await this.$store.dispatch('user/logout');
        this.email = '';
        this.password = '';
      },
    },
  };
</script>

<style lang="scss" scoped>
  .login-container {
    display: flex;
    align-items: center;
    width: 500px;
    height: 100%;
    .page-container {
      width: 400px;
      margin: 0 auto;
      justify-content: center;
      .login__title {
        font-size: 26px;
        font-weight: 700;
        margin-top: -50px;
        margin-bottom: 50px;
        display: block;
        text-align: center;
      }
      .login-form {
        display: flex;
        align-content: center;
        flex-direction: column;
        margin-top: 50px;
        .form__composition {
          margin-bottom: 15px;
          padding-right: 40px;
        }
        .el-input {
          background-color: #eee;
          border-radius: 5px;
        }
        .login-btn {
          margin: 10px auto;
          height: 35px;
          width: 100px;
          background-color: #797a53;
          border: 1px solid #797a53;
        }
      }
    }
  }
</style>
