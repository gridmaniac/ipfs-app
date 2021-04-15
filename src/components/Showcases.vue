<template>
  <div class="d-md-flex lean my-3 restore-brightness">
    <v-card
      tile
      class="align-stretch pa-5"
      :width="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs ? 'auto' : '50%'"
      elevation="0"
    >
      <v-img
        :src="require('@/assets/img/ai-desktop-pet.jpeg')"
        height="300px"
      ></v-img>

      <v-card-title> Robot for your desktop </v-card-title>

      <v-card-subtitle>
        1,000 miles of wonder1,000 miles of wonder1,000 miles of wonder1,000
        miles of wonder1,000 miles of wonder1,000 miles of wonder1,000 miles of
        wonder
      </v-card-subtitle>
    </v-card>
    <v-card
      tile
      elevation="0"
      class="align-stretch pa-5"
      :width="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs ? 'auto' : '50%'"
    >
      <v-row v-for="(x, i) in ideas" :key="i">
        <v-col cols="4"><v-img :src="x" height="150px"></v-img></v-col>

        <v-col cols="8">
          <div class="text-h6">Lorem Ipsum</div>
          <div class="text-caption">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ideas: [
        require("@/assets/img/idea-1.jpeg"),
        require("@/assets/img/idea-2.jpeg"),
        require("@/assets/img/idea-3.jpeg"),
      ],
    };
  },
};
</script>
