<template>
  <div>
    <CategoryFilter />
    <PopularIdeas />

    <v-row class="lean restore-brightness mt-7 mb-15">
      <v-col cols="12" md="6" class="pa-0 mt-5">
        <v-card tile elevation="0" class="mx-2">
          <v-img
            class="px-5 py-1"
            height="192px"
            :src="require('@/assets/img/placeholder.jpeg')"
          >
            <v-card-title class="px-0">Investors</v-card-title>

            <v-card-text class="px-0 text-caption">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.Lorem Ipsum is simply dummy text of th printing and
              typesetting industry.
            </v-card-text>

            <v-card-actions class="pa-0">
              <v-btn color="primary">Button</v-btn>
            </v-card-actions>
          </v-img>
        </v-card>
        <v-card tile elevation="0" class="mx-2 mt-4">
          <v-img
            class="px-5 py-1"
            height="192px"
            :src="require('@/assets/img/placeholder.jpeg')"
          >
            <v-card-title class="px-0">Investors</v-card-title>

            <v-card-text class="px-0 text-caption">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.Lorem Ipsum is simply dummy text of th printing and
              typesetting industry.
            </v-card-text>

            <v-card-actions class="pa-0">
              <v-btn color="primary">Button</v-btn>
            </v-card-actions>
          </v-img>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" class="pa-0 mt-5">
        <v-card tile elevation="0" class="mx-2">
          <v-img
            class="align-center justify-center px-5 py-1 d-flex"
            height="400px"
            :src="require('@/assets/img/placeholder.jpeg')"
          >
            <v-card-title class="justify-center">Inventors</v-card-title>

            <v-card-text class="text-center text-caption">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.Lorem Ipsum is simply dummy text of th printing and
              typesetting industry.
            </v-card-text>

            <v-card-actions class="justify-center">
              <v-btn color="primary">Button</v-btn>
            </v-card-actions>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CategoryFilter from "@/components/CategoryFilter";
import PopularIdeas from "@/components/PopularIdeas";

export default {
  components: {
    CategoryFilter,
    PopularIdeas,
  },

  data() {
    return {};
  },

  created() {
    this.$store.dispatch("getProfile");
  },
};
</script>
