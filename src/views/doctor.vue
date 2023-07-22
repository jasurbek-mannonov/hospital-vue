<template>
    <div class="box mt-20">
      <div class="d-flex align-items-center justify-content-between">
        <div class="title">Shifokorlar</div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>T/R</th>
            <th>Shifokor raqami</th>
            <th>Bo'lim</th>
            <th>Sig'im</th>
            <th>Yaratilgan vaqt</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doctor, index of rooms" :key="doctor._id">
              <td>{{index + 1}}</td>
              <td>{{ doctor.number }}</td>
              <td>{{ doctor.department }}</td>
              <td>{{ doctor.maxcount }}</td>
              <td>{{ doctor.createdTime }}</td>
              <td>
                <button @click="remove(doctor._id)">
                  <img src="../assets/img/remove.svg" alt="remove icon">
                </button>
              </td>
              <td>
                <button @click="edit(doctor._id)">
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
  
    <button class="add" @click="$store.commit('SET_DOCTOR_TOGGLE', true)">
      <img src="@/assets/img/doctors.svg" alt="doctors icon" />
    </button>
    <doctorModal />
  </template>
  
  <script>
  import doctorModal from '../components/doctorModal.vue'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: {
        doctorModal
    },
    data: () => ({
      toggle: false,
      editToggle: true,
    }),
    computed: {
      ...mapGetters([
        'doctors'
      ])
    },
    methods: {
      ...mapActions([
        'getAllDoctors',
        'deleteDoctor',
        'getDoctor',
        'getAllDepartments',
        'getAllSpecs'
      ]),
      async edit(id){
        let res = await this.getDoctor(id)
        if(res.status == 200){
        //   this.doctor = {...res.data}
        //   this.doctor.department = this.doctor?.department?._id || ''
        //   this.toggle = true
        //   this.editToggle = false
        this.$store.commit('SET_EDIT_DOCTOR_TOGGLE', false) //save buttonni ochadi
        this.$store.commit('SET_DOCTOR_TOGGLE', true) //modalni ochadi
        }
      },
      remove(id){
        if(confirm("Qaroringiz qat'iymi?")){
          this.deleteDoctor(id)
        }
      }
    },
    mounted() {
      this.getAllDoctors()
      this.getAllDepartments()
      this.getAllSpecs()
    }
  }
  </script>
  
  <style lang="scss"></style>
  