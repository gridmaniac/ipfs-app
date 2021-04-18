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
            My ideas
          </div>
          <v-tabs
            v-if="isSelected"
            v-model="tab"
            background-color="transparent"
            class="mt-5"
          >
            <v-tab> Heading 1 </v-tab>
            <v-tab> Upload </v-tab>
          </v-tabs>

          <v-tabs-items v-if="isSelected" v-model="tab">
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
              <div class="text-body1 grey--text mt-4 ml-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </div>
              <v-btn class="primary mt-5 ml-4" elevation="0">Button</v-btn>
            </v-tab-item>
          </v-tabs-items>

          <v-sheet
            v-if="isLoadingIdeas"
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
            v-if="!isSelected && !isLoadingIdeas"
          >
            <v-hover v-for="x in userIdeas" :key="x.id" v-slot="{ hover }">
              <v-card
                class="mr-5 my-3"
                tile
                width="200"
                :elevation="hover ? 3 : 0"
                link
                outlined
                @click="isSelected = true"
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
      hasTitleModified: false,
      isSelected: false,
      // items: [
      //   {
      //     id: 1,
      //     image: require("@/assets/img/placeholder.jpeg"),
      //     title:
      //       "TitlefasffafsfafwfawffwTitlefasffafsfafwfawffwTitlefasffafsfafwfawffw",
      //     profit:
      //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      //     author: {
      //       firstName: "Name",
      //       lastName: "Surname",
      //     },
      //     date: "March 29, 2021",
      //   },
      //   {
      //     id: 2,
      //     image: require("@/assets/img/placeholder.jpeg"),
      //     title: "Title",
      //     profit:
      //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      //     author: {
      //       firstName: "Name",
      //       lastName: "Surname",
      //     },
      //     date: "March 29, 2021",
      //     isPublished: true,
      //   },
      //   {
      //     id: 3,
      //     image: require("@/assets/img/placeholder.jpeg"),
      //     title: "Title",
      //     profit:
      //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      //     author: {
      //       firstName: "Name",
      //       lastName: "Surname",
      //     },
      //     date: "March 29, 2021",
      //   },
      //   {
      //     id: 4,
      //     image: require("@/assets/img/placeholder.jpeg"),
      //     title: "Title",
      //     profit:
      //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      //     author: {
      //       firstName: "Name",
      //       lastName: "Surname",
      //     },
      //     date: "March 29, 2021",
      //   },
      //   {
      //     id: 5,
      //     image: require("@/assets/img/placeholder.jpeg"),
      //     title: "Title",
      //     profit:
      //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      //     author: {
      //       firstName: "Name",
      //       lastName: "Surname",
      //     },
      //     date: "March 29, 2021",
      //   },
      //   {
      //     id: 6,
      //     image: require("@/assets/img/placeholder.jpeg"),
      //     title: "Title",
      //     profit:
      //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      //     author: {
      //       firstName: "Name",
      //       lastName: "Surname",
      //     },
      //     date: "March 29, 2021",
      //   },
      // ],
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
    sliderValue() {
      if (this.isDesktop) {
        return 3;
      }

      if (this.$vuetify.breakpoint.sm) {
        return 2;
      }

      return 1;
    },
    ...mapGetters([
      "paymentDetails",
      "userIdeas",
      "isInventor",
      "isLoadingIdeas",
      "firstName",
      "lastName",
    ]),
  },

  methods: {
    validateTitle() {
      if (!this.hasTitleModified) return null;
      if (!this.title) return "Field is required";
      if (this.title.length > 100) return "Must be at most 100 characters long";
      return null;
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
