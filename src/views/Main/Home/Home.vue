<template>
  <div class="container-fluid">
    <div class="row">
      <div class="side-left">
        <BaseHeader />
        <div class="body row">
          <BaseNavbar @toggle-active="toggleModal" @toggle-exit="toggleExit" />
          <div class="content">
            <!-- <div class="upper">
          <div class="form-group">
            <select id="sort" class="form-control" @change="setSort">
              <option selected>Sort by</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="idCategory">Category</option>
            </select>
          </div>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Search" @keyup="setSearch">
          </div>
            </div>-->
            <div class="lower">
              <div class="card-box col-4" v-for="item in products" :key="item.id">
                <CardProduct
                  :data="item"
                  @toggle-event="addToCart(item)"
                  :active="checkActive(item.id)"
                  @event-update="setUpdate(item)"
                  @select-product="addToCart(item)"
                  @toggle-delete="toggleDelete"
                />
              </div>
            </div>
            <!-- <CardPagination :data="pagination" @page-event="handlePage" /> -->
          </div>
        </div>
      </div>
      <SideCart />
    </div>
    <ModalAdd
      v-show="modalActive"
      :data="dataModal"
      @close-modal="toggleModal"
      @save-event="addProduct"
      @fire-event="handleEventModal"
    />
    <ModalExit v-show="exitActive" @close-exit="toggleExit" />
    <ModalDelete
      v-show="deleteActive"
      @close-delete="toggleDelete"
      @delete-event="deleteProduct()"
    />
  </div>
</template>

<script>
// component: module
import BaseHeader from "../../../components/BaseHeader";
import BaseNavbar from "../../../components/BaseNavbar";
import CardProduct from "../../../components/Home/CardProduct";
import SideCart from "../../../components/Home/SideCart";
import ModalAdd from "../../../components/Home/ModalAdd";
import ModalExit from "../../../components/ModalExit";
import ModalDelete from "../../../components/ModalDelete";
// import CardPagination from '../../../components/Home/CardPagination'
// package: vuex
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  metaInfo: {
    title: "Home",
    titleTemplate: "%s - Katsir",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },
  name: "PageHome",
  components: {
    BaseHeader,
    BaseNavbar,
    CardProduct,
    SideCart,
    // CardPagination,
    ModalAdd,
    ModalExit,
    ModalDelete,
  },
  data: () => ({
    username: "",
    password: "",
    modalActive: false,
    exitActive: false,
    deleteActive: false,
    deleteId: null,
    dataModal: {
      id: null,
      name: "",
      price: 0,
      image: null,
      category_id: 0,
    },
  }),
  methods: {
    ...mapActions([
      "login",
      "getProduct",
      "insertProduct",
      "editProduct",
      "deleteProduct",
    ]),
    ...mapMutations(["addToCart"]),
    toggleExit() {
      this.exitActive = !this.exitActive;
    },
    toggleDelete(id) {
      this.deleteId = id;
      this.deleteActive = !this.deleteActive;
    },
    toggleModal() {
      this.modalActive = !this.modalActive;
      if (!this.modalActive) {
        this.clearModal();
      }
    },
    clearModal() {
      this.dataModal.id = null;
      this.dataModal.name = "";
      this.dataModal.price = 0;
      this.dataModal.image = null;
      this.dataModal.category_id = 0;
      this.modalActive = false;
    },
    addProduct() {
      const data = new FormData();
      data.append("name", this.dataModal.name);
      data.append("price", this.dataModal.price);
      data.append("image", this.dataModal.image);
      data.append("category_id", this.dataModal.category_id);
      this.insertProduct(data).then(() => {
        this.clearModal();
        this.getProduct();
      });
    },
    updateProduct() {
      const data = new FormData();
      data.append("name", this.dataModal.name);
      data.append("price", this.dataModal.price);
      data.append("image", this.dataModal.image);
      data.append("category_id", this.dataModal.category_id);
      const container = {
        id: this.dataModal.id,
        data: data,
      };
      this.editProduct(container).then(() => {
        this.clearModal();
        this.getProduct();
      });
    },
    setUpdate(data) {
      this.modalActive = true;
      this.dataModal.id = data.id;
      this.dataModal.name = data.name;
      this.dataModal.price = data.price;
      this.dataModal.image = data.image;
      this.dataModal.category_id = data.category_id;
    },
    handleEventModal() {
      this.dataModal.id ? this.updateProduct() : this.addProduct();
    },
    deleteProduct() {
      this.deleteProduct(this.deleteId).then(() => {
        this.deleteId = null;
        this.getProduct();
        alert("Delete berhasil");
      });
    },
    setSearch(e) {
      const url = `?search=${e.target.value}`;
      this.getProduct(url);
    },
    setSort(e) {
      const url = `?sort=${e.target.value}`;
      this.getProduct(url);
    },
    handlePage(number) {
      const url = `?page=${number}`;
      this.getProduct(url);
    },
    checkActive(id) {
      return this.getCart.find((item) => {
        return item.id === id;
      });
    },
  },
  computed: {
    ...mapGetters({
      products: "products",
      pagination: "getPage",
      countCart: "countCart",
      getCart: "getCart",
    }),
  },
  mounted() {
    this.getProduct();
  },
};
</script>

<style scoped>
.side-left {
  width: 70%;
}
.content {
  width: calc(100% - 80px);
  padding: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: rgba(190, 195, 202, 0.3);
  overflow: auto;
}
.upper {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 15px;
  background-color: coral;
}
.lower {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  /* align-items: flex-start; */
  padding-bottom: 50px;
  background-color: tan;
}

.card-box {
  display: flex;
  justify-content: center;
  background-color: teal;
}
</style>
