<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app dark>
      <AsideBar />
      <template v-slot:append>
        <div class="pa-2 teal darken-4">
          <v-btn block class="teal darken-1" @click="logout">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Be Aware | Admin Panel</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AsideBar from "../AsideBar/index.vue";
export default {
  components: {
    AsideBar,
  },
  data: () => ({ drawer: true }),
  methods: {
    async logout() {
      await this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push({name: 'login'});
        })
        .catch((ex) => {
          console.error(ex);
        });
    },
  },
};
</script>
