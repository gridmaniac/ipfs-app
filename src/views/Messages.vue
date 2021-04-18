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
            <v-list three-line height="503px" class="overflow-y-auto">
              <v-list-item-group
                v-model="selected"
                active-class="primary--text"
              >
                <template v-for="(item, index) in items">
                  <v-badge
                    bottom
                    :color="item.hasUnread ? 'primary' : 'transparent'"
                    dot
                    offset-x="25"
                    offset-y="25"
                    :key="index + 40"
                  >
                    <v-list-item class="restore-brightness">
                      <v-list-item-avatar tile>
                        <v-img
                          :src="require('@/assets/img/placeholder.jpeg')"
                        ></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.title"
                        ></v-list-item-title>

                        <v-list-item-subtitle
                          v-text="item.subtitle"
                        ></v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-action-text
                          v-text="item.action"
                        ></v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                  </v-badge>
                  <v-divider
                    v-if="index < items.length - 1"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list-item-group>
            </v-list>
          </v-col>
          <v-col cols="8" class="d-flex flex-column justify-space-between">
            <v-list
              two-line
              class="overflow-y-auto mr-3 restore-brightness"
              max-height="500px"
              ref="scrollElement"
            >
              <template v-for="(item, index) in messages">
                <v-subheader
                  v-if="item.header"
                  :key="item.index"
                  v-text="item.header"
                ></v-subheader>

                <v-list-item v-else :key="index">
                  <v-list-item-avatar>
                    <v-img :src="item.avatar"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title
                      class="font-weight-medium"
                      v-html="item.author"
                    ></v-list-item-title>
                    <div
                      class="text-subtitle2 grey--text text--darken-3 pr-10 pt-1"
                    >
                      {{ item.text }}
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
export default {
  data() {
    return {
      selected: 0,
      items: [
        {
          action: "Today",
          subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          title: "Loren impsum",
          hasUnread: true,
        },
        {
          action: "Today",
          subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          title: "Loren impsum",
          hasUnread: false,
        },
        {
          action: "Today",
          subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          title: "Loren impsum",
          hasUnread: false,
        },
        {
          action: "Today",
          subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          title: "Loren impsum",
          hasUnread: false,
        },
        {
          action: "Today",
          subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          title: "Loren impsum",
          hasUnread: false,
        },
        {
          action: "Today",
          subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          title: "Loren impsum",
          hasUnread: false,
        },
        {
          action: "Today",
          subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          title: "Loren impsum",
          hasUnread: false,
        },
        {
          action: "Today",
          subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          title: "Loren impsum",
          hasUnread: false,
        },
        {
          action: "Today",
          subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          title: "Loren impsum",
          hasUnread: false,
        },
      ],
      messages: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          author:
            'Trevor Hansen <span class="primary--text text-subtitle1">12:40</span>',
          text: "Wish I could come, but I'm out of town this weekend.",
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          author:
            'Trevor Hansen <span class="primary--text text-subtitle1">12:40</span>',
          text:
            "Do you have Paris recommendations? Have you ever been? Do you have Paris recommendations?",
        },
        { header: "Yesterday" },

        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          author:
            'Trevor Hansen <span class="primary--text text-subtitle1">12:40</span>',
          text:
            "Do you have Paris recommendations? Have you ever been? Do you have Paris recommendations?",
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          author:
            'Trevor Hansen <span class="primary--text text-subtitle1">12:40</span>',
          text: "Wish I could come, but I'm out of town this weekend.",
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          author:
            'Trevor Hansen <span class="primary--text text-subtitle1">12:40</span>',
          text:
            "Do you have Paris recommendations? Have you ever been? Do you have Paris recommendations?",
        },
        { header: "Today" },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          author:
            'Trevor Hansen <span class="primary--text text-subtitle1">12:40</span>',
          text: "Wish I could come, but I'm out of town this weekend.",
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          author:
            'Trevor Hansen <span class="primary--text text-subtitle1">12:40</span>',
          text:
            "Do you have Paris recommendations? Have you ever been? Do you have Paris recommendations?",
        },
      ],
      message: "",
    };
  },

  methods: {
    sendMessage() {},
  },

  mounted() {
    this.$nextTick(() => {
      this.$refs.scrollElement.$el.scrollTop = 65535;
    });
  },
};
</script>
