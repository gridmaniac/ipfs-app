<template>
  <div>
    <Carousel />
    <Showcases />
    <Landmark />
    <Overview />
  </div>
</template>

<script>
import Carousel from "@/components/Carousel";
import Landmark from "@/components/Landmark";
import Showcases from "@/components/Showcases";
import Overview from "@/components/Overview";

export default {
  components: {
    Carousel,
    Landmark,
    Showcases,
    Overview,
  },

  data() {
    return {};
  },
};
</script>
