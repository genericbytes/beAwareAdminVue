<template>
  <v-col>
    <v-dialog
      v-model="dialog"
      transition="dialog-top-transition"
      scrollable
      width="1024px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark class="mb-2 teal darken-4" v-bind="attrs" v-on="on">
          Add Category
        </v-btn>
      </template>
      <template v-if="dialog" v-slot:default="dialog">
        <v-card>
          <v-toolbar color="teal darken-4" dark class="mb-2">
            <span v-if="isEdit == false">Add Category </span>
            <span v-else>Edit Category</span>
          </v-toolbar>
          <v-card-text>
            <category @closeIt="closeModel"></category>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
    <v-card>
      <v-card-title>
        Category
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :loading="loading"
        loading-text="Loading... Please wait"
      >
        <template v-slot:item.createdDateTime="{ item }">
          {{ new Date(item.createdDateTime).toLocaleString() }}
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon class="mr-2 edit" @click.stop="editItem(item.id)">
            mdi-pencil
          </v-icon>
          <v-icon @click="warningModel(item.id)" class="delete">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <template>
      <v-dialog v-model="delDialog" max-width="400">
        <v-card>
          <v-card-title class="text-h5 orange lighten-1 text-white">
            Warning
          </v-card-title>

          <v-card-text class="pt-10 text-h6">
            Do you want to delete entry?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="closeWarningModel()">
              Disagree
            </v-btn>

            <v-btn color="deep-orange darken-4" text @click="deleteCategory()">
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-col>
</template>
<script>
import { mapGetters } from "vuex";
import category from "../../components/Category/category.vue";
export default {
  components: {
    category,
  },
  data() {
    return {
      isAuthenticated: false,
      loading: true,
      itemId: "",
      isEdit: false,
      dialog: false,
      delDialog: false,
      search: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Created Date & Time", value: "createdDateTime" },
        { text: "Action", value: "action" },
      ],
      items: [],
    };
  },
  methods: {
    async getAllCategories() {
      await this.$store
        .dispatch("getCategories")
        .then(() => {
          this.items = this.getCategories;
          this.loading = false;
        })
        .catch((ex) => {
          console.error(ex);
        });
    },
    editItem(id) {
      this.$store
        .dispatch("getCategoryById", id)
        .then(() => {
          this.dialog = true;
          this.isEdit = true;
        })
        .catch((ex) => {
          this.isfetching = false;
          console.log(ex);
        });
    },
    closeModel() {
      this.dialog = false;
      this.isEdit = false;
      this.getAllCategories();
    },
    warningModel(id) {
      this.delDialog = true;
      this.itemId = id;
    },
    closeWarningModel() {
      this.delDialog = false;
      this.itemId = "";
    },

    async deleteCategory() {
      await this.$store.dispatch("delCategory", this.itemId).then(() => {
        this.getAllCategories();
        this.delDialog = false;
        this.itemId = "";
      });
    },
    async handleIsAuthenticated() {
      await this.$store
        .dispatch(
          "handleIsAuthenticated",
          window.localStorage.getItem("isLoggedInAdminBeAware"),
        )
        .then(() => {
          this.isAuthenticated =
            this.getIsAuthenticated === null ? false : this.getIsAuthenticated;
        });
    },
  },
  mounted() {
    this.handleIsAuthenticated().then(() => {
      if (this.isAuthenticated) {
        this.getAllCategories();
      }
    });
  },
  computed: {
    ...mapGetters(["getIsAuthenticated", "getCategories"]),
  },
};
</script>
