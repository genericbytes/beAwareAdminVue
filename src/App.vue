<template>
  <router-view></router-view>
</template>
<script>
export default {
  destroyed() {
    // this.$store.dispatch("logOut").then(() => {
    //   this.$router.push({ name: "login" });
    // });
  },
};
</script>
<style>
.edit {
  color: #f57f17 !important;
}
.delete {
  color: #B71C1C !important;
}
.block {
  color: #F4511E !important;
}
</style>
