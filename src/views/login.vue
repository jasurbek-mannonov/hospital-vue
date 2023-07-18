<template>
  <div class="auth">
    <div class="box">
      <h4 class="mb-20">Tizimga kirish</h4>
      <form class="form" name="login" @submit.prevent="postLogin()">
        <div class="mb-20">
          <input class="input" type="text" placeholder="Login" v-model="login"/>
        </div>
        <div class="mb-20">
          <input class="input" type="password" placeholder="Parol" v-model="password"/>
        </div>
      </form>

      <!-- <a class="link" href="#">Ro`yxatdan o`tish</a> -->
      <button class="btn success" @click="postLogin()">Kirish</button>
    </div>
  </div>
  <notif :text="notif.text" :type="notif.type"/>
</template>

<script>
import notif from '../components/notif.vue'


    export default{
      emits: ['successLogin'],
      components: {
        notif
      },
        data: () => ({
            login: '',
            password: '',
            notif: {},
            name: ''
        }),
        methods:{
            async postLogin(){
              if(this.login && this.password){
              this.$store.dispatch('login', {
                login: this.login,
                password: this.password
              })
                // if(this.login && this.password){
                //     let res = await axios.post(`${url}/auth/login`,{
                //         login: this.login,
                //         password: this.password
                //     }).catch(e => {
                //        this.notif= {
                //         type: 'danger',
                //         text: msgs[e.response.data]
                //   }
                //   setTimeout(() => {
                //     this.notif = {}
                //     console.clear()
                //   },1500)
                // })
                //   if(res.status == 200){
                //     let {token, user} = res.data
                //     this.$cookies.set('hospital-token',token)
                //     this.$cookies.set('hospital-user',user)
                        
                //     this.$emit('successLogin')     
                //     }
                // }
            }
          }
        },
        mounted(){
          this.$store.dispatch('posts/getPosts')
          this.$store.dispatch('album/getAllAlbums')
        },
        computed: {
          posts(){
            return this.$store.getters.posts
          }
      },
    }
</script>

<style lang="scss">
    .auth{
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F6F8F8;
    .box{
      width: 642px;
      height: 317px;
      left: 129px;
      top: 44px;
      background: #FFFFFF;
      box-shadow: 0px 12px 16px rgba(125, 125, 125, 0.25);
      border-radius: 8px;
      max-width: 100%;
      padding: 45px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    form{
      max-width: 268px;
    }
    .link{
        font-size: 11px;
        text-decoration: underline;
        display: inline-block;
        margin-bottom: 14px;
    }
}

h1{
  color: green;
}
</style>
