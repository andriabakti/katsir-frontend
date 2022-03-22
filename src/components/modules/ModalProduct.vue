<template>
  <vue-final-modal v-model="showModal" classes="modal-container" content-class="modal-content">
    <div class="modal_header">
      <h5>{{ data.id ? "Update" : "Add" }} Item</h5>
    </div>
    <div class="modal_body">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          placeholder="Item name"
          :value="data.name"
          @change="handleName"
          name="name"
          id="name"
        />
      </div>
      <div class="form-group">
        <label for="image">Image</label>
        <input type="file" class="form_image" id="image" name="image" ref="image" @change="handleFile" />
        <input
          type="text"
          class="form-control btn_image"
          :value="typeof data.image === 'string' || data.image === null ? data.image : data.image.name"
          placeholder="Choose item image"
          @click="triggerChoose"
        />
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input
          type="text"
          class="form-control"
          :value="data.price !== 0 ? `Rp. ${formatPrice(data.price)}` : ''"
          placeholder="Item price"
          @change="handlePrice"
          name="price"
          id="price"
        />
      </div>
      <div class="form-group selection">
        <label for="category_id">Category</label>
        <select class="form-select" @change="handleCategory" name="category_id">
          <option :selected="data.category_id === ''" disabled hidden>Category</option>
          <option v-for="item in category" :key="item.id" :value="item.id" :selected="data.category_id === item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="modal_action">
      <button type="button" class="btn btn_cancel" @click="eventClose">Cancel</button>
      <button type="button" class="btn btn_confirm" @click="eventConfirm">
        {{ data.id ? "Update" : "Add" }}
      </button>
    </div>
  </vue-final-modal>
</template>

<script>
// package: vuex
import { mapGetters, mapActions } from "vuex";
// util: numeral
import { formatPrice } from "@/utils/numeral";

export default {
  name: "ModalProduct",
  props: {
    data: Object,
    show: Boolean,
    text: String,
    textBtn: String,
    eventClose: Function,
    eventConfirm: Function,
    eventClear: Function,
  },
  data: () => ({
    formatPrice,
  }),
  computed: {
    ...mapGetters({
      category: "getterCategory",
    }),
    showModal: {
      get() {
        return this.show;
      },
      set(value) {
        this.$emit("update:show", value);
        this.eventClear();
      },
    },
  },
  methods: {
    ...mapActions(["getCategory"]),
    triggerChoose() {
      const chooseRef = this.$refs.image;
      chooseRef.click();
    },
    handleName(e) {
      // eslint-disable-next-line vue/no-mutating-props
      this.data.name = e.target.value;
    },
    handleFile(e) {
      // eslint-disable-next-line vue/no-mutating-props
      this.data.image = e.target.files[0];
    },
    handlePrice(e) {
      let result;
      const input = e.target.value.replace(/\D+/g, "");
      if (isNaN(input) || input === "") {
        result = 0;
        // eslint-disable-next-line vue/no-mutating-props
        this.data.price = result;
      } else {
        result = parseInt(input);
        // eslint-disable-next-line vue/no-mutating-props
        this.data.price = result;
      }
    },
    handleCategory(e) {
      // eslint-disable-next-line vue/no-mutating-props
      this.data.category_id = e.target.value;
    },
  },
  mounted() {
    this.getCategory();
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
  width: 50%;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  padding: 20px 30px 15px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #fff;
}
.modal_header {
  margin-bottom: 30px;
}
.modal_header > h5 {
  color: #000000;
  font-size: 25px;
  font-weight: bold;
}

.modal_body {
  margin-bottom: 40px;
}
.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.form-group > label {
  width: 25%;
  color: #000000;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
}
.form-group > input {
  height: 45px;
  border-radius: 10px;
}
.form-control {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}
.form_image {
  display: none;
}
.btn_image {
  cursor: pointer;
}
.selection > label {
  width: 20%;
}
.selection > select {
  height: 45px;
  border-radius: 10px;
}
.form-select {
  width: min-content;
  background-image: url("@/assets/icons/IconArrow.svg");
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.modal_action {
  display: flex;
  justify-content: flex-end;
}
.modal_action > button {
  width: 120px;
  border-radius: 10px;
  font-size: 20px;
  color: #ffffff;
}

.btn:hover {
  background-color: #ffc107;
  color: #000000;
  font-weight: 600;
}
.btn_cancel {
  background-color: #f24f8a;
}

.btn_confirm {
  margin-left: 20px;
  background-color: #57cad5;
}
</style>
