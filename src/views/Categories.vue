<template>
  <v-container class="lean">
    <div v-if="isInventor">
      <div class="text-h2">You are inventor</div>
      <div v-for="x in ideas" :key="x._id">
        <v-divider></v-divider>
        <div class="ml-5" v-text="x.title"></div>
        <div class="ml-5" v-text="x.profit"></div>
        <div class="ml-5" v-text="x.details"></div>
        <div class="text-h5 ml-5">Files</div>
        <div class="ml-10" v-for="f in x.files" :key="f.name">
          <div v-text="f.name"></div>
          <a
            v-text="'https://ipfs.io/ipfs/' + f.cid"
            :href="'https://ipfs.io/ipfs/' + f.cid"
          ></a>
        </div>
      </div>
    </div>
    <div v-if="paymentDetails">
      <div class="text-h2">You are investor</div>
      {{ JSON.stringify(paymentDetails) }}
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["paymentDetails", "ideas", "isInventor"]),
  },

  created() {
    this.$store.dispatch("getProfile");
  },
};
</script>
