<template>
  <v-container fluid class="pa-0">
    <v-sheet color="grey lighten-3" class="pa-7 py-15">
      <v-sheet class="lean">
        <v-row>
          <v-col cols="4">
            <div class="d-flex align-center justify-space-between pl-5 mb-7">
              <div class="text-h6 font-weight-medium">
                Inbox<v-icon color="primary" class="ml-2 mr-15"
                  >mdi-image</v-icon
                >
              </div>
              <v-btn color="primary">Button</v-btn>
            </div>
            <div
              v-if="isLoading"
              class="d-flex justify-center align-center fill-height"
              style="height: 503px"
            >
              <v-progress-circular
                color="primary"
                indeterminate
              ></v-progress-circular>
            </div>
            <v-list
              v-if="!isLoading"
              three-line
              height="503px"
              class="overflow-y-auto"
            >
              <v-list-item-group
                v-model="selected"
                active-class="primary--text"
              >
                <template v-for="(x, index) in followUps">
                  <!-- <v-badge
                    bottom
                    :color="x.hasUnread ? 'primary' : 'transparent'"
                    dot
                    offset-x="25"
                    offset-y="25"
                    :key="x._id"
                  > -->
                  <v-list-item class="restore-brightness" :key="x._id">
                    <v-list-item-avatar tile>
                      <v-img
                        :src="`https://ipfs.io/ipfs/${x.idea.image}`"
                      ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title
                        v-text="x.idea.title"
                      ></v-list-item-title>

                      <v-list-item-subtitle
                        v-text="x.idea.details"
                      ></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-list-item-action-text
                        v-text="formatDate(x.date)"
                      ></v-list-item-action-text>
                    </v-list-item-action>
                  </v-list-item>
                  <!-- </v-badge> -->
                  <v-divider
                    v-if="index < followUps.length - 1"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list-item-group>
            </v-list>
          </v-col>
          <v-col cols="8" class="d-flex flex-column justify-space-between">
            <div
              v-if="isLoadingMessages"
              class="d-flex justify-center align-center fill-height"
            >
              <v-progress-circular
                color="primary"
                indeterminate
              ></v-progress-circular>
            </div>
            <v-list
              v-if="!isLoadingMessages"
              two-line
              class="overflow-y-auto mr-3 restore-brightness"
              max-height="500px"
              ref="scrollElement"
            >
              <template v-for="x in messages">
                <!-- <v-subheader
                  v-if="item.header"
                  :key="item.index"
                  v-text="item.header"
                ></v-subheader> -->

                <v-list-item :key="x._id">
                  <v-list-item-avatar>
                    <!-- <v-img :src="x.avatar"></v-img> -->
                    <v-avatar color="primary"></v-avatar>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="font-weight-medium"
                      >{{ x.author.firstName }} {{ x.author.lastName }}
                      <span class="primary--text text-subtitle1">{{
                        formatTime(x.date)
                      }}</span></v-list-item-title
                    >
                    <div
                      class="text-subtitle2 grey--text text--darken-3 pr-10 pt-1"
                    >
                      {{ x.text }}
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
            <v-container>
              <v-row>
                <v-col cols="12" class="pb-0">
                  <v-text-field
                    v-model="message"
                    filled
                    clearable
                    placeholder="Type message here..."
                    type="text"
                    dense
                    solo
                    class="no-br"
                    hide-details=""
                    @keyup.enter="sendMessage"
                    @click:clear="sendMessage"
                  >
                    <template v-slot:append-outer class="ma-0">
                      <v-btn
                        elevation="0"
                        tile
                        class="py-5"
                        color="primary"
                        min-width="50px"
                        width="50px"
                        @click="sendMessage"
                        ><v-icon>mdi-send</v-icon></v-btn
                      ></template
                    ></v-text-field
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-sheet>
    </v-sheet>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      selected: 0,
      // messages: [
      //   {
      //     avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      //     author:
      //       'Trevor Hansen <span class="primary--text text-subtitle1">12:40</span>',
      //     text: "Wish I could come, but I'm out of town this weekend.",
      //   },
      //   {
      //     avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
      //     author:
      //       'Trevor Hansen <span class="primary--text text-subtitle1">12:40</span>',
      //     text:
      //       "Do you have Paris recommendations? Have you ever been? Do you have Paris recommendations?",
      //   },
      //   { header: "Yesterday" },
      // ],
      isLoading: true,
      isLoadingMessages: true,
      message: "",
    };
  },

  computed: {
    ...mapGetters(["followUps", "messages"]),
  },

  watch: {
    selected(value) {
      this.getMessages(this.followUps[value]._id);
    },
  },

  methods: {
    async sendMessage() {
      const id = this.followUps[this.selected]._id;
      const text = this.message;
      this.message = "";
      await this.$store.dispatch("sendMessage", {
        id,
        text,
      });

      this.scrollToBottom();
    },
    formatDate(date) {
      return moment(date).format("DD MMM");
    },
    formatTime(date) {
      return moment(date).format("hh:mm");
    },
    async getMessages(id) {
      this.isLoadingMessages = true;
      await this.$store.dispatch("getMessages", id);
      this.isLoadingMessages = false;
      this.scrollToBottom();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.scrollElement.$el.scrollTop = 65535;
      });
    },
  },

  mounted() {},

  async created() {
    this.isLoading = true;
    await this.$store.dispatch("getFollowUps");
    this.isLoading = false;
    if (this.followUps.length > 0)
      return await this.getMessages(this.followUps[this.selected]._id);

    this.isLoadingMessages = false;
  },
};
</script>
