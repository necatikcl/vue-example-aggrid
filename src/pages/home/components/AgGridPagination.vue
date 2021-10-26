<style lang="postcss">
.ag-pagination {
  @apply p-4 font-medium text-gray-400 text-sm flex lg:flex-row flex-col w-full items-center lg:justify-end;
}
.ag-pagination-select select,
.ag-pagination-btn {
  @apply rounded-md border h-full bg-transparent border-shade-2  p-2 lg:ml-4  cursor-pointer transition-colors duration-500 hover:border-gray-700 dark:border-opacity-25 dark:hover:border-shade-2 dark:hover:border-opacity-50;
}
.ag-pagination-select select {
  @apply appearance-none bg-no-repeat w-16;
  background-position: calc(100% - 0.5rem) center;

  background-image: url("data:image/svg+xml,%3Csvg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L7 7L13 1' stroke='%239999CC' stroke-linecap='round'/%3E%3C/svg%3E%0A");
}
.ag-pagination-select select option:disabled {
  @apply dark:text-white dark:text-opacity-10 transition-colors;
  color: rgba(0, 0, 0, 0.2);
}
.ag-pagination-select option {
  @apply bg-gray-900 border-0;
}
.ag-pagination-numbers,
.ag-pagination-total {
  @apply flex items-center;
}
.ag-pagination-numbers input {
  @apply w-12 text-center pointer-events-none;
}
.ag-pagination-btn {
  @apply mx-1;
}

[disabled]:not([disabled="false"]) {
  @apply pointer-events-none opacity-50;
}
</style>
<template>
  <div class="ag-pagination" :disabled="paginationDisabled === true">
    <div class="ag-pagination-select lg:mr-3 lg:mb-0 mb-3">
      <label class="mr-2">Per page:</label>
      <select v-model="pageSize" @change="update">
        <option disabled>Values</option>
        <option v-for="i in 10" :key="i" :value="i * 10 + ''">
          {{ i * 10 }}
        </option>
      </select>
    </div>
    <div class="ag-pagination-numbers lg:mb-0 mb-3">
      <button
        class="ag-pagination-btn"
        @click="emit('prevPage')"
        :disabled="currentPage === 0"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 14L4 8L10 2" stroke="#9999CC" stroke-linecap="round" />
        </svg>
      </button>
      <input class="ag-pagination-btn" :value="currentPage + 1" readonly />
      <button class="ag-pagination-btn" @click="emit('nextPage')">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 14L12 8L6 2" stroke="#9999CC" stroke-linecap="round" />
        </svg>
      </button>
    </div>
    <div class="lg:ml-3 ag-pagination-total">of {{ totalPage }}</div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "@vue/reactivity";
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPage: {
    type: Number,
    required: true,
  },
  paginationDisabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["updatePageSize", "nextPage", "prevPage"]);
const pageSize = ref("20");
const update = () => {
  emit("updatePageSize", pageSize.value);
};
</script>
