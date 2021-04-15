<template>
  <v-carousel vertical vertical-delimiters cycle>
    <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src">
      <v-row class="fill-height py-10 px-5 lean" align="end" justify="start">
        <v-col md="6" xs="12">
          <div class="text-h2 font-weight-medium">Lorem Ipsum</div>
          <div class="text-body1 mt-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </div>
        </v-col>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: require("@/assets/img/carousel-1.jpeg"),
        },
        {
          src: require("@/assets/img/carousel-2.jpeg"),
        },
        {
          src: require("@/assets/img/carousel-3.jpeg"),
        },
        {
          src: require("@/assets/img/carousel-4.jpeg"),
        },
      ],
    };
  },
};
</script>
