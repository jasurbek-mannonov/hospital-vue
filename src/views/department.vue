<template>
  <div class="box mt-20">
    <div class="d-flex align-items-center justify-content-between">
      <div class="title">Bo'limlar</div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>T/R</th>
          <th>Nom</th>
          <th>Yaratilgan vaqt</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="department, index of departments" :key="department._id">
            <td>{{index + 1}}</td>
            <td>{{ department.title }}</td>
            <td>{{ department.createdTime }}</td>
            <td></td>
        </tr>
      </tbody>
    </table>
    <ul class="pagination">
      <li><img src="@/assets/img/left.png" alt="arrow-left" /></li>
      <li class="active">1</li>
      <li>2</li>
      <li>3</li>
      <li><img src="@/assets/img/right.png" alt="arrow-right" /></li>
    </ul>
  </div>

  <button class="add" @click="toggle = true">
    <img src="@/assets/img/doctors.svg" alt="doctors icon" />
  </button>

  <div :class="`modal ${toggle ? 'open' : ''}`">
    <div class="modal__box">
      <h4 class="text-center mb-20">Yangi ma'lumot qo'shish</h4>
      <form id="depart" @submit.prevent="add()">
        <input
          class="input"
          type="text"
          placeholder="Bo'lim nomini kiriting"
          v-model="title"
          @keypress.enter="add( )"
        />
      </form>
      <div class="modal__footer mt-20">
        <button class="btn danger" @click="toggle = false">Bekor qilish</button>
        <button class="btn success btn__add" v-if="editToggle" @click="save()">
          Kiritish
        </button>
        <button class="btn success btn__edit hide" v-else @click="add()">
          Saqlash
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    toggle: false,
    editToggle: false,
    title: "",
    token: '',
    notif: {}
  }),
  computed: {
    ...mapGetters([
      'departments'
    ])
  },
  methods: {
    async add() {
      if (this.title) {
        let res = await axios.post(`${url}/department`, {
          title: this.title,
        },{
            headers: {
                'authorization' : `Bearer ${this.token}`
            }
        })
        if (res.status == 201) {
          this.notif = {
            type: "success",
            text: "Yangi bo\'lim muvaffaqiyatli qo'shildi",
          }
          this.toggle = false
          this.title = ''
          this.departments = [res.data, ...this.departments]
          setTimeout(() => {
            this.notif = {};
          }, 1200);
        }
      } else {
        this.notif = {
          type: "warning",
          text: "Bo'lim nomini kiriting!",
        };
        setTimeout(() => {
          this.notif = {};
        }, 1200);
      }
    },
  mounted() {
    this.$store.dispatch('department/getAllDepartments')
  }
}
}
</script>

<style lang="scss"></style>
