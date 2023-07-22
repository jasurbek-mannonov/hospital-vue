<template>
  <aside class="aside">
    <router-link class="logo" to="/">
      <img src="@/assets/img/logo.png" alt="logo"/>
    </router-link>
    <div class="title">MEDICINE</div>
    <nav class="nav">
        <router-link 
        v-for="item, index of links" 
        :key="index"
        :to="item.link">
        <img :src="getImg(item.icon)" alt="icon">
        {{ item.title }}
        </router-link>
        <!--
        <a class="" href="patient.html">
        <img src="./assets/img/bemor.svg" alt="Bemorlar">
        Bemorlar</a> -->
        <button @click="logout()">Chiqish</button>
    </nav>
  </aside>
</template>

<script>
export default {
    data: () => ({
        links: [
            {
                link: '/',
                title: 'Bosh sahifa',
                icon: 'Vector'
            },
            {
                link: '/department',
                title: 'Bo\'limlar',
                icon: 'department'
            },
            {
                link: '/spec',
                title: 'Mutaxassisliklar',
                icon: 'department'
            },
            {
                link: '/room',
                title: 'Palatalar',
                icon: 'palata'
            },
            {
                link: '/doctor',
                title: 'Shifokorlar',
                icon: 'doctors'
            }
        ]
    }),
    methods: {
      getImg(link){
        return new URL(`/src/assets/img/${link}.svg`, import.meta.url)
      },
      logout(){
        if(confirm("Qaroringiz qat'iymi")){
          this.$store.dispatch('exit')
        }
      }
    }
};
</script>

<style lang="scss">
@import '@/styles/blocks/aside'
</style>
