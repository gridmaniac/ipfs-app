<template>
  <v-container class="fill-height stripes" fluid>
    <v-sheet class="compact">
      <v-row class="ma-0">
        <v-col cols="12" md="6" class="pa-0 hidden-md-and-down">
          <v-img :src="image" height="100%"> </v-img>
        </v-col>
        <v-col cols="12" md="6" class="pa-7 pt-12">
          <slot></slot>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  props: {
    image: {
      required: true,
    },
  },
};
</script>
