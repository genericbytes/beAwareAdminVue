<template>
  <v-col>
    <v-card>
      <v-card-title>
        Blocked Users
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :loading="loading"
        loading-text="Loading... Please wait"
      >
        <template v-slot:item.dob="{ item }">
          {{ new Date(item.dob).toLocaleDateString() }}
        </template>
        <template v-slot:item.tillBlocked="{ item }">
          {{ new Date(item.tillBlocked).toLocaleString() }}
        </template></v-data-table
      >
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
        {
          text: "First Name",
          align: "start",
          sortable: false,
          value: "firstName",
        },
        { text: "Last Name", value: "lastName" },
        { text: "UserName", value: "userName" },
        { text: "Email", value: "email" },
        { text: "Date of Birth", value: "dob" },
        { text: "Country", value: "country" },
        { text: "State", value: "state" },
        { text: "City", value: "city" },
        { text: "Blocked Till", value: "tillBlocked" },
      ],
      items: [],
    };
  },
  methods: {
    async getBlockedUsers() {
      await this.$store
        .dispatch("getAllBlockedUsers")
        .then(() => {
          this.items = this.getAllBlockedUsers;
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
        this.getBlockedUsers();
      }
    });
  },
  computed: {
    ...mapGetters(["getIsAuthenticated", "getAllBlockedUsers"]),
  },
};
</script>
