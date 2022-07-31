<template>
  <div class="searchContainer">
    <div class="search-form" :class="{ searching: !filterOpen }">
      <input
        v-model="searchText"
        class="form-control"
        type="text"
        placeholder="Please search the title or genre of performance which you want"
        @click="[filterShow(), reset()]"
        @keyup.enter="apply"
      />
      <button class="btn" type="submit" @click="apply">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>

    <transition name="filterFade">
      <div
        v-show="focusingInput ? filterOpen : !filterOpen"
        class="filter-form"
      >
        <div class="selects-genre">
          <select v-model="genre" class="form-select">
            <option :value="null" disabled hidden>장르</option>
            <option
              v-for="item in genreOptions"
              :key="item"
              :label="item"
              :value="item"
            ></option>
          </select>
        </div>
        <div class="selects-age">
          <select v-model="age" class="form-select">
            <option :value="null" disabled hidden>연령</option>
            <option
              v-for="item in ageOptions"
              :key="item"
              :label="item"
              :value="item"
              disabled
            ></option>
          </select>
        </div>
        <div class="selects-region">
          <select v-model="region" class="form-select">
            <option :value="null" disabled hidden>지역</option>
            <option
              v-for="item in regionOptions"
              :key="item"
              :label="item"
              :value="item"
            ></option>
          </select>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        filterOpen: true,
        focusingInput: false,
        searchText: '',
        searchTags: [],
        genre: null,
        age: null,
        region: null,
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
      };
    },
    methods: {
      filterShow() {
        this.focusingInput = true;
        this.filterOpen = true;
      },
      apply() {
        if (!this.focusingInput) return;
        // tag에 아무것도 선택하지 않았을 때, 빈문자열을 그대로 보내는 것이 아니라 truesy한 값만 전송하도록 함
        this.searchTags = [this.genre, this.age, this.region].filter((t) => t);
        this.isLoading = true;
        this.searchText = this.searchText.trim();
        if (this.searchTags.value === null) {
          return this.searchTags.value === '';
        }
        if (!(this.searchText || this.searchTags)) return;
        this.$store.dispatch('performance/searchList', {
          searchText: this.searchText,
          searchTags: this.searchTags,
        });
        this.isLoading = false;
        this.filterOpen = false;
      },
      reset() {
        this.searchText = '';
        this.searchTags = [];
      },
    },
  };
</script>

<style lang="scss" scoped>
  /* transition animation */
  .filterFade-enter-active {
    animation: fade-in 0.7s ease-out forwards;
    transition: opacity 0.7s;
  }
  .filterFade-leave-active {
    animation: fade-out 0.8s ease-out forwards;
    transition: opacity 0.5s;
    opacity: 0;
  }
  @keyframes fade-in {
    from {
      transform: translateY(-50px);
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes fade-out {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(50px);
    }
  }

  .searchContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    /* search-form */
    .search-form {
      position: relative;
      display: flex;
      width: 100%;
      height: 55px;
      flex-shrink: 0;
      transition: all 0.8s;
      &.searching {
        width: 60%;
        height: 35px;
        bottom: 340px;
        transition: all 0.8s;
      }
      .form-control {
        display: block;
        overflow: hidden;
        width: 100%;
        height: 100%;
        color: #fff;
        background-color: #000;
        border: 1px solid #000;
        border-radius: 30px;
        padding-right: 8%;
        flex-shrink: 0;
        font-size: 16px;
        text-indent: 20px;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:focus {
          outline: none;
        }
      }
      .btn {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 10%;
        font-size: 20px;
        color: #fff;
        background-color: transparent;
        border: none;
        cursor: pointer;
      }
    }
    /* filter-form */
    .filter-form {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      align-items: center;
      position: absolute;
      top: 120%;
      background-color: #000;
      width: 100%;
      border-radius: 30px;
      padding: 5px 0px;
      .form-select {
        width: 120px;
        height: 30px;
        color: #fff;
        background-color: #000;
        text-align: center;
        border: 1px solid #444;
        border-radius: 30px;
        margin: 0 5px;
        &:focus {
          outline: none;
        }
      }
    }
  }
</style>
