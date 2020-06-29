<template>
  <div>
    <router-link :to="{path: '/test/two', query: {key1:'123', key2: '456' }}">
      <h1>{{ two }}</h1>
    </router-link>
    <router-link :to="{path: '/test/one/three', query: {key1:'123', key2: '456' }}">
      <h1>{{ three }}</h1>
    </router-link>
    <router-view style="margin-top: 10px;border-color: red;border-width: 5px;"></router-view>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        two: 'One >>>>>> Two',
        three: 'One >>>>>> Three'
      }
    }
  }
</script>
