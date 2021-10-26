<template>
  <transition name="modal">
    <div class="modal-wrapper" @click="onClickOutside" v-show="open">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-big-title">
            <div class="modal-tag">Keyword</div>
            <div class="modal-title">
              {{
                //@ts-ignore
                data.keyword
              }}
            </div>
          </div>
          <button class="modal-close" @click="$emit('onCloseModal')">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.17582 20L12.0879 12.0879M12.0879 12.0879L20 4.17582M12.0879 12.0879L4 4M12.0879 12.0879L19.8242 19.8242"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <div class="modal-header">
            <div class="modal-inner-title">Search Volume</div>
            <div class="modal-inner-desc">{{ data.keyword }}</div>
          </div>
          <div class="modal-body">
            <ApexCharts
              width="100%"
              type="bar"
              :options="options"
              :series="series"
            />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { onUnmounted } from "vue";
import ApexCharts from "vue3-apexcharts";
import { minifyNumber } from "../scripts";
import { RowItem } from "./AgGrid.vue";
import server from "../../../base/server";
const props = defineProps({
  open: Boolean,
  data: {
    default: {
      avgSearchVolume: 0,
      cpc: 0,
      diffPixelRank: 0,
      diffRank: 0,
      keyword: "",
      landingPage: "",
      pixelRank: 0,
      rank: 0,
      modal: "",
    } as RowItem,
    type: Object,
  },
});
const emit = defineEmits(["onCloseModal"]);
const onClickOutside = (e: any) => {
  const clss = e.path[0].classList;
  if (clss.contains("modal-wrapper") || clss.contains("modal-dialog")) {
    emit("onCloseModal");
  }
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const options = ref({
  chart: {
    id: "ag-grid-modal",
  },
  xaxis: {
    categories: months,
    labels: {
      formatter: function (value: any, timestamp: any) {
        const year = value.slice(value.length - 4, value.length);
        return value.slice(0, 3).toUpperCase() + " " + year;
      },
    },
  },
  yaxis: {
    labels: {
      formatter: function (value: string) {
        return minifyNumber(+value);
      },
    },
  },
  plotOptions: {
    bar: {
      columnWidth: "60%",
    },
  },
  colors: ["#9999CC"],
  dataLabels: { enabled: false },
  tooltip: {
    x: { formatter: (value: string) => value },
  },
});

const series = ref([
  {
    name: "Search Volume",
    data: [] as Number[],
  },
]);

interface Item {
  date: string;
  volume: number;
}
watch(
  () => props.data,
  () => {
    if (props.data.keyword) {
      setTimeout(() => {
        server
          .getItemDetails({ keyword: props.data.keyword })
          .then((res: any) => {
            let newSeries: Number[] = [];
            let newAxis: String[] = [];

            res.data.forEach((item: Item) => {
              let date = item.date.split("-"); // 2021-12-01 [YEAR, MONTH, DAY]
              let year = date[0];
              let month = months[+date[1] - 1];

              newAxis.push(month + " " + year);
              newSeries.push(item.volume);
            });

            // @ts-ignore
            window.ApexCharts.exec("ag-grid-modal", "updateOptions", {
              xaxis: {
                categories: newAxis,
              },
            });
            series.value[0].data = newSeries;
          });
      }, 300);
    }
  }
);

const catchEscape = (e: KeyboardEvent) => {
  if (e.code === "Escape") {
    emit("onCloseModal");
  }
};

onMounted(() => window.addEventListener("keyup", catchEscape));
onUnmounted(() => window.removeEventListener("keyup", catchEscape));
</script>
<style lang="postcss">
.modal-wrapper {
  @apply fixed top-0 left-0 h-screen w-screen flex justify-center items-end bg-gray-400 bg-opacity-75 p-4;
}
.modal-dialog {
  @apply mx-auto w-full;
}
.modal-content {
  max-width: 600px;

  @apply lg:p-8 p-4 bg-white dark:bg-gray-900 w-full rounded-md transition-all duration-700 relative mx-auto;
}

.modal-close {
  @apply flex justify-end cursor-pointer w-full text-gray-300 hover:text-gray-500 transition-colors;
}
.modal-close svg {
  @apply h-5 w-5;
}
.modal-inner-title {
  @apply font-medium -mt-6 text-gray-300 uppercase;
}
.modal-inner-desc {
  @apply text-sm text-gray-400;
}

.modal-tag,
.modal-title {
  @apply text-white text-center;
}
.modal-tag {
  @apply text-sm  mb-2 uppercase tracking-widest opacity-50;
}
.modal-title {
  @apply text-4xl mb-8;
}
.modal-big-title {
  @apply absolute -translate-y-full left-1/2 -translate-x-1/2 w-full -top-1;
}
.modal-enter-active {
  @apply transition-all;
}

.modal-leave-active {
  @apply transition-all duration-500;
}

.modal-enter-from,
.modal-leave-to {
  @apply opacity-0;
}
.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: translateY(250%) scale(0.1);
}

.modal-header {
  @apply mb-8;
}

.modal-body {
  @apply -ml-4 -mb-8;
  width: calc(100% + 1.25rem);
}

.apexcharts-text {
  @apply text-gray-300;
}
.apexcharts-text > * {
  @apply fill-current;
}
.apexcharts-gridlines-horizontal {
  @apply opacity-20;
}
.apexcharts-menu-icon svg {
  @apply text-gray-200 hover:text-gray-300 fill-current;
}
</style>
