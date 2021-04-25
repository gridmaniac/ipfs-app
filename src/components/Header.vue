<template>
  <div>
    <v-app-bar
      app
      color="white"
      class="lean"
      elevation="0"
      style="position: absolute"
    >
      <div @click="goHome()" class="temporary-logo"></div>

      <v-spacer></v-spacer>

      <div>
        <v-btn
          color="secondary"
          class="mr-5 hidden-sm-and-down"
          small
          text
          tile
          elevation="0"
          >Link 1</v-btn
        >
        <v-btn
          color="secondary"
          class="mr-5 hidden-sm-and-down"
          small
          text
          tile
          elevation="0"
          >Link 2</v-btn
        >
        <v-btn
          color="secondary"
          class="mr-5 hidden-sm-and-down"
          small
          text
          tile
          elevation="0"
          >Link 3</v-btn
        >
        <v-btn
          v-if="!isLoggedIn"
          color="primary"
          class="ml-5 hidden-sm-and-down"
          tile
          elevation="0"
          to="/signin"
          >Sign in</v-btn
        >
      </div>

      <div v-if="isLoggedIn">
        <v-menu left>
          <template v-slot:activator="{ attrs, on }">
            <!-- <v-btn color="primary" v-bind="attrs" v-on="on" tile elevation="0">
              Account
            </v-btn> -->
            <v-badge overlap dot bordered color="success">
              <v-avatar
                v-bind="attrs"
                v-on="on"
                size="36"
                color="primary"
              ></v-avatar>
            </v-badge>
          </template>

          <!-- <v-avatar class="primary" size="36"></v-avatar> -->
          <v-list>
            <v-list-item dense link to="/profile">
              <v-list-item-icon class="mr-4">
                <v-icon>mdi-human</v-icon>
              </v-list-item-icon>
              <v-list-item-title>My profile</v-list-item-title>
            </v-list-item>
            <v-list-item dense link to="/messages">
              <v-list-item-icon class="mr-4">
                <v-icon>mdi-chat</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Messages</v-list-item-title>
            </v-list-item>
            <v-list-item dense link>
              <v-list-item-icon class="mr-4">
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title @click="signOut">Sign out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-app-bar-nav-icon
        @click.stop="isDrawerActive = !isDrawerActive"
        class="hidden-md-and-up"
        v-if="!isLoggedIn"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <Drawer :active="isDrawerActive" />
  </div>
</template>

<script>
import Drawer from "@/components/Drawer";

export default {
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
  },

  components: {
    Drawer,
  },

  data() {
    return {
      isDrawerActive: false,
    };
  },

  methods: {
    goHome() {
      this.$router.push({ path: "/" });
    },
    signOut() {
      this.$store.commit("resetState");
      this.$router.push("/");
    },
  },
};
</script>
