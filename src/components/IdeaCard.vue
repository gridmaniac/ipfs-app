<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-card
        class="mx-auto my-5 restore-brightness"
        tile
        max-width="260"
        :elevation="hover ? 3 : 0"
        link
        :to="`/ideas/${idea._id}`"
      >
        <v-img :src="`https://ipfs.io/ipfs/${idea.image}`" height="200px"
          ><v-fade-transition>
            <v-overlay
              v-if="hover"
              absolute
              color="secondary"
              class="d-flex justify-space-between align-start"
            >
              <v-btn
                v-if="!isLoading && !isInventor && !isFollowedUp"
                fab
                x-small
                outlined
                color="white"
                class="ma-3"
                @click.prevent="followUp(idea._id)"
                ><v-icon> mdi-heart-outline </v-icon></v-btn
              >
              <v-btn
                v-if="!isInventor && isFollowedUp"
                fab
                x-small
                color="error"
                class="ma-3"
                @click.prevent=""
                ><v-icon> mdi-heart </v-icon></v-btn
              >
              <v-btn
                v-if="!isInventor && isDownloadable"
                small
                outlined
                rounded
                color="white"
                class="ma-3"
                @click.prevent="downloadFile(idea.files[0].cid)"
                >Download <v-icon right> mdi-arrow-down </v-icon></v-btn
              >
            </v-overlay>
          </v-fade-transition></v-img
        >

        <v-card-title> {{ idea.title }} </v-card-title>

        <v-card-subtitle> {{ idea.profit }} </v-card-subtitle>

        <v-divider class="mb-2 mx-4"></v-divider>

        <v-card-actions>
          <v-row align="center">
            <v-col cols="7">
              <div class="d-flex align-center">
                <v-avatar color="primary" size="20" class="ml-2"></v-avatar>
                <div class="text-small ml-2">
                  {{ idea.user.firstName + " " + idea.user.lastName }}
                </div>
              </div>
            </v-col>
            <v-col cols="5"
              ><div class="text-small">
                {{ formatDate(idea.date) }}
              </div></v-col
            >
          </v-row>
        </v-card-actions>
      </v-card>
    </v-hover>
    <v-dialog v-model="isFollowUpPrompted" max-width="500">
      <v-card>
        <v-card-title class="headline"> Confirmation required </v-card-title>

        <v-card-text>
          Let the inventor know that you are interested in this idea?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="secondary" text @click="isFollowUpPrompted = false">
            Cancel
          </v-btn>

          <v-btn
            color="primary"
            @click="proceedFollowUp"
            :loading="isLoading"
            :disabled="isLoading"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  props: ["idea"],

  data() {
    return {
      isFollowedUp: false,
      isDownloadable: false,
      isFollowUpPrompted: false,
      ideaToFollowUp: null,
      isLoading: true,
    };
  },

  computed: {
    ...mapGetters(["isInventor"]),
  },

  methods: {
    formatDate(date) {
      return moment(date).format("MMM DD, YYYY");
    },
    downloadFile(cid) {
      window.open(`https://ipfs.io/ipfs/${cid}`);
    },
    async refresh() {
      const { isFollowedUp, isDownloadable } = await this.$store.dispatch(
        "getIdeaInteractables",
        this.idea._id
      );

      this.isFollowedUp = isFollowedUp;
      this.isDownloadable = isDownloadable;
      this.isLoading = false;
    },
    followUp(id) {
      this.isFollowUpPrompted = true;
      this.ideaToFollowUp = id;
    },
    async proceedFollowUp() {
      this.isLoading = true;
      await this.$store.dispatch("followUp", this.ideaToFollowUp);
      await this.refresh();

      this.isFollowUpPrompted = false;
    },
  },

  created() {
    this.refresh();
  },
};
</script>
