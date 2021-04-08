<template>
  <div>
    <Carousel />
    <Showcases />
    <Landmark />
    <Overview
      title="How it works"
      text="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book."
    />
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
};
</script>
