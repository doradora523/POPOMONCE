<template>
  <div class="product-add">
    <el-form
      label-width="230px"
      class="product-add__form"
      status-icon
      @keydown.enter="submit"
    >
      <el-form-item class="add__title">
        <div class="form-title">공연 추가</div>
      </el-form-item>
      <el-form-item
        label="공연 이름"
        class="form__composition title"
        :rules="{
          required: true,
          message: '공연 이름은 필수 항목 입니다.',
          trigger: 'blur',
        }"
      >
        <el-input v-model="title" type="text" />
      </el-form-item>
      <el-form-item
        label="가격"
        class="form__composition price"
        :rules="{
          required: true,
          message: '공연 가격은 필수 항목 입니다.',
          trigger: 'blur',
        }"
      >
        <el-input v-model="price" type="number" />
      </el-form-item>
      <el-form-item
        label="상세 설명"
        class="form__composition descript"
        :rules="{
          required: true,
          message: '공연 상세설명은 필수 항목 입니다.',
          trigger: 'blur',
        }"
      >
        <el-input
          v-model="description"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5 }"
        />
      </el-form-item>
      <el-form-item
        label="검색 태그"
        class="form__composition"
        :rules="{
          required: true,
          message: '공연 태그가 없으면 검색 유입이 적습니다.',
          trigger: 'blur',
        }"
      >
        <el-select
          v-model="age"
          class="add__tags"
          clearable
          placeholder="나이 제한"
          size="large"
        >
          <el-option
            v-for="item in ageOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-select
          v-model="genre"
          class="add__tags"
          clearable
          :multiple="true"
          placeholder="장르"
          size="large"
        >
          <el-option
            v-for="item in genreOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-select
          v-model="openrun"
          class="add__tags"
          clearable
          placeholder="오픈런"
          size="large"
        >
          <el-option
            v-for="item in openrunOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-select
          v-model="region"
          class="add__tags"
          clearable
          placeholder="지역"
          size="large"
        >
          <el-option
            v-for="item in regionOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <div class="img-container">
        <el-form-item label="썸네일 이미지" class="form__composition">
          <el-upload
            ref="thumbnailFileList"
            :file-list="thumbnailFileList"
            action="#"
            :auto-upload="false"
            :on-change="handleAvatarSuccess('thumbnailFileList')"
            :limit="1"
            list-type="picture-card"
          >
            <el-icon>
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
                    @click="handleAvatarRemove('thumbnailFileList')"
                  >
                    <el-icon><Delete /></el-icon>
                  </span>
                </span>
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="상세 이미지" class="form__composition">
          <el-upload
            ref="detailFileList"
            :file-list="detailFileList"
            action="#"
            :auto-upload="false"
            :on-change="handleAvatarSuccess('detailFileList')"
            :limit="1"
            list-type="picture-card"
          >
            <el-icon>
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
                    @click="handleAvatarRemove('detailFileList')"
                  >
                    <el-icon><Delete /></el-icon>
                  </span>
                </span>
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button class="product-add__btn" type="primary" @click="submit">
          공연 추가하기 {{ errorMsg }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { Plus, Delete } from '@element-plus/icons-vue';

  export default {
    components: {
      Plus,
      Delete,
    },
    data() {
      return {
        ageOptions: [
          '전체 관람가',
          '만 7세 이상',
          '만 15세 이상',
          '만 19세 이상',
        ],
        genreOptions: [
          '연극',
          '뮤지컬',
          '무용',
          '클래식',
          '오페라',
          '국악',
          '복합',
        ],
        openrunOptions: ['Y', 'N'],
        regionOptions: [
          '서울',
          '인천',
          '대전',
          '대구',
          '울산',
          '부산',
          '광주',
          '세종',
          '경기도',
          '강원',
          '충남',
          '충북',
          '경북',
          '경남',
          '전북',
          '전남',
          '제주',
        ],
        title: '',
        price: '',
        description: '',
        region: '',
        age: '',
        genre: '',
        openrun: '',
        thumbnailBase64: '',
        photoBase64: '',
        isSoldOut: false,
      };
    },
    watch: {
      // 필수값을 입력하지 않았을 때, 경고창 비활성/활성화
      // (프로젝트에 적용했던 외부 라이브러리가 에러가 있어, js code로 직접 조절하였습니다. 그래도 미흡한 부분이 있습니다ㅠ)
      title(newV, oldV) {
        const errorMsg = document.querySelector('.title .el-form-item__error');
        const errorBorder = document.querySelector('.title .el-input__wrapper');
        const errorSuffix = document.querySelector(
          '.title .el-input__validateIcon',
        );
        if (newV) {
          if (!errorMsg) return;
          console.log('no error');
          errorMsg.style.display = 'none';
          errorBorder.style.boxShadow = '0 0 0 1px #4c4d4f inset';
          errorSuffix.style.display = 'none';
        }
        if (!newV && oldV) {
          if (!errorMsg) return;
          console.log('error');
          errorMsg.style.display = 'block';
          errorBorder.style.boxShadow = '0 0 0 1px #f56c6c inset';
          errorSuffix.style.display = 'inline-flex';
        }
      },
      price(newV, oldV) {
        const errorMsg = document.querySelector('.price .el-form-item__error');
        const errorBorder = document.querySelector('.price .el-input__wrapper');
        const errorSuffix = document.querySelector(
          '.price .el-input__validateIcon',
        );
        if (newV) {
          if (!errorMsg) return;
          console.log('no error');
          errorMsg.style.display = 'none';
          errorBorder.style.boxShadow = '0 0 0 1px #4c4d4f inset';
          errorSuffix.style.display = 'none';
        }
        if (!newV && oldV) {
          if (!errorMsg) return;
          console.log('error');
          errorMsg.style.display = 'block';
          errorBorder.style.boxShadow = '0 0 0 1px #f56c6c inset';
          errorSuffix.style.display = 'inline-flex';
        }
      },
      description(newV, oldV) {
        const errorMsg = document.querySelector(
          '.description .el-form-item__error',
        );
        const errorBorder = document.querySelector(
          '.description .el-input__wrapper',
        );
        const errorSuffix = document.querySelector(
          '.description .el-input__validateIcon',
        );
        if (newV) {
          if (!errorMsg) return;
          console.log('no error');
          errorMsg.style.display = 'none';
          errorBorder.style.boxShadow = '0 0 0 1px #4c4d4f inset';
          errorSuffix.style.display = 'none';
        }
        if (!newV && oldV) {
          if (!errorMsg) return;
          console.log('error');
          errorMsg.style.display = 'block';
          errorBorder.style.boxShadow = '0 0 0 1px #f56c6c inset';
          errorSuffix.style.display = 'inline-flex';
        }
      },
    },
    methods: {
      handleAvatarRemove(fileList) {
        const uploader = this.$refs[fileList].$el;
        const card = uploader.querySelector('.el-upload--picture-card');
        card.style.display = 'inline-flex';
        this[fileList] = [];
      },
      async handleAvatarSuccess(fileList) {
        const uploader =
          fileList === 'thumbnailFileList'
            ? this.$refs.thumbnailFileList
            : this.$refs.detailFileList;

        if (!uploader) return;

        console.log(uploader);
        const dataFileList = this.$data[fileList];

        console.log(dataFileList);
        if (dataFileList < 1) return;
        const inputCard = uploader.querySelector('.el-upload--picture-card');
        inputCard.style.display = 'none';
        const encodedString = await this.toBase64(
          dataFileList && dataFileList[0].raw,
        );
        const encodedImg = fileList.split('FileList')[0] + 'Base64';
        this.$data[encodedImg] = encodedString;
        console.log(this.$data[encodedImg]);
      },
      async submit() {
        const tags = [this.age, this.genre, this.openrun, this.region].filter(
          (tag) => tag,
        );

        try {
          await this.$store.dispatch('admin/addProduct', {
            productId: this.$route.params.id,
            data: {
              title: this.title,
              price: this.price,
              description: this.description,
              tags,
              thumbnailBase64: this.thumbnailBase64 || null,
              photoBase64: this.photoBase64 || null,
            },
          });
          alert('공연이 추가되었습니다.');
          this.$router.push('/admin/allsales');
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .product-add {
    display: flex;
    align-items: center;
    margin: auto;
    width: 1000px;
    height: max(700px, 70vh);
    position: relative;
    display: flex;
    background-color: #2b2b2b;
    color: #eee;
    border-radius: 10px;
    --el-text-color-regular: #e5eaf3;
    --el-text-color-primary: #eee;
    --el-input-bg-color: #2b2b2b;
    --el-fill-color-blank: #2b2b2b;
    --el-border-color: #4c4d4f;
    .add__title {
      margin-bottom: 40px;
      .form-title {
        font-size: 23px;
        font-weight: 700;
      }
    }
    .add__tags {
      width: 150px;
      margin-right: 15px;
      &:last-child {
        margin-right: 0;
      }
    }
    .img-container {
      display: flex;
    }
    .is-soldout {
      --el-switch-on-color: #ff4949;
      --el-switch-off-color: #79bbff;
    }
    .product-add__btn {
      padding: 20px 15px;
      margin-top: 40px;
    }
  }
</style>
