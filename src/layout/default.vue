<template>
     <div class="main">
     <Aside/>
      <div class="wrapper"> 
        <Header/>
        <div class="content">
         <router-view/>
        </div>
      </div>
    </div>
</template>

<script>
import Aside from "../components/aside.vue"
import Header from '../components/header.vue'

export default{
  components: { Aside, Header },     
  emits: ['success']
    }
</script>

<style lang="scss">
@import '@/styles/page/default.scss'
</style>