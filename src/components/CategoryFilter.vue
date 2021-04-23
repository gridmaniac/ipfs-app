<template>
  <v-container class="lean">
    <v-row>
      <v-col md="3" cols="12"
        ><v-btn v-if="isDesktop" block elevation="0" tile class="py-5"
          >Categories</v-btn
        ><v-select
          v-else
          class="no-br"
          :items="
            categories.map((x) => ({
              value: x._id,
              text: x.title,
            }))
          "
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
          @click:clear="clearSearch"
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
        <v-list
          nav
          dense
          dark
          color="grey darken-3"
          height="400"
          class="overflow-y-auto"
        >
          <div
            v-if="isLoadingCategories"
            class="d-flex justify-center align-center fill-height"
          >
            <v-progress-circular
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item
              v-for="(item, i) in categories"
              :key="i"
              @click="startSearch"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col md="9" cols="12">
        <v-sheet
          v-if="isCategoryLoading"
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
          <v-carousel-item
            v-for="x in categoryIdeas"
            :key="x._id"
            :src="`https://ipfs.io/ipfs/${x.image}`"
          >
            <v-sheet
              color="transparent"
              class="d-flex flex-column align-center justify-center fill-height"
            >
              <div class="display-1 font-weight-medium">
                {{ x.title }}
              </div>
              <div
                class="body-2 mt-3"
                :style="'max-width: ' + (isDesktop ? '350px' : '200px')"
              >
                {{ x.profit }}
              </div>
              <v-btn color="primary" class="mt-3" :to="`/ideas/${x._id}`"
                >Button</v-btn
              >
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
      "categories",
      "isLoadingCategories",
      "isCategoryLoading",
      "categoryIdeas",
    ]),
  },

  methods: {
    clearSearch() {
      this.search = null;
      this.startSearch();
    },
    startSearch() {
      this.$nextTick(() => {
        this.$store.dispatch("getIdeasByCategory", {
          id: this.categories[this.selectedItem]._id,
          search: this.search,
        });
      });
    },
  },

  async created() {
    this.$store.commit("setCategoryIdeas", []);
    this.$store.commit("setCategoryLoading", true);
    await this.$store.dispatch("getCategories");
    this.startSearch();
  },
};
</script>
