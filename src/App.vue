<template>
  <component :is="layout"/>
  <notif-vue />
</template> 

<script>
import { mapGetters } from 'vuex';
import authLayout from './layout/auth.vue';
import defaultLayout from './layout/default.vue';
import notifVue from './components/notif.vue'
export default{
  components: {
    notifVue,
    'auth': authLayout,
    'def': defaultLayout
  },
  computed: {
    ...mapGetters([
      'layout',
    ]),
  },
  mounted(){
    this.$store.dispatch('checkUser')
  }
}
</script>

<style lang="scss">
  @import '@/styles/style.scss'
</style>
