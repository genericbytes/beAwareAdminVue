<template>
  <v-card height="calc(100%)" width="256" class="mx-auto teal darken-4">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6"> BeAware </v-list-item-title>
        <v-list-item-subtitle> Admin Panel </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <router-link :to="item.route" class="nav-custom">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </router-link>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { title: "Users", icon: "mdi-account-group", route: "user"},
        {
          title: "Blocked Users",
          icon: "mdi-account-multiple-remove",
          route: "blockeduser",
        },
        { title: "News", icon: "mdi-newspaper", route: "news"},
        {
          title: "Reported News",
          icon: "mdi-newspaper-remove",
          route: "reportedNews",
        },
        { title: "Category", icon: "mdi-shape-plus", route: "category"},
        {
          title: "Request Category",
          icon: "mdi-shape",
          route: "requestCategory",
        },
      ],
      right: null,
    };
  },
};
</script>
<style scoped>
.nav-custom {
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1rem;
  color: white;
  text-decoration: none;
}
</style>
