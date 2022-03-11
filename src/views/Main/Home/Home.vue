<template>
  <div class="container-fluid">
    <div class="row wrapper">
      <div class="side-left">
        <BaseHeader />
        <div class="row">
          <BaseNavbar @toggle-active="toggleModal" />
          <div class="section-main">
            <!-- <div class="side-upper">
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
            <div class="side-lower">
              <div class="card-box col-md-4" v-for="item in product" :key="item.id">
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
    <ModalDelete
      v-show="deleteActive"
      @close-delete="toggleDelete"
      @delete-event="deleteProduct()"
    />
  </div>
</template>

<script>
// component: module
import BaseHeader from "@/components/BaseHeader";
import BaseNavbar from "@/components/BaseNavbar";
import CardProduct from "@/components/Home/CardProduct";
import SideCart from "@/components/Home/SideCart";
import ModalAdd from "@/components/Home/ModalAdd";
import ModalDelete from "@/components/ModalDelete";
// import CardPagination from '@/components/Home/CardPagination'
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
    // ModalConfirm,
    ModalDelete,
  },
  data: () => ({
    username: "",
    password: "",
    modalActive: false,
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
  computed: {
    ...mapGetters({
      product: "getterProduct",
      // pagination: "getterPage",
      cart: "getterCart",
    }),
  },
  methods: {
    ...mapMutations(["addToCart"]),
    ...mapActions(["getProduct", "insertProduct", "editProduct", "deleteProduct"]),
    toggleModal() {
      this.modalActive = !this.modalActive;
      if (!this.modalActive) {
        this.clearModal();
      }
    },
    handleEventModal() {
      this.dataModal.id ? this.updateProduct() : this.addProduct();
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
    setUpdate(data) {
      this.modalActive = true;
      this.dataModal.id = data.id;
      this.dataModal.name = data.name;
      this.dataModal.price = data.price;
      this.dataModal.image = data.image;
      this.dataModal.category_id = data.category_id;
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
    clearModal() {
      this.dataModal.id = null;
      this.dataModal.name = "";
      this.dataModal.price = 0;
      this.dataModal.image = null;
      this.dataModal.category_id = 0;
      this.modalActive = false;
    },
    toggleDelete(id) {
      this.deleteId = id;
      this.deleteActive = !this.deleteActive;
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
      return this.cart.find((item) => {
        item.id === id;
      });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>

<style scoped>
.wrapper {
  max-height: 100vh;
}
.side-left {
  width: 75%;
}
.section-main {
  display: flex;
  flex-direction: column;
  width: calc(100% - 80px);
  height: calc(100vh - 80px);
  background-color: rgba(190, 195, 202, 0.3);
  padding: 0;
  overflow: auto;
}
.side-upper {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 15px;
  background-color: coral;
}
.side-lower {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  /* align-items: flex-start; */
  padding-bottom: 50px;
  /* background-color: tan; */
}

.card-box {
  display: flex;
  justify-content: center;
  /* background-color: teal; */
}
</style>
