<template>
  <v-col>
    <v-dialog
      v-model="dialog"
      transition="dialog-top-transition"
      scrollable
      width="1024px"
    >
      <template v-if="dialog" v-slot:default="dialog">
        <v-card>
          <v-toolbar color="teal darken-4" dark class="mb-2">
            <span><i class="fas fa-user mr-2"></i>News</span>
          </v-toolbar>
          <v-card-text>
            <news @closeIt="closeModel"></news>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
    <v-card>
      <v-card-title>
        News
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :loading="loading"
        loading-text="Loading... Please wait"
      >
        <template v-slot:item.image="{ item }">
          <v-avatar size="30px">
            <img :src="item.image" :alt="item.title" />
          </v-avatar>
        </template>
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

            <v-btn color="deep-orange darken-4" text @click="deleteNews()">
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
import news from "../../components/News/news.vue";
export default {
  components: {
    news,
  },
  data() {
    return {
      isAuthenticated: false,
      loading: true,
      itemId: "",
      dialog: false,
      delDialog: false,
      search: "",
      headers: [
        {
          text: "Image",
          align: "start",
          sortable: false,
          value: "image",
        },
        { text: "Title", value: "title" },
        { text: "Category Name", value: "categoryName" },
        { text: "Add By User", value: "fullName" },
        { text: "Country Name", value: "countryName" },
        { text: "State Name", value: "stateName" },
        { text: "City Name", value: "cityName" },
        { text: "Created Date & Time", value: "createdDateTime" },
        { text: "Action", value: "action" },
      ],
      items: [],
    };
  },
  methods: {
    async getNews() {
      await this.$store
        .dispatch("getAllNews")
        .then(() => {
          this.items = this.getAllNews;
          this.loading = false;
        })
        .catch((ex) => {
          console.error(ex);
        });
    },
    editItem(id) {
      this.$store
        .dispatch("getNewsById", id)
        .then(() => {
          this.dialog = true;
        })
        .catch((ex) => {
          console.log(ex);
        });
    },
    closeModel() {
      this.dialog = false;
      this.getNews();
    },
    warningModel(id) {
      this.delDialog = true;
      this.itemId = id;
    },
    closeWarningModel() {
      this.delDialog = false;
      this.itemId = "";
    },

    async deleteNews() {
      await this.$store.dispatch("delNews", this.itemId).then((response) => {
        this.getNews();
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
        this.getNews();
      }
    });
  },
  computed: {
    ...mapGetters(["getIsAuthenticated", "getAllNews"]),
  },
};
</script>
