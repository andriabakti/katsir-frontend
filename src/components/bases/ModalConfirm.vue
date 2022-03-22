<template>
  <vue-final-modal v-model="showModal" classes="modal-container" content-class="modal-content">
    <div class="modal-body">
      <p>Are you sure want to {{ text }} ?</p>
    </div>
    <div class="modal-action">
      <button type="button" class="btn btn-cancel" @click="eventClose">Cancel</button>
      <button type="button" class="btn btn-confirm" @click="$emit('event-confirm')">
        {{ textBtn }}
      </button>
    </div>
  </vue-final-modal>
</template>

<script>
export default {
  name: "ModalConfirm",
  props: {
    show: Boolean,
    text: String,
    textBtn: String,
    eventClose: Function,
  },
  computed: {
    showModal: {
      get() {
        return this.show;
      },
      set(value) {
        this.$emit("update:show", value);
      },
    },
  },
};
</script>

<style scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  /* position: relative; */
  display: flex;
  flex-direction: column;
  width: 40%;
  max-height: 90%;
  /* margin: 0 30%; */
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}

.modal-body {
  text-align: center;
  font-size: 20px;
  /* flex-grow: 1; */
  /* overflow-y: auto; */
}
.modal-action {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 1rem 0 0;
}
.modal-action > button {
  width: 150px;
  height: 50px;
  border-radius: 5px;
  font-weight: 500;
  color: #ffffff;
}
.btn:hover {
  background-color: #ffc107;
  color: #000000;
}
.btn-cancel {
  background-color: #f24f8a;
}
.btn-confirm {
  background-color: #57cad5;
}
</style>
