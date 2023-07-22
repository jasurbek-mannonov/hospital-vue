<template>
  <div :class="`modal ${doctorToggle ? 'open' : ''}`">
    <div class="modal__box">
      <h4 class="text-center mb-20">
        {{ editDoctorToggle ? `Yangi ma'lumot qo'shish` : `Xonani tahrirlash` }}
      </h4>
      <form id="depart" @submit.prevent="editDoctorToggle ? add() : save()">
        <input
          class="input mb-10"
          name="title"
          type="text"
          placeholder="Ism-familiya"
          v-model="doctor.name"
        />
        <input
          class="input mb-10"
          name="phone"
          type="number"
          placeholder="Telefon raqami"
          v-model="doctor.phone"
        />
        <select class="input mb-10" v-model="doctor.spec">
          <option value="">Mutaxassislikni tanlang</option>
          <option
            v-for="spec of specs"
            :key="spec._id"
            :value="spec._id"
          >
            {{ spec.title }}
          </option>
        </select>
        <input
          class="input mb-10"
          name="birthdate"
          type="date"
          placeholder="Tug'ilgan yil/oy/kun"
          v-model="doctor.bdate"
        />
        <input
          class="input mb-10"
          name="education"
          type="number"
          placeholder="Qancha o'qigan"
          v-model="doctor.education"
        />
        <select 
          @change="filterDistricts"
          class="input mb-10" 
          v-model="doctor.region"
          >
          <option value="">Viloyatni tanlang</option>
          <option
            v-for="place of regions"
            :key="place.id"
            :value="place.id"
          >
            {{ place.name }}
          </option>
        </select>
        <select class="input mb-10" v-model="doctor.district">
          <option value="">Tumanni/shaharni tanlang</option>
          <option
            v-for="place of listDistricts"
            :key="place.id"
            :value="place.id"
          >
            {{ place.name }}
          </option>
        </select>
      </form>
      <div class="modal__footer mt-20">
        <button class="btn danger" @click="clear()">Bekor qilish</button>
        <button class="btn success btn__add" v-if="editDoctorToggle" @click="add()">
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
import places from '../db/places'
export default {
  data: () => ({
    regions: places?.regions,
    districts: places?.districts,
    listDistricts: [],
    doctor: {
        spec: '',
        region: '',
        district: ''
    },
  }),
  computed: {
    ...mapGetters([
        "departments", 
        "specs",
        "doctorToggle",
        "editDoctorToggle"
    ])
  },
    methods: {
        ...mapActions([
            'addDoctor',
            'saveDoctor',           
        ]),
        filterDistricts(){
            if(this.doctor.region){
                this.listDistricts = this.districts.filter(district => district.region_id == this.doctor.region)
            }
        },
        async add() {
        if (this.doctor.number && this.doctor.maxcount && this.doctor.department) {
          this.addDoctor(this.doctor)
          this.clear()
        } else {
          this.$store.commit('SET_NOTIF', {
            type: 'warning',
            text: "Barcha maydonlarni to'ldiring!"
          })
        }
      },
      save(){
        this.saveDoctor(this.doctor)
        this.clear()
      },
      clear(){
        this.$store.commit('SET_DOCTOR_TOGGLE', false) //modalni ochib-yopadi
        this.doctor = {
            department: ''
        }
        this.$store.commit('SET_EDIT_DOCTOR_TOGGLE', true) //save va add buttonlarini toggle qiladi
      }
    },
};
</script>

<style lang="scss"></style>
