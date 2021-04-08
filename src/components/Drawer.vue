<template>
  <v-navigation-drawer v-model="isActive" app right temporary>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">IPFS </v-list-item-title>
        <v-list-item-subtitle>App</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item-group>
        <v-list-item>
          <v-list-item-title>Link 1</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Link 2</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Link 3</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Sign Up</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    active: {
      required: true,
    },
  },

  watch: {
    active: function (value) {
      this.isActive = value;
    },
  },

  data() {
    return {
      isActive: false,
    };
  },
};
</script>
