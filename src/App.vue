<template>
  <HeaderLink />
  <router-view class="router-view" />
</template>

<script>
  import HeaderLink from '~/components/HeaderLink';
  export default {
    components: {
      HeaderLink,
    },
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500;600;700;900&display=swap');
  @font-face {
    font-family: 'MICEMyungjo';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-01@1.0/MICEMyungjo.woff2')
      format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'MICEMyungjo';
    background-color: rgb(29, 29, 29);
  }
</style>
