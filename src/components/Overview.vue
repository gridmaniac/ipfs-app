<template>
  <div class="compact my-15">
    <div class="text-h3 text-center font-weight-bold">{{ title }}</div>
    <div class="text-body2 text-center ma-7">{{ text }}</div>
    <iframe
      height="500"
      src="https://www.youtube.com/embed/wcN_lctOIGw"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      style="width: 100%"
    ></iframe>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["title", "text"],
};
</script>
