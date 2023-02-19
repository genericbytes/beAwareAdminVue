<template>
  <v-col>
    <v-card>
      <v-card-title>
        Requested Category
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
        <template v-slot:item.isCreated="{ item }">
          {{ item.isCreated === false ? "No" : "Yes" }}
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn :disabled=item.isCreated class="mr-4 teal darken-4" dark @click="approve(item.id)">
            Approve
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-col>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isAuthenticated: false,
      loading: true,
      search: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Created Date & Time", value: "createdDateTime" },
        { text: "Requested By", value: "email" },
        { text: "Is Approved", value: "isCreated" },
        { text: "Action", value: "action" },
      ],
      items: [],
    };
  },
  methods: {
    async approve(id) {
      await this.$store
        .dispatch("approveRequestedCategory", id)
        .then(() => {
          this.getRequestedCategories();
        })
        .catch((ex) => {
          console.error(ex);
        });
    },

    async getRequestedCategories() {
      await this.$store
        .dispatch("getRequestCategories")
        .then(() => {
          this.items = this.getRequestCategories;
          this.loading = false;
        })
        .catch((ex) => {
          console.error(ex);
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
        this.getRequestedCategories();
      }
    });
  },
  computed: {
    ...mapGetters(["getIsAuthenticated", "getRequestCategories"]),
  },
};
</script>
