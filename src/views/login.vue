<template>
  <div class="auth">
    <div class="box" v-if="toggle">
      <h4 class="mb-20">Tizimga kirish</h4>
      <form class="form" name="login" @submit.prevent="postLogin()">
        <div class="mb-20">
          <input
            class="input"
            type="text"
            placeholder="Login"
            v-model="user.login"
          />
        </div>
        <div class="mb-20">
          <input
            class="input"
            type="password"
            placeholder="Parol"
            v-model="user.password"
          />
        </div>
      </form>
      <a class="link" href="#" @click.prevent="toggle = false"
        >Ro`yxatdan o`tish</a
      >
      <button class="btn success" @click="postLogin()">Kirish</button>
    </div>

    <div class="box" v-else>
      <h4 class="mb-20">Ro'yxatdan o'tish</h4>
      <form class="form" @submit.prevent="postReg()">
        <div class="mb-20">
          <input
            class="input"
            type="text"
            placeholder="Login"
            v-model="user.login"
          />
        </div>
        <div class="mb-20">
          <input
            class="input"
            type="password"
            placeholder="Parol"
            v-model="user.password"
          />
        </div>
        <div class="mb-20">
          <input
            class="input"
            type="password"
            placeholder="Parolni takrorlang"
            v-model="user.checkpassword"
          />
        </div>
      </form>
      <a class="link" href="#" @click.prevent="toggle = true">Tizimga kirish</a>
      <button class="btn success" @click="postReg()">Kirish</button>
    </div>
  </div>
</template>

<script>
import notif from '../components/notif.vue'
import { mapMutations, mapActions } from 'vuex';

    export default{
      emits: ['successLogin'],
        data: () => ({
            user: {},
            notif: {},
            name: '',
            toggle: true,
        }),
        methods:{
          ...mapMutations(['SET_NOTIF']),
          ...mapActions(['register', 'login']),

            async postLogin(){
              if (this.checkFields()){
                this.login(this.user)
              }
          },

          async postReg(){
            if (this.checkFields()){  
              if(this.user.password !== this.user.checkpassword){
                this.SET_NOTIF({
                  type: 'warning',
                  text: "Parollar bir xil bo'lishi kerak"
                })
                return false
              }
              let res = await this.register(this.user)
              if(res.status == 200){
                if(res.data == 'exist'){
                  this.SET_NOTIF({
                  type: 'warning',
                  text: "Bunday foydalanuvchi tizimda allaqachon mavjud!"
              })
                }
              }
              if(res.status == 201){
                console.log(res.data);
                if(res.data == 'success'){
                  this.SET_NOTIF({
                  type: 'success',
                  text: "Ro'yxatdan muvaffaqiyatli o'tdingiz. Iltimos, avtorizatsiyadan o'ting"
              })
              this.toggle = true
                }
               
              }
            }
          },

          checkFields(){
            if(!this.user.login || !this.user.password){
              this.SET_NOTIF({
                type: 'warning',
                text: "Barcha maydonlarni to'ldiring"
              })
              return false
            }
            return true
          }
        }
    }
</script>

<style lang="scss">
.auth {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f6f8f8;
  .box {
    width: 642px;
    left: 129px;
    top: 44px;
    background: #ffffff;
    box-shadow: 0px 12px 16px rgba(125, 125, 125, 0.25);
    border-radius: 8px;
    max-width: 100%;
    padding: 45px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  form {
    max-width: 268px;
  }
  .link {
    font-size: 11px;
    text-decoration: underline;
    display: inline-block;
    margin-bottom: 14px;
  }
}

h1 {
  color: green;
}
</style>
