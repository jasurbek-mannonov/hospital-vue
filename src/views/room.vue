<template>
    <div class="box mt-20">
      <div class="d-flex align-items-center justify-content-between">
        <div class="title">Xonalar</div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>T/R</th>
            <th>Xona raqami</th>
            <th>Bo'lim</th>
            <th>Sig'im</th>
            <th>Yaratilgan vaqt</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="room, index of rooms" :key="room._id">
              <td>{{index + 1}}</td>
              <td>{{ room.number }}</td>
              <td>{{ room.department }}</td>
              <td>{{ room.maxcount }}</td>
              <td>{{ room.createdTime }}</td>
              <td>
                <button @click="remove(room._id)">
                  <img src="../assets/img/remove.svg" alt="remove icon">
                </button>
              </td>
              <td>
                <button @click="edit(room._id)">
                  <img src="../assets/img/edit.svg" alt="edit icon">
                </button>
              </td>
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
        <h4 class="text-center mb-20">{{ editToggle ? `Yangi ma'lumot qo'shish` : `Xonani tahrirlash` }}</h4>
        <form id="depart" @submit.prevent="editToggle ? add() : save()">
          <input
            class="input mb-10" 
            type="number"
            placeholder="Xona raqamini kiriting"
            v-model="room.number"
          />
          <input
            class="input mb-10" 
            type="number"
            placeholder="Xona sig'imini kiriting"
            v-model="room.maxcount"
          />
          <select 
            class="input"
            v-model="room.department">
            <option value="">Ro'yxatdan tanlang</option>
                <option 
                    v-for="department of departments" 
                    :key="department._id" 
                    :value="department._id">
                    {{ department.title }}
                </option>
          </select>
        </form>
        <div class="modal__footer mt-20">
          <button class="btn danger" @click="clear()">Bekor qilish</button>
          <button class="btn success btn__add" v-if="editToggle" @click="add()">
            Kiritish
          </button>
          <button class="btn success btn__edit hide" v-else @click="save()">
            Saqlash
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data: () => ({
      toggle: false,
      editToggle: true,
      room: {
        department: ''
      }
    }),
    computed: {
      ...mapGetters([
        'rooms',
        'departments'
      ])
    },
    methods: {
      ...mapActions([
        'getAllRooms',
        'addRoom',
        'deleteRoom',
        'getRoom',
        'saveRoom',
        'getAllDepartments'
      ]),
      async add() {
        if (this.room.number && this.room.maxcount && this.room.department) {
          this.addRoom(this.room)
          this.clear()
        } else {
          this.$store.commit('SET_NOTIF', {
            type: 'warning',
            text: "Barcha maydonlarni to'ldiring!"
          })
        }
      },
      save(){
        this.saveRoom(this.room)
        this.clear()
      },
      async edit(id){
        let res = await this.getRoom(id)
        if(res.status == 200){
          this.room = {...res.data}
          this.room.department = this.room?.department?._id || ''
          this.toggle = true
          this.editToggle = false
        }
      },
      remove(id){
        if(confirm("Qaroringiz qat'iymi?")){
          this.deleteRoom(id)
        }
      },
      clear(){
        this.toggle = false
        this.room = {
            department: ''
        }
        this.editToggle = true
      }
    },
    mounted() {
      this.getAllRooms()
      this.getAllDepartments()
    }
  }
  </script>
  
  <style lang="scss"></style>
  