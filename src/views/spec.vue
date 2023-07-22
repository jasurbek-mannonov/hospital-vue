<template>
  <div class="box mt-20">
    <div class="d-flex align-items-center justify-content-between">
      <div class="title">Mutaxassisliklar</div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>T/R</th>
          <th>Nom</th>
          <th>Yaratilgan vaqt</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(spec, index) of specs" :key="spec._id">
          <td>{{ index + 1 }}</td>
          <td>{{ spec.title }}</td>
          <td>{{ spec.createdTime }}</td>
          <td>
            <button @click="remove(spec._id)">
              <img src="../assets/img/remove.svg" alt="remove icon" />
            </button>
          </td>
          <td>
            <button @click="edit(spec._id)">
              <img src="../assets/img/edit.svg" alt="edit icon" />
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
      <h4 class="text-center mb-20">
        {{
          editToggle
            ? `Yangi mutaxassislik qo'shish`
            : `Mutaxassislikni tahrirlash`
        }}
      </h4>
      <form id="depart" @submit.prevent="editToggle ? add() : save()">
        <input
          class="input"
          type="text"
          placeholder="Mutaxassislik nomini kiriting"
          v-model="spec.title"
          @keypress.enter="editToggle ? add() : save()"
        />
      </form>
      <div class="modal__footer mt-20">
        <button class="btn danger" @click="clear">Bekor qilish</button>
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
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    toggle: false,
    editToggle: true,
    spec: {},
  }),
  computed: {
    ...mapGetters(["specs"]),
  },
  methods: {
    ...mapActions([
      "getAllSpecs",
      "addSpec",
      "deleteSpec",
      "getSpec",
      "saveSpec",
    ]),
    async add() {
      if (this.title) {
        this.addSpec(this.spec);
        this.clear();
      } else {
        this.$store.commit("SET_NOTIF", {
          type: "warning",
          text: "Mutaxassislik nomini kiriting!",
        });
      }
    },
    save() {
      this.saveSpec(this.spec);
      this.clear();
    },
    async edit(id) {
      let res = await this.getSpec(id);
      if (res.status == 200) {
        this.spec = { ...res.data };
        this.toggle = true;
        this.editToggle = false;
      }
    },
    remove(id) {
      if (confirm("Qaroringiz qat'iymi?")) {
        this.deleteSpec(id);
      }
    },
    clear() {
      this.toggle = false,
      this.spec = {},
      this.editToggle = true
    },
  },
  mounted() {
    this.getAllSpecs();
  },
};
</script>

<style lang="scss"></style>
