<template>
  <login @successLogin = "() =>{
   $emit('success') 
  } 
  "/>
</template>

<script>
import login from '../views/login.vue';
export default {
  emits: ['success'],
    components: {
        login
    }
};
</script>

<style lang="scss">
</style>
