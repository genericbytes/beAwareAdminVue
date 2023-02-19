<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-avatar size="150px">
            <img :src="news.image" :alt="news.title" />
          </v-avatar>
        </v-col>
        <v-col cols="12" md="6">
          <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            label="Change Image"
            @change="previewImage"
            color="teal darken-4"
          ></v-file-input>
        </v-col>

        <v-col cols="12" md="8">
          <v-text-field
            v-model="news.title"
            maxlength="100"
            label="Title"
            color="teal darken-4"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            :items="categories"
            label="Category"
            item-text="name"
            item-value="id"
            v-model="news.categoryId"
            color="teal darken-4"
          ></v-select>
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            :items="countries"
            label="Country"
            item-text="name"
            item-value="iso2"
            v-model="news.countryName"
            color="teal darken-4"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            :items="states"
            label="State"
            item-text="name"
            item-value="iso2"
            v-model="news.stateName"
            @change="getStateByCountry()"
            color="teal darken-4"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            :items="cities"
            label="City"
            item-text="name"
            item-value="iso2"
            v-model="news.cityName"
            @change="getCitiesByState()"
            color="teal darken-4"
          ></v-select>
        </v-col>
        <v-col cols="12" md="12">
          <v-textarea
            name="description"
            maxlength="2500"
            label="Description"
            v-model="news.description"
            color="teal darken-4"
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="12">
          <v-btn class="mr-4 teal darken-4" dark @click="editnews">
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
    news: {
      id: 0,
      title: "",
      image: "",
      description: "",
      countryName: "",
      stateName: "",
      cityName: "",
      categoryId: 0,
      userId: 0,
    },
    categories: null,
    countries: null,
    states: null,
    cities: null,
    selectedCountry: "",
    selectedState: "",
  }),
  methods: {
    async getAllCategories() {
      await this.$store.dispatch("getCategories").then((response) => {});
    },
    async getCountryList() {
      await this.$store.dispatch("getCountries");
    },

    async getStateByCountry() {
      await this.$store
        .dispatch("getStateByCountry", this.selectedCountry)
        .then(() => {
          this.states = this.getState;
        });
    },

    async getCitiesByState() {
      var payload = {
        country: this.selectedCountry,
        state: this.selectedState,
      };
      await this.$store.dispatch("getCitiesByState", payload).then(() => {
        this.cities = this.getCities;
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

    previewImage() {
      const file = document.querySelector("input[type=file]").files[0];
      const reader = new FileReader();

      let rawImg;
      reader.onloadend = () => {
        rawImg = reader.result;
        this.news.image = rawImg;
      };
      reader.readAsDataURL(file);
    },

    async editnews(event) {
      event.preventDefault();
      await this.$store.dispatch("editNews", this.news).then((response) => {
        if (response.data.status) {
          this.news = {
            id: 0,
            title: "",
            image: "",
            description: "",
            countryName: "",
            stateName: "",
            cityName: "",
            categoryId: 0,
          };
          this.$emit("closeIt");
        }
      });
    },
  },
  mounted() {
    this.handleIsAuthenticated().then(() => {
      if (this.isAuthenticated) {
        this.news = this.getNewsById;
      }
    });

    this.getAllCategories().then(() => {
      this.categories = this.getCategories;
    });

    this.getCountryList().then(() => {
      this.countries = this.getCountries;
      this.getStateByCountry().then(() => {
        this.getCitiesByState();
      });
    });
    this.selectedCountry = this.getNewsById.countryName;
    this.selectedState = this.getNewsById.stateName;
  },
  computed: {
    ...mapGetters([
      "getIsAuthenticated",
      "getNewsById",
      "getCategories",
      "getCountries",
      "getState",
      "getCities",
    ]),
  },
};
</script>
