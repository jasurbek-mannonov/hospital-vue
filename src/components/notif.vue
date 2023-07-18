<template>
    <div 
    :class="`notif
     ${notif.type || ''}
     ${notif.type ? 'active' : ''}`">
        {{ notif.text }}
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default{
    computed: {
        ...mapGetters(['notif'])
    }
}
</script>

<style lang="scss">
    .notif{
    position: fixed;
    top: 20px;
    right: -400px;
    width: 300px;
    padding: 20px;
    z-index: 3;
    background-color: #fff;
    font-size: 18px;
    border: 1px solid #e7e7e7;
    transition: all .3s linear;
}

.notif.active{
    right: 20px;
}

.notif.success{
    border-left: 5px solid #059d23;
}
.notif.warning{
    border-left: 5px solid #ffee00;
}
.notif.danger{
    border-left: 5px solid #ff0000;
}

</style>