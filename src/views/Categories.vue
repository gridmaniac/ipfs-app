<template>
  <v-container class="lean">
    <v-row>
      <v-col md="3" cols="12"
        ><v-btn v-if="isDesktop" block elevation="0" tile class="py-5"
          >Categories</v-btn
        ><v-select
          v-else
          class="no-br"
          :items="items"
          label="Categories"
          solo
          dense
          filled
          hide-details
        ></v-select
      ></v-col>
      <v-col md="7" cols="9"
        ><v-text-field
          v-model="search"
          filled
          clearable
          placeholder="Search"
          type="text"
          dense
          solo
          class="no-br"
          hide-details=""
          @keyup.enter="startSearch"
          @click:clear="startSearch"
        >
          <template v-slot:append-outer class="ma-0">
            <v-btn
              elevation="0"
              tile
              class="py-5"
              color="primary"
              min-width="50px"
              width="50px"
              @click="startSearch"
              ><v-icon>mdi-magnify</v-icon></v-btn
            ></template
          ></v-text-field
        >
      </v-col>
      <v-col md="2" cols="3">
        <v-btn elevation="0" tile block class="py-5"
          >{{ isDesktop ? "Favorite" : ""
          }}<v-icon small :right="isDesktop">mdi-heart</v-icon></v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col md="3" v-if="isDesktop">
        <v-list nav dense dark color="grey darken-3" max-height="400">
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              @click="startSearch"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col md="9" cols="12">
        <v-sheet
          v-if="isLoading"
          height="400"
          class="d-flex align-center justify-center fill-height"
          color="grey lighten-4"
        >
          <v-progress-circular
            :size="70"
            :width="7"
            color="primary"
            indeterminate
          ></v-progress-circular
        ></v-sheet>
        <v-carousel
          height="400"
          hide-delimiter
          show-arrows
          class="align-stretch"
          v-else
        >
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet
              color="grey lighten-4 d-flex flex-column align-center justify-center fill-height"
              align="center"
              justify="center"
            >
              <div
                class="display-1 grey--text text--darken-3 font-weight-medium"
              >
                {{ slide.title }}
              </div>
              <div
                class="body-2 grey--text text--darken-3 mt-3"
                :style="'max-width: ' + (isDesktop ? '350px' : '200px')"
              >
                {{ slide.profit }}
              </div>
              <v-btn color="primary" class="mt-3">Button</v-btn>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      search: "",
      isLoading: false,
      selectedItem: 0,
      items: [
        "Category 1",
        "Category 2",
        "Category 3",
        "Category 5",
        "Category 6",
        "Category 7",
        "Category 8",
        "Category 9",
        "Category 10",
      ],
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: [
        {
          title: "Lorem ipsum",
          profit:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of th printing and typesetting industry.",
        },
        {
          title: "Lorem ipsum",
          profit:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of th printing and typesetting industry.",
        },
        {
          title: "Lorem ipsum",
          profit:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of th printing and typesetting industry.",
        },
        {
          title: "Lorem ipsum",
          profit:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of th printing and typesetting industry.",
        },
        {
          title: "Lorem ipsum",
          profit:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of th printing and typesetting industry.",
        },
      ],
    };
  },

  computed: {
    ...mapGetters(["paymentDetails", "ideas", "isInventor"]),
    isDesktop() {
      return (
        this.$vuetify.breakpoint.md ||
        this.$vuetify.breakpoint.lg ||
        this.$vuetify.breakpoint.xl
      );
    },
  },

  created() {
    this.$store.dispatch("getProfile");
  },

  methods: {
    startSearch() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
  },
};
</script>
