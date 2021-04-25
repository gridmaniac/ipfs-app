<template>
  <v-container fluid class="pa-0 my-2">
    <v-sheet color="grey lighten-3" class="pa-7">
      <div class="lean">
        <div class="text-h5 font-weight-medium ml-2">Loren impsum</div>
        <carousel
          :per-page="sliderValue"
          :navigation-enabled="true"
          :pagination-enabled="false"
        >
          <slide v-for="x in ideas" :key="x._id">
            <IdeaCard :idea="x" />
          </slide>
        </carousel>
      </div>
    </v-sheet>
  </v-container>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import IdeaCard from "@/components/IdeaCard";
import { mapGetters } from "vuex";

export default {
  components: {
    Carousel,
    Slide,
    IdeaCard,
  },

  data() {
    return {};
  },

  computed: {
    isDesktop() {
      return (
        this.$vuetify.breakpoint.md ||
        this.$vuetify.breakpoint.lg ||
        this.$vuetify.breakpoint.xl
      );
    },
    sliderValue() {
      if (this.isDesktop) {
        return 4;
      }

      if (this.$vuetify.breakpoint.sm) {
        return 2;
      }

      return 1;
    },
    ...mapGetters(["ideas", "isLoading", "isInventor"]),
  },

  created() {
    this.$store.dispatch("getIdeas");
  },
};
</script>
