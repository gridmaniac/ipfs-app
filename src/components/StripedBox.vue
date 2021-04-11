<template>
  <v-container class="fill-height stripes" fluid>
    <v-sheet class="compact">
      <v-row class="ma-0">
        <v-col v-if="image" cols="12" md="6" class="pa-0 hidden-md-and-down">
          <v-img :src="image" height="100%"> </v-img>
        </v-col>
        <v-col v-if="image" cols="12" md="6" class="pa-7 pt-12">
          <slot></slot>
        </v-col>
        <v-col v-else cols="12" class="pa-7 pt-12">
          <slot></slot>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  props: ["image"],
};
</script>

<style>
.stripes {
  background-image: repeating-linear-gradient(
    180deg,
    #989898,
    #989898 50%,
    #f3f3f3 50%,
    #f3f3f3 100%
  );
}
</style>
