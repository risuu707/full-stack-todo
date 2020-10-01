<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$store.dispatch('fetchToDos');
    console.log(this.$store.getters.fetchToDos);
  }
};
</script>
