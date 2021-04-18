<template>
  <v-container fluid class="pa-0">
    <v-img height="550px" :src="require('@/assets/img/placeholder.jpeg')"
      ><div class="d-flex justify-space-between lean px-5 py-10">
        <v-btn outlined color="white" rounded small>CATEGORY NAME</v-btn>
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
        Lorem impsum
      </div>
      <div
        class="text-subtitle-2 text-center grey--text font-weight-medium text-limiter mx-auto mt-3"
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.Lorem Ipsum is simply dummy text of th printing and typesetting
        industry.
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
        <v-col md="3" cols="12" v-for="x in items" :key="x.id">
          <v-hover v-slot="{ hover }">
            <v-card
              class="mb-1 mx-auto restore-brightness"
              tile
              max-width="260"
              :elevation="hover ? 3 : 0"
              link
            >
              <v-img :src="x.image" height="200px"
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
                    <v-btn small outlined rounded color="white" class="ma-3"
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
                        {{ x.author.firstName + " " + x.author.lastName }}
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="5"
                    ><div class="text-small">
                      {{ x.date }}
                    </div></v-col
                  >
                </v-row>
              </v-card-actions>
            </v-card></v-hover
          ></v-col
        ></v-row
      >
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
export default {
  data() {
    return {
      interval: {},
      value: 0,
      items: [
        {
          id: 1,
          image: require("@/assets/img/placeholder.jpeg"),
          title: "Title",
          profit:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          author: {
            firstName: "Name",
            lastName: "Surname",
          },
          date: "March 29, 2021",
        },
        {
          id: 2,
          image: require("@/assets/img/placeholder.jpeg"),
          title: "Title",
          profit:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          author: {
            firstName: "Name",
            lastName: "Surname",
          },
          date: "March 29, 2021",
        },
        {
          id: 3,
          image: require("@/assets/img/placeholder.jpeg"),
          title: "Title",
          profit:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          author: {
            firstName: "Name",
            lastName: "Surname",
          },
          date: "March 29, 2021",
        },
        {
          id: 4,
          image: require("@/assets/img/placeholder.jpeg"),
          title: "Title",
          profit:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          author: {
            firstName: "Name",
            lastName: "Surname",
          },
          date: "March 29, 2021",
        },
        {
          id: 5,
          image: require("@/assets/img/placeholder.jpeg"),
          title: "Title",
          profit:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          author: {
            firstName: "Name",
            lastName: "Surname",
          },
          date: "March 29, 2021",
        },
        {
          id: 6,
          image: require("@/assets/img/placeholder.jpeg"),
          title: "Title",
          profit:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          author: {
            firstName: "Name",
            lastName: "Surname",
          },
          date: "March 29, 2021",
        },
      ],
    };
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0);
      }
      this.value += 10;
    }, 500);
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
