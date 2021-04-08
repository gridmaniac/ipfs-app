<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "App",

  components: {
    Header,
    Footer,
  },
};
</script>

<style>
.temporary-logo {
  background: #989898;
  width: 150px;
  height: 30px;
}

.lean {
  max-width: 1100px;
  margin: 0 auto;
}

.compact {
  max-width: 900px;
  margin: 0 auto;
}
</style>
