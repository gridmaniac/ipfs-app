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
          <!-- <v-btn color="primary" block elevation="0" tile>Edit profile</v-btn> -->
        </v-col>
        <v-col cols="8" class="mt-11">
          <div class="text-h2 font-weight-medium white--text">
            {{ followUp && followUp.investor.firstName }}
            {{ followUp && followUp.investor.lastName }}
          </div>
          <div class="text-body1 font-weight-medium white--text mt-1">
            Investor
          </div>
          <v-container class="mt-5" v-if="isInventor && !hasMessages">
            <div class="text-h5 mb-2">
              {{ followUp && followUp.idea.title }}
            </div>
            <v-textarea
              v-model="text"
              :error-messages="validateText()"
              lazy-validation
              :counter="400"
              solo
              rows="3"
              placeholder="Type message"
              @input="hasTextModified = true"
            ></v-textarea>
            <v-btn
              color="primary"
              large
              :loading="isLoading"
              :disabled="isLoading"
              @click="sendMessage"
              tile
              elevation="0"
              >Send message</v-btn
            >
          </v-container>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      text: null,
      hasTextModified: false,
      isLoading: false,
    };
  },

  computed: {
    isDesktop() {
      return (
        this.$vuetify.breakpoint.md ||
        this.$vuetify.breakpoint.lg ||
        this.$vuetify.breakpoint.xl
      );
    },
    ...mapGetters(["followUp", "hasMessages", "isInventor"]),
  },

  methods: {
    validateText() {
      if (!this.hasTextModified) return null;
      if (!this.text) return "Field is required";
      if (this.text.length > 400) return "Must be at most 100 characters long";
      return null;
    },
    async refresh() {
      const { id } = this.$route.params;
      await this.$store.dispatch("getFollowUpById", id);
    },
    async sendMessage() {
      this.hasTextModified = true;
      this.isLoading = true;

      if (this.validateText()) {
        this.isLoading = false;
        return;
      }

      await this.$store.dispatch("sendFirstMessage", {
        id: this.followUp._id,
        text: this.text,
      });

      await this.refresh();
      this.isLoading = false;

      this.$router.push("/messages");
    },
  },

  async created() {
    await this.$store.dispatch("getProfile");
    this.refresh();
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
