<template>
  <div class="edit-container">
    <div class="page-container">
      <div class="edit__title">내 정보 수정하기</div>
      <el-form class="edit-form" label-width="110px" status-icon>
        <el-form-item label="user name" class="form__composition">
          <el-input
            v-model="displayName"
            placeholder="20자 이하"
            maxlength="20"
            type="display-name"
          />
        </el-form-item>
        <el-form-item label="old password" class="form__composition">
          <el-input
            v-model="oldPassword"
            type="password"
            show-password
            :required="{ newPassword }"
          />
        </el-form-item>
        <el-form-item label="new password" class="form__composition">
          <el-input
            v-model="newPassword"
            placeholder="8자리 이상"
            minlength="8"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item label="profile" class="form__composition">
          <el-upload
            ref="profile"
            v-model:file-list="fileList"
            class="avatar-uploader"
            action="#"
            :style="{ backgroundImage: userProfile }"
            :auto-upload="false"
            :on-change="handleAvatarSuccess"
            :limit="2"
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
        <el-form-item>
          <div class="btn-group">
            <el-button
              class="delete-btn"
              type="primary"
              plain
              @click="deleteProfile"
            >
              <el-icon class="delete-btn__icon">
                <Delete />
              </el-icon>
              Use Default Image
            </el-button>
            <div class="chang-reset-btn">
              <el-button type="primary" @click="submit"> Change </el-button>
              <el-button type="warning" plain @click="clear"> Reset </el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { Plus, Delete, ZoomIn } from '@element-plus/icons-vue';

  export default {
    components: {
      Plus,
      Delete,
      ZoomIn,
    },
    data() {
      return {
        oldPassword: '',
        newPassword: '',
        displayName: this.$store.state.user.displayName,
        isProfileChanged: false,
        profileBase64: this.$store.state.user.profileImg,
        imgUrl: '',
        fileList: [
          {
            name: 'user profile',
            url: this.$store.state.user.profileImg,
          },
        ],
        dialogVisible: false,
      };
    },
    computed: {
      userProfile() {
        return this.$store.state.user.profileImg;
      },
      defaultUser() {
        return this.$store.state.user.defaultProfile;
      },
    },
    mounted() {
      const uploader = this.$refs.profile.$el;
      const card = uploader.querySelector('.el-upload--picture-card');
      card.style.display = 'inline-flex';
    },
    methods: {
      clear() {
        this.oldPassword = '';
        this.newPassword = '';
        this.displayName = '';
        this.fileList[0].url = this.userProfile;
        this.isProfileChanged = false;
      },
      async submit(event) {
        event.preventDefault();
        if (
          !(
            this.oldPassword ||
            this.newPassword ||
            this.displayName ||
            this.isProfileChanged
          )
        ) {
          return;
        }
        console.log(this.profileBase64);
        if (!this.isProfileChanged) {
          this.profileBase64 = '';
        }

        const data = {
          displayName: this.displayName,
          profileImgBase64: this.profileBase64,
          oldpassword: this.oldPassword,
          newPassword: this.newPassword,
        };

        Object.entries(data).forEach(([k, v]) => {
          if (!v) {
            delete data[k];
          }
        });
        console.log(data);
        await this.$store.dispatch('user/editUserInfo', data);
        this.$router.push('/');
      },
      async handleAvatarSuccess() {
        if (this.fileList.length < 1) return;
        const uploader = this.$refs.profile.$el;
        const inputCard = uploader.querySelector('.el-upload--picture-card');
        inputCard.style.display = 'none';
        const encodedString = await this.toBase64(
          this.fileList && this.fileList[0].raw,
        );
        this.profileBase64 = encodedString;
        this.isProfileChanged = true;
      },
      handleAvatarRemove() {
        this.fileList = [];
        const uploader = this.$refs.profile.$el;
        const card = uploader.querySelector('.el-upload--picture-card');
        card.style.display = 'inline-flex';
      },
      toBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      },
      deleteProfile() {
        this.handleAvatarRemove();
        this.isProfileChanged = true;
        this.profileBase64 = this.defaultUser;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .edit-container {
    display: flex;
    align-items: center;
    margin: auto;
    padding-top: 130px;
    .page-container {
      width: 1000px;
      height: 700px;
      display: block;
      margin: 0 auto;
      background-color: rgba(239, 239, 239, 0.964);
      border-radius: 10px;
      overflow: hidden;
      .edit__title {
        font-size: 26px;
        font-weight: 700;
        padding: 70px;
        position: relative;
        display: block;
        &::after {
          content: '';
          position: absolute;
          top: 140px;
          width: 1000px;
          left: 0px;
          border-bottom: 1px solid #636466;
        }
      }
      .edit-form {
        display: block;
        margin: 50px 100px;
        .btn-group {
          display: flex;
          flex-direction: column;
          .delete-btn {
            margin-bottom: 16px;
            border: 1px solid #3d6151;
            background-color: #3d6151;
            color: #fff;
            .delete-btn__icon {
              margin-right: 5px;
            }
          }
          .chang-reset-btn {
            .el-button {
              &:nth-child(1) {
                border: 1px solid #db773d;
                background-color: #db773d;
                color: #fff;
              }
              &:nth-child(2) {
                border: 1px solid #edcd7e;
                background-color: #edcd7e;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
</style>
