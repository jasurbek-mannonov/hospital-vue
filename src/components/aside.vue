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
        <img :src="`@/assets/img/${item.icon}.svg`" alt="icon">
        {{ item.title }}
        </router-link>
        <!-- <a class="active" href="index.html">
        <img src="./assets/img/Vector.svg" alt="Bosh sahifa">
        Bosh sahifa</a>
        <a class="" href="department.html">
        <img src="./assets/img/department.svg" alt="Bo'limlar">
        Bo'limlar</a>
        <a class="" href="spec.html">
        <img src="./assets/img/department.svg" alt="Mutaxassisliklar">
        Mutaxassisliklar</a>
        <a class="" href="room.html">
        <img src="./assets/img/palata.svg" alt="Palatalar">
        Palatalar</a>
        <a class="" href="doctor.html">
        <img src="./assets/img/doctors.svg" alt="Shifokorlar">
        Shifokorlar</a>
        <a class="" href="patient.html">
        <img src="./assets/img/bemor.svg" alt="Bemorlar">
        Bemorlar</a> -->
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
                icon: 'home'
            },
            {
                link: '/department',
                title: 'Bo\'limlar',
                icon: 'department'
            }
        ]
    }),
    methods: {
      getImg(link){
        return new URL(`/src/assets/img/${link}.svg`, import.meta.url)
      }
    }
};
</script>

<style lang="scss">
@import '@/styles/blocks/aside'
</style>
