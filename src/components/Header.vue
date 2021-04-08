<template>
  <div>
    <v-app-bar
      app
      color="white"
      class="lean"
      elevation="0"
      style="position: absolute"
    >
      <div class="temporary-logo"></div>

      <v-spacer></v-spacer>
      <v-btn
        color="secondary"
        class="mr-5 hidden-sm-and-down"
        small
        outlined
        tile
        elevation="0"
        >Link 1</v-btn
      >
      <v-btn
        color="secondary"
        class="mr-5 hidden-sm-and-down"
        small
        outlined
        tile
        elevation="0"
        >Link 2</v-btn
      >
      <v-btn
        color="secondary"
        class="mr-5 hidden-sm-and-down"
        small
        outlined
        tile
        elevation="0"
        >Link 3</v-btn
      >
      <v-app-bar-nav-icon
        @click.stop="isDrawerActive = !isDrawerActive"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>

      <v-btn color="primary" class="ml-5 hidden-sm-and-down" tile elevation="0"
        >Sign up</v-btn
      >
    </v-app-bar>
    <Drawer :active="isDrawerActive" />
  </div>
</template>

<script>
import Drawer from "@/components/Drawer";

export default {
  components: {
    Drawer,
  },

  data() {
    return {
      isDrawerActive: false,
    };
  },
};
</script>
