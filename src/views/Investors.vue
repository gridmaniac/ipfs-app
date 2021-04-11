<template>
  <div>
    <Overview
      title="Investors"
      text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    >
      <div class="d-flex justify-center mt-7">
        <v-btn large color="primary" to="investors/signup">Join now</v-btn>
      </div>
    </Overview>
  </div>
</template>

<script>
import Overview from "@/components/Overview";

export default {
  components: {
    Overview,
  },
};
</script>
