<template>
  <div class="container-fluid">
    <BaseNav />
    <div class="body row">
      <BaseMenu @toggle-active="toggleModal" @toggle-exit="toggleExit" />
      <div class="content col-md-7">
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
          <CardProduct
            v-for="item in products"
            :key="item.id"
            :data="item"
            @toggle-event="addCart(item)"
            :active="checkActive(item.id)"
            @event-update="setUpdate(item)"
            @select-product="addCart(item)"
            @toggle-delete="toggleDelete"
          />
        </div>
        <!-- <CardPagination :data="pagination" @page-event="handlePage" /> -->
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
import BaseNav from "../../../components/BaseNav";
import BaseMenu from "../../../components/BaseMenu";
import CardProduct from "../../../components/Home/CardProduct";
import SideCart from "../../../components/Home/SideCart";
import ModalAdd from "../../../components/Home/ModalAdd";
import ModalExit from "../../../components/ModalExit";
import ModalDelete from "../../../components/ModalDelete";
// import CardPagination from '../../../components/Home/CardPagination'
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
    BaseNav,
    BaseMenu,
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
      idCategory: 0,
    },
  }),
  methods: {
    ...mapActions([
      "login",
      "getProducts",
      "insertProducts",
      "editProducts",
      "deleteProducts",
    ]),
    ...mapMutations(["addCart"]),
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
      this.dataModal.idCategory = 0;
      this.modalActive = false;
    },
    addProduct() {
      const data = new FormData();
      data.append("name", this.dataModal.name);
      data.append("price", this.dataModal.price);
      data.append("image", this.dataModal.image);
      data.append("idCategory", this.dataModal.idCategory);
      this.insertProducts(data).then(() => {
        this.clearModal();
        this.getProducts();
      });
    },
    updateProduct() {
      const data = new FormData();
      data.append("name", this.dataModal.name);
      data.append("price", this.dataModal.price);
      data.append("image", this.dataModal.image);
      data.append("idCategory", this.dataModal.idCategory);
      const container = {
        id: this.dataModal.id,
        data: data,
      };
      this.editProducts(container).then(() => {
        this.clearModal();
        this.getProducts();
      });
    },
    setUpdate(data) {
      this.modalActive = true;
      this.dataModal.id = data.id;
      this.dataModal.name = data.name;
      this.dataModal.price = data.price;
      this.dataModal.image = data.image;
      this.dataModal.idCategory = data.idCategory;
    },
    handleEventModal() {
      this.dataModal.id ? this.updateProduct() : this.addProduct();
    },
    deleteProduct() {
      this.deleteProducts(this.deleteId).then(() => {
        this.deleteId = null;
        this.getProducts();
        alert("Delete berhasil");
      });
    },
    setSearch(event) {
      const url = `?search=${event.target.value}`;
      this.getProducts(url);
    },
    setSort(event) {
      const url = `?sort=${event.target.value}`;
      this.getProducts(url);
    },
    handlePage(number) {
      const url = `?page=${number}`;
      this.getProducts(url);
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
    this.getProducts();
  },
};
</script>

<style scoped>
.content {
  height: 85vh;
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
  align-items: flex-start;
  justify-content: space-evenly;
  padding-bottom: 50px;
}
</style>
