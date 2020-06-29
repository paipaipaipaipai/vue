<template>
  <div>
    <h1>{{ msg }}</h1>
    <h1>{{ key1 }}</h1>
    <h1>{{ key2 }}</h1>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        key1: this.$route.query.key1,
        key2: this.$route.query.key2,
        msg: '可做列表到详情页的功能'
      }
    }
  }
</script>
