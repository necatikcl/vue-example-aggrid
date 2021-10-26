<template>
  <div class="box">
    <div class="box-title">Zeo</div>
    <AgGrid />
  </div>
</template>

<script lang="ts">
import AgGrid from "./components/AgGrid.vue";
export default {
  components: {
    AgGrid,
  },
};
</script>

<style lang="postcss">
.box {
  @apply bg-white
  text-gray-400
  h-full rounded-md flex flex-col
  
  dark:bg-gray-800 dark:text-gray-200 transition-colors;

  box-shadow: 0px 2px 6px rgba(49, 49, 77, 0.04);
}

.box-title {
  @apply py-4 px-5 text-2xl font-semibold;
}
</style>
