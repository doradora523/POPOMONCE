<template>
  <div class="admin-allsales">
    <el-container>
      <el-row>
        <el-col v-for="pf in products" :key="pf.id" :span="6">
          <el-skeleton style="width: 240px" :loading="loading" animated>
            <template #template>
              <el-skeleton-item
                variant="image"
                style="width: 240px; height: 240px"
              />
              <div style="padding: 14px">
                <el-skeleton-item variant="h3" style="width: 50%" />
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-items: space-between;
                    margin-top: 16px;
                    height: 16px;
                  "
                >
                  <el-skeleton-item variant="text" style="margin-right: 16px" />
                  <el-skeleton-item
                    variant="text"
                    style="width: 30%; background-color: #303030"
                  />
                </div>
              </div>
            </template>
            <template #default>
              <div class="admin__performance-card">
                <el-card
                  shadow="hover"
                  :body-style="{ padding: '0px', border: 'none' }"
                  class="card__body"
                >
                  <div class="card__poster">
                    <img :src="pf.thumbnail" class="image" />
                  </div>
                  <div class="card__description" style="padding: 14px">
                    <div class="card__title">
                      {{ pf.title.split('@')[0] }}
                    </div>
                    <div class="card__tags">
                      <div v-for="(tag, i) in pf.tags" :key="i">
                        {{ tag + ' ' }}
                      </div>
                    </div>
                    <div class="time">
                      {{
                        pf.title.split('@')[1] + ' ~ ' + pf.title.split('@')[2]
                      }}
                    </div>
                    <div class="bottom">
                      <el-button class="button">
                        <router-link :to="`/admin/edit/${pf.id}`">
                          수정하기
                        </router-link>
                      </el-button>
                    </div>
                  </div>
                </el-card>
              </div>
            </template>
          </el-skeleton>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count: 0,
        limit: 20,
        offset: 0,
      };
    },
    computed: {
      products() {
        const res = this.$store.state.admin.allProducts;
        if (!res) return;
        return res && res.slice(0, this.offset + this.limit);
      },
      totalCount() {
        return this.products.length;
      },
      loading() {
        return this.$store.state.admin.loading;
      },
      load() {
        return (this.count += 2);
      },
    },
    mounted() {
      window.addEventListener('scroll', this.onScroll);
      this.$store.dispatch('admin/showProducts');
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.onScroll);
    },
    methods: {
      onScroll() {
        const docElement = document.documentElement;
        if (
          window.scrollY + docElement.clientHeight >
          docElement.scrollHeight - 300
        ) {
          const currentOffset =
            this.offset + this.limit >= this.totalCount
              ? this.totalCount
              : this.offset + this.limit;
          this.offset = currentOffset;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .admin-allsales {
    margin-top: 140px;
    display: flex;
    justify-content: center;
    width: 1500px;
    margin: auto;
    .admin__performance-card {
      height: 430px;
      width: 300px;
      margin: 10px;
      flex-shrink: 0;
      margin-bottom: 10px;
      & > * {
        border: none;
      }
      .card__body {
        border-radius: 10px;
        color: #141414;
        .card__poster {
          width: 100%;
          height: 250px;
          .image {
            background-size: cover;
            width: 100%;
          }
        }
        .card__description {
          position: relative;
          height: 160px;
          background-color: #adadadb2;
          backdrop-filter: blur(5px);
          & > * {
            margin-bottom: 10px;
          }
          .card__title {
            font-size: 18px;
            font-weight: 700;
            height: 36px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .card__tags {
            display: flex;
            & > * {
              &::after {
                content: '';
                overflow: hidden;
                display: inline-block;
                width: 1px;
                height: 11px;
                margin: -3px 10px 0;
                border-right: 1px solid #141414;
              }
              &:last-child::after {
                display: none;
              }
            }
          }
          .bottom {
            position: absolute;
            right: 13px;
            bottom: 2px;
            .button {
              padding: 18px 15px;
              background-color: #1d1e1f;
              border: none;
              &:hover {
                background-color: #363637;
              }
              a {
                font-size: 15px;
                text-decoration: none;
                color: #f5f5f5;
              }
            }
          }
        }
      }
    }
    .el-skeleton {
      --el-skeleton-color: #303030;
      --el-skeleton-to-color: #424243;
    }
  }
</style>
