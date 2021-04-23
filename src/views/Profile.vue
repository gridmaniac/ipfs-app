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
            {{ firstName }} {{ lastName }}
          </div>
          <div class="text-body1 font-weight-medium white--text mt-1">
            {{ isInventor ? "My ideas" : "Investor" }}
          </div>
          <v-tabs
            v-if="isSelected && isInventor && !isIdeaLoading"
            v-model="tab"
            background-color="transparent"
            class="mt-5"
          >
            <v-tab> Title </v-tab>
            <v-tab> Profit </v-tab>
            <v-tab> Details </v-tab>
            <v-tab> File </v-tab>
          </v-tabs>

          <v-tabs-items
            v-if="isSelected && isInventor && !isIdeaLoading"
            v-model="tab"
          >
            <v-tab-item>
              <v-textarea
                v-model="title"
                :error-messages="validateTitle()"
                lazy-validation
                :counter="100"
                solo
                rows="3"
                placeholder="Lorem ipsum"
                @input="hasTitleModified = true"
              ></v-textarea>
            </v-tab-item>
            <v-tab-item>
              <v-textarea
                v-model="profit"
                :error-messages="validateProfit()"
                lazy-validation
                :counter="200"
                solo
                rows="3"
                placeholder="Lorem ipsum"
                @input="hasProfitModified = true"
              ></v-textarea>
            </v-tab-item>
            <v-tab-item>
              <v-textarea
                v-model="details"
                :error-messages="validateDetails()"
                lazy-validation
                :counter="500"
                solo
                rows="3"
                placeholder="Lorem ipsum"
                @input="hasDetailsModified = true"
              ></v-textarea>
            </v-tab-item>
            <v-tab-item>
              <div class="text-body1 grey--text mt-4 ml-4">
                <v-btn
                  text
                  small
                  color="primary"
                  @click="downloadFile(idea.files && idea.files[0].cid)"
                  >{{
                    `https://ipfs.io/ipfs/${idea.files && idea.files[0].cid}`
                  }}</v-btn
                >
              </div>
            </v-tab-item>
          </v-tabs-items>
          <div
            v-if="isSelected && isInventor && !isIdeaLoading"
            class="d-flex justify-end"
          >
            <v-btn color="primary" @click="saveIdea">Save</v-btn>
            <v-btn
              v-if="!idea.isPublished"
              color="success"
              @click="saveAndPublishIdea"
              class="ml-3"
              >Save & Publish</v-btn
            >
          </div>

          <v-sheet
            v-if="isLoadingIdeas || isIdeaLoading"
            height="200"
            class="d-flex align-center justify-center fill-height"
            color="transparent"
          >
            <v-progress-circular
              :size="70"
              :width="7"
              color="primary"
              indeterminate
            ></v-progress-circular
          ></v-sheet>

          <div
            class="d-flex flex-wrap mt-5 align-center"
            v-if="!isSelected && !isLoadingIdeas && isInventor"
          >
            <v-hover v-for="x in userIdeas" :key="x._id" v-slot="{ hover }">
              <v-card
                class="mr-5 my-3"
                tile
                width="200"
                :elevation="hover ? 3 : 0"
                link
                outlined
                @click="selectIdea(x._id)"
              >
                <v-img :src="`https://ipfs.io/ipfs/${x.image}`" height="140px"
                  ><v-btn
                    small
                    rounded
                    color="light-green"
                    class="ma-3"
                    v-if="x.isPublished"
                    >Published</v-btn
                  ><v-btn
                    small
                    rounded
                    color="primary"
                    class="ma-3"
                    v-if="!x.isPublished"
                    >Draft</v-btn
                  ><v-fade-transition>
                    <v-overlay
                      v-if="hover"
                      absolute
                      color="secondary"
                      class="d-flex justify-space-between align-start"
                    >
                    </v-overlay> </v-fade-transition
                ></v-img>

                <v-card-title>
                  <div class="text-subtitle-2 text-truncate">
                    {{ x.title }}
                  </div>
                </v-card-title>
              </v-card></v-hover
            >
            <v-btn fab elevation="0" text x-large color="primary" to="/create">
              <v-icon>mdi-plus</v-icon></v-btn
            >
          </div>
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
      tab: null,
      title: null,
      profit: null,
      details: null,
      hasTitleModified: false,
      hasProfitModified: false,
      hasDetailsModified: false,
      isSelected: false,
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
    ...mapGetters([
      "paymentDetails",
      "userIdeas",
      "isInventor",
      "isLoadingIdeas",
      "firstName",
      "lastName",
      "idea",
      "isInventor",
      "isLoadingProfile",
      "isIdeaLoading",
    ]),
  },

  methods: {
    validateTitle() {
      if (!this.hasTitleModified) return null;
      if (!this.title) return "Field is required";
      if (this.title.length > 100) return "Must be at most 100 characters long";
      return null;
    },
    validateProfit() {
      if (!this.hasProfitModified) return null;
      if (!this.profit) return "Field is required";
      if (this.profit.length > 200)
        return "Must be at most 200 characters long";
      return null;
    },
    validateDetails() {
      if (!this.hasDetailsModified) return null;
      if (!this.details) return "Field is required";
      if (this.details.length > 500)
        return "Must be at most 500 characters long";
      return null;
    },
    async selectIdea(id) {
      this.isSelected = true;
      await this.$store.dispatch("getIdeaById", id);
      this.title = this.idea.title;
      this.profit = this.idea.profit;
      this.details = this.idea.details;
    },
    downloadFile(cid) {
      window.open(`https://ipfs.io/ipfs/${cid}`);
    },
    async saveIdea() {
      if (
        this.validateTitle() ||
        this.validateProfit() ||
        this.validateDetails()
      )
        return;

      await this.$store.dispatch("updateIdea", {
        id: this.idea._id,
        payload: {
          title: this.title,
          profit: this.profit,
          details: this.details,
        },
      });

      this.isSelected = false;
      this.$store.dispatch("getUserIdeas");
    },

    async saveAndPublishIdea() {
      if (
        this.validateTitle() ||
        this.validateProfit() ||
        this.validateDetails()
      )
        return;

      await this.$store.dispatch("updateIdea", {
        id: this.idea._id,
        payload: {
          title: this.title,
          profit: this.profit,
          details: this.details,
          isPublished: true,
        },
      });

      this.isSelected = false;
      this.$store.dispatch("getUserIdeas");
    },
  },

  async created() {
    this.$store.dispatch("getProfile");
    await this.$store.dispatch("getUserIdeas");
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
