<template>
  <vue-final-modal
    v-model="showModal"
    classes="modal-container"
    content-class="modal-content"
  >
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">
        {{ data.id ? "Update" : "Add" }} Product
      </h5>
      <button type="button" class="close btn" @click="eventClose" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form>
        <div class="form-group">
          <label for="name">Product Name</label>
          <input
            type="text"
            :value="data.name"
            class="form-control"
            id="name"
            placeholder="Product name"
          />
        </div>
        <div class="form-group">
          <label for="price">Price</label>
          <input
            type="text"
            :value="data.price"
            class="form-control"
            id="price"
            placeholder="Price"
          />
        </div>
        <div class="form-group">
          <label for="category">Category</label>
          <select id="sort" class="form-control" @change="setCategory">
            <option selected>Choose Category</option>
            <option value="1">Coffe</option>
            <option value="2">Dessert</option>
            <option value="3">Main Dish</option>
            <option value="4">Juice</option>
          </select>
        </div>
        <div class="form-group">
          <label for="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            @change="handleFile"
            placeholder="Another input"
          />
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" @click="eventClose">Close</button>
      <button type="button" class="btn btn-primary" @click="eventConfirm">
        {{ data.id ? "Update" : "Add" }}
      </button>
    </div>
  </vue-final-modal>
</template>

<script>
export default {
  name: "ModalAdd",
  props: {
    data: Object,
    show: Boolean,
    text: String,
    textBtn: String,
    eventClose: Function,
    eventConfirm: Function,
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
  methods: {
    handleFile(e) {
      // eslint-disable-next-line vue/no-mutating-props
      this.data.image = e.target.files[0];
    },
    setCategory(e) {
      // eslint-disable-next-line vue/no-mutating-props
      this.data.idCategory = e.target.value;
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
</style>
