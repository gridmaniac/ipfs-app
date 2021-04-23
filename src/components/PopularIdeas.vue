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
            <v-hover v-slot="{ hover }">
              <v-card
                class="mx-auto my-5 restore-brightness"
                tile
                max-width="260"
                :elevation="hover ? 3 : 0"
                link
                :to="`/ideas/${x._id}`"
              >
                <v-img :src="`https://ipfs.io/ipfs/${x.image}`" height="200px"
                  ><v-fade-transition>
                    <v-overlay
                      v-if="hover"
                      absolute
                      color="secondary"
                      class="d-flex justify-space-between align-start"
                    >
                      <v-btn fab x-small outlined color="white" class="ma-3"
                        ><v-icon> mdi-heart-outline </v-icon></v-btn
                      >
                      <v-btn
                        small
                        outlined
                        rounded
                        color="white"
                        class="ma-3"
                        @click.prevent="downloadFile(x.files[0].cid)"
                        >Download <v-icon right> mdi-arrow-down </v-icon></v-btn
                      >
                    </v-overlay>
                  </v-fade-transition></v-img
                >

                <v-card-title> {{ x.title }} </v-card-title>

                <v-card-subtitle> {{ x.profit }} </v-card-subtitle>

                <v-divider class="mb-2 mx-4"></v-divider>

                <v-card-actions>
                  <v-row align="center">
                    <v-col cols="7">
                      <div class="d-flex align-center">
                        <v-avatar
                          color="primary"
                          size="20"
                          class="ml-2"
                        ></v-avatar>
                        <div class="text-small ml-2">
                          {{ x.user.firstName + " " + x.user.lastName }}
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="5"
                      ><div class="text-small">
                        {{ formatDate(x.date) }}
                      </div></v-col
                    >
                  </v-row>
                </v-card-actions>
              </v-card></v-hover
            ></slide
          >
        </carousel>
      </div>
    </v-sheet>
  </v-container>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  components: {
    Carousel,
    Slide,
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
    ...mapGetters(["ideas", "isLoading"]),
  },

  methods: {
    formatDate(date) {
      return moment(date).format("MMM DD, YYYY");
    },
    downloadFile(cid) {
      window.open(`https://ipfs.io/ipfs/${cid}`);
    },
  },

  created() {
    this.$store.dispatch("getIdeas");
  },
};
</script>
