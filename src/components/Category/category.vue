<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="category.name"
            maxlength="100"
            label="Category Name"
            color="teal darken-4"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-btn class="mr-4 teal darken-4" dark @click="submitCategory">
            Save
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    category: {
      id: 0,
      name: "",
    },
  }),
  methods: {
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

    async submitCategory(event) {
      event.preventDefault();
      if (this.category.id === null || this.category.id === 0) {
        this.addCategory(event);
      } else {
        this.editCategory(event);
      }
    },

    async addCategory(event) {
      event.preventDefault();
      await this.$store
        .dispatch("addCategory", this.category)
        .then((response) => {
          if (response.data.status) {
            this.category = {
              id: 0,
              name: "",
            };
            this.$emit("closeIt");
          }
        });
    },

    async editCategory(event) {
      event.preventDefault();
      await this.$store
        .dispatch("editCategory", this.category)
        .then((response) => {
          if (response.data.status) {
            this.category = {
              id: 0,
              name: "",
            };
            this.$emit("closeIt");
          }
        });
    },
  },
  mounted() {
    this.handleIsAuthenticated().then(() => {
      if (this.isAuthenticated) {
        if (this.getCategoryById) {
          this.category = this.getCategoryById;
        }
      }
    });
  },
  computed: {
    ...mapGetters(["getIsAuthenticated", "getCategoryById"]),
  },
};
</script>
