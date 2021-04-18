<template>
  <v-app>
    <Header :isLoggedIn="isLoggedIn" />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { mapGetters } from "vuex";

export default {
  name: "App",

  components: {
    Header,
    Footer,
  },

  computed: {
    ...mapGetters(["isLoggedIn"]),
  },

  watch: {
    $route(to) {
      document.title = to.meta.title || "IPFS App";
    },
  },
};
</script>

<style>
.temporary-logo {
  background: #989898;
  width: 150px;
  height: 30px;
  cursor: pointer;
}

.lean {
  max-width: 1100px;
  margin: 0 auto;
}

.compact {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.v-carousel__controls {
  right: 0 !important;
}

.v-image__image--cover {
  filter: brightness(50%);
}

.restore-brightness .v-image__image--cover {
  filter: brightness(100%);
}

.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  box-shadow: none !important;
  background: #f3f3f3 !important;
}

.v-select.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  background: #fff !important;
  border: 1px solid #eaeaea;
}

.v-stepper__step__step {
  width: 40px !important;
  height: 40px !important;
  font-size: 18px !important;
}

.v-input__append-outer {
  margin: 0 !important;
}

.no-br {
  border-radius: 0;
}

.text-small {
  font-size: 11px;
}

.v-overlay__content {
  width: 100% !important;
  display: flex;
  justify-content: space-between;
}

.v-progress-circular__info {
  color: #fff !important;
}

.v-progress-circular__underlay {
  stroke: #f1f1f1;
  stroke-width: 1.5 !important;
}
</style>
