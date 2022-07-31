<template>
  <div class="signup-container">
    <div class="page-container">
      <div class="signup__title">회원가입</div>
      <div v-if="isSignup" class="sign-up-form">
        <el-form label-width="100px" status-icon>
          <el-form-item label="E-mail" class="form__composition">
            <el-input
              v-model="email"
              placeholder="ex) abc12@gmail.com"
              :rules="[
                {
                  required: true,
                  message: 'email은 필수 항목 입니다.',
                  trigger: 'blur',
                },
                {
                  type: 'email',
                  message: 'email 형식이 아닙니다.',
                  trigger: ['blur', 'change'],
                },
              ]"
            />
          </el-form-item>
          <el-form-item label="password" class="form__composition">
            <el-input
              v-model="password"
              placeholder="8자리 이상"
              type="password"
              show-password
              :rules="[
                {
                  required: true,
                  message: '비밀번호는 필수 항목입니다.',
                  trigger: 'blur',
                },
                {
                  min: 3,
                  message: '8자리 이상이어야 합니다.',
                  trigger: 'blur',
                },
              ]"
            />
          </el-form-item>
          <el-form-item label="user name" class="form__composition">
            <el-input
              v-model="displayName"
              placeholder="20자 이하"
              type="display-name"
              :rules="[
                {
                  required: true,
                  message: '닉네임은 필수 항목입니다.',
                  trigger: 'blur',
                },
                { max: 20, message: '20자까지만 가능합니다.', trigger: 'blur' },
              ]"
            />
          </el-form-item>
          <el-form-item label="profile" class="form__composition profile">
            <el-upload
              ref="profile"
              :file-list="fileList"
              class="avatar-uploader"
              action="#"
              :auto-upload="false"
              :on-change="handleAvatarSuccess"
              :limit="1"
              list-type="picture-card"
            >
              <el-icon class="avatar-uploader-icon">
                <Plus />
              </el-icon>
              <template #file="{ file }">
                <div>
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                  />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-delete"
                      @click="handleAvatarRemove"
                    >
                      <el-icon><Delete /></el-icon>
                    </span>
                  </span>
                </div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item class="btn-group">
            <el-button :disabled="!validation" @click="submit">
              Create
            </el-button>
            <el-button @click="clear"> Reset </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-else class="successSignUp">
        <div class="success">환영합니다!</div>
        <el-button type="primary" class="successSignUp__btn" @click="goLogin">
          로그인 하러 가기
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { Plus, Delete } from '@element-plus/icons-vue';
  import defultUser from '~/assets/user.png';

  export default {
    components: {
      Plus,
      Delete,
    },
    data() {
      return {
        email: '',
        password: '',
        displayName: '',
        profileBase64: '',
        imgUrl: '',
        fileList: [
          {
            default: true,
            name: 'default user image',
            url: defultUser,
          },
        ],
        dialogVisible: false,
        isSignup: true,
      };
    },
    computed: {
      validation() {
        // 회원가입시 필수적으로 입력해야 할 정보가 다 있는지 확인
        const re =
          /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(this.email) && this.password && this.displayName;
      },
      signUp() {
        return this.$store.state.user.signUp;
      },
    },
    mounted() {
      if (this.fileList) {
        const uploader = this.$refs.profile.$el;
        const inputCard = uploader.querySelector('.el-upload--picture-card');
        inputCard.style.display = 'none';
      }
    },
    methods: {
      clear() {
        this.email = '';
        this.password = '';
        this.displayName = '';
        if (!this.$refs.profile) return;
        this.$refs.profile.value = null;
      },
      async submit(event) {
        event.preventDefault();
        if (!this.validation) return;
        this.$store.dispatch('user/signUp', {
          email: this.email,
          password: this.password,
          displayName: this.displayName,
          profileImgBase64:
            this.profileBase64 || this.$store.state.user.defaultProfile,
        });
        this.isSignup = false;
      },
      goLogin() {
        this.$store.commit('user/signUp');
        this.clear();
      },
      async handleAvatarSuccess() {
        // 사진이 성공적으로 업로드 된 후 돌아갈 함수
        if (this.fileList.length < 1) return;
        const uploader = this.$refs.profile.$el;
        const inputCard = uploader.querySelector('.el-upload--picture-card');
        inputCard.style.display = 'none';
        const encodedString = await this.toBase64(
          this.fileList && this.fileList[0].raw,
        );
        this.profileBase64 = encodedString;
      },
      handleAvatarRemove() {
        this.fileList = [];
        const uploader = this.$refs.profile.$el;
        const card = uploader.querySelector('.el-upload--picture-card');
        card.style.display = 'inline-flex';
      },
      toBase64(file) {
        // 프로필 사진 base64 파일로 변환하기
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .signup-container {
    display: flex;
    align-items: center;
    width: 500px;
    height: 100%;
    .page-container {
      width: 400px;
      margin: 0 auto;
      .signup__title {
        font-size: 20px;
        font-weight: 700;
        position: relative;
        bottom: 100px;
        display: block;
        text-align: center;
      }
      .sign-up-form {
        display: block;
        flex-direction: column;
        padding-right: 40px;
        height: 360px;
        position: relative;
        .form__composition {
          margin-bottom: 15px;
          & > * {
            margin-bottom: 4px;
          }
        }
        .btn-group {
          position: absolute;
          bottom: 0;
          .el-button {
            background-color: rgb(16, 15, 18);
            border: 1px solid #fff;
            color: #fff;
          }
        }
      }
      .successSignUp {
        width: 100%;
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
        .success {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
          font-size: 24px;
          font-weight: 600;
        }
        .successSignUp__btn {
          margin: 20px auto;
          padding: 22px 25px;
          border-radius: 9px;
          font-size: 15px;
          color: #000;
          width: 130px;
          background-color: #b8ac8f;
          border: 1px solid #b8ac8f;
        }
      }
    }
  }
</style>
