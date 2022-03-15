<template>
  <vue-final-modal
    v-model="showModal"
    classes="modal-container"
    content-class="modal-content"
  >
    <div class="modal_header">
      <h5 class="modal-title" id="exampleModalLabel">
        {{ data.id ? "Update" : "Add" }} Item
      </h5>
    </div>
    <div class="modal_body">
      <form>
        <div class="form-group">
          <label for="name">Product Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="Product name"
            :value="data.name"
            @change="handleName"
            name="name"
            id="name"
          />
        </div>
        <div class="form-group">
          <label for="image">Image</label>
          <input
            type="file"
            class="form_image"
            id="image"
            name="image"
            ref="image"
            @change="handleFile"
          />
          <input
            type="text"
            class="form-control"
            :value="
              typeof data.image === 'string' || data.image === null
                ? data.image
                : data.image.name
            "
            placeholder="Choose image"
            @click="triggerChoose"
          />
        </div>
        <div class="form-group">
          <label for="price">Price</label>
          <input
            type="text"
            class="form-control"
            :value="data.price !== 0 ? `Rp. ${formatPrice(data.price)}` : ''"
            placeholder="Price"
            @change="handlePrice"
            name="price"
            id="price"
          />
        </div>
        <div class="form-group">
          <label for="category">Category</label>
          <select class="form-select" @change="handleCategory" name="category_id">
            <option :selected="data.category_id === ''" disabled hidden>Category</option>
            <option
              v-for="item in category"
              :key="item.id"
              :value="item.id"
              :selected="data.category_id === item.id"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn_cancel" @click="eventClose">Close</button>
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
.form-control {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}
.form_image {
  display: none;
}
.form-select {
  width: min-content;
  background-image: url("@/assets/icons/IconArrow.svg");
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}

.modal-footer > button {
  color: #ffffff;
}
.btn_cancel {
  background-color: #f24f8a;
}

.btn_confirm {
  background-color: #57cad5;
}
</style>
