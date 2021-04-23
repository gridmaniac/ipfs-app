<template>
  <v-container class="fill-height stripes restore-brightness" fluid>
    <v-sheet class="lean profile-stripes">
      <v-row class="ma-0">
        <v-col cols="4" class="px-5 pb-10">
          <v-img
            :src="require('@/assets/img/placeholder.jpeg')"
            class="translate-up"
            height="280px"
          ></v-img>
          <v-btn color="primary" block elevation="0" tile>Edit profile</v-btn>
        </v-col>
        <v-col cols="8" class="mt-11">
          <div class="text-h2 font-weight-medium white--text">
            {{ investor.firstName }} {{ investor.lastName }}
          </div>
          <div class="text-body1 font-weight-medium white--text mt-1">
            Investor
          </div>
          <v-btn
            v-if="investor.role == 'investor'"
            class="mt-5"
            color="primary"
            large
            to="/messages"
            >Send message</v-btn
          >
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
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
    ...mapGetters(["investor"]),
  },

  methods: {},

  async created() {
    const { id } = this.$route.params;
    this.$store.dispatch("getInvestorById", id);
  },
};
</script>

<style>
.translate-up {
  transform: translateY(-30px);
}

.profile-stripes {
  background-image: repeating-linear-gradient(
    180deg,
    #676767,
    #676767 150px,
    #fff 150px,
    #fff 100%
  );
}
</style>
