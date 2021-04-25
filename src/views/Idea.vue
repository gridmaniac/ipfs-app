<template>
  <v-container fluid class="pa-0">
    <v-img
      height="550px"
      :src="idea.image && `https://ipfs.io/ipfs/${idea.image}`"
      ><div class="d-flex justify-space-between lean px-5 py-10">
        <v-btn outlined color="white" rounded small>{{
          idea.category && idea.category.title
        }}</v-btn>
        <div>
          <v-btn x-small outlined color="white" rounded fab class="mr-3"
            ><v-icon>mdi-link</v-icon></v-btn
          >
          <v-btn x-small outlined color="white" rounded fab class="mr-3"
            ><v-icon>mdi-twitter</v-icon></v-btn
          >
          <v-btn x-small outlined color="white" rounded fab class="mr-3"
            ><v-icon>mdi-facebook</v-icon></v-btn
          >
          <v-btn x-small outlined color="white" rounded fab class="mr-3"
            ><v-icon>mdi-instagram</v-icon></v-btn
          >
        </div>
      </div>
      <div class="text-h3 text-center white--text font-weight-medium mt-7">
        {{ idea.title }}
      </div>
      <div
        class="text-subtitle-2 text-center grey--text font-weight-medium text-limiter mx-auto mt-3"
      >
        {{ idea.details }}
      </div>
      <div class="d-flex justify-space-between stats mx-auto mt-15">
        <div>
          <v-progress-circular
            :rotate="-90"
            :size="100"
            :width="5"
            :value="value"
            color="primary"
          >
            {{ value }}
          </v-progress-circular>
          <div class="text-caption white--text text-center mt-3">Projects</div>
        </div>
        <div>
          <v-progress-circular
            :rotate="-90"
            :size="100"
            :width="5"
            :value="value"
            color="primary"
          >
            {{ value }}k
          </v-progress-circular>
          <div class="text-caption white--text text-center mt-3">Backers</div>
        </div>
        <div>
          <v-progress-circular
            :rotate="-90"
            :size="100"
            :width="5"
            :value="value"
            color="primary"
          >
            ${{ value }}.1M
          </v-progress-circular>
          <div class="text-caption white--text text-center mt-3">Raised</div>
        </div>
      </div></v-img
    >
    <v-sheet color="grey lighten-5">
      <!-- <div class="d-flex flex-wrap justify-start lean py-5 mx-auto"> -->
      <v-row class="pa-0 lean py-5">
        <v-col md="3" cols="12" v-for="x in ideas" :key="x.id">
          <IdeaCard :idea="x" /></v-col
      ></v-row>
      <div class="d-flex justify-center pb-10">
        <v-btn color="primary">See more</v-btn>
      </div>
    </v-sheet>
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
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import IdeaCard from "@/components/IdeaCard";

export default {
  components: {
    IdeaCard,
  },

  data() {
    return {
      interval: {},
      value: 0,
    };
  },

  computed: {
    ...mapGetters(["idea", "ideas"]),
  },

  methods: {
    formatDate(date) {
      return moment(date).format("MMM DD, YYYY");
    },
    downloadFile(cid) {
      window.open(`https://ipfs.io/ipfs/${cid}`);
    },
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },

  watch: {
    $route() {
      const { id } = this.$route.params;
      this.$store.dispatch("getIdeaById", id);
    },
  },

  mounted() {
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0);
      }
      this.value += 10;
    }, 500);
  },

  created() {
    this.$store.dispatch("getProfile");

    const { id } = this.$route.params;
    this.$store.dispatch("getIdeaById", id);
    this.$store.dispatch("getIdeas");
  },
};
</script>

<style scoped>
.text-limiter {
  max-width: 600px;
}

.stats {
  max-width: 350px;
}
</style>
