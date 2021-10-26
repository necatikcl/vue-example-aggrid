<template>
  <div class="flex flex-col items-end flex-1">
    <AgGridVue
      style="width: 100%; flex: 1"
      class="ag-wrapper"
      :columnDefs="columnDefs"
      :rowHeight="38"
      :headerHeight="38"
      :pagination="true"
      :suppressPaginationPanel="true"
      :suppressScrollOnNewData="true"
      :paginationPageSize="20"
      :cacheBlockSize="1000"
      rowModelType="serverSide"
      serverSideStoreType="full"
      :loadingCellRendererFramework="AgGridLoader"
      :animateRows="true"
      groupDisplayType="custom"
      rowSelection="single"
      @selection-changed="onSelectionChanged"
      @grid-ready="onGridReady"
    />
    <AgGridPagination
      @updatePageSize="updatePageSize"
      @nextPage="nextPage"
      @prevPage="prevPage"
      :currentPage="currentPage"
      :totalPage="totalPage"
      :paginationDisabled="paginationDisabled"
    />

    <teleport to="body">
      <AgGridModal
        :open="modalOpen"
        @onCloseModal="onCloseModal"
        :data="selectedRow"
      />
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import "ag-grid-community/dist/styles/ag-grid.css";
import "./AgGrid.css";

import { ref } from "@vue/reactivity";
import "ag-grid-enterprise";

import { AgGridVue } from "ag-grid-vue3";

import AgGridPagination from "./AgGridPagination.vue";
import AgGridLoader from "./AgGridLoader.vue";
import AgGridModal from "./AgGridModal.vue";

import server from "../../../base/server";
import { minifyNumber, getVolumeSVG, cellBadgeRenderer } from "../scripts";

const domain = "akakce.com";

export interface RowItem {
  id?: number;
  avgSearchVolume: number;
  cpc: number;
  diffPixelRank: number;
  diffRank: number;
  keyword: string;
  landingPage: string;
  pixelRank: number;
  rank: number;
  modal: string;
}
const rowData = ref<RowItem[]>([]);

const columnDefs = [
  {
    headerName: "Keywords",
    field: "keyword",
    flex: "1",
    minWidth: 400,
  },
  {
    headerName: "Search Volume",
    field: "avgSearchVolume",
    sortable: true,
    cellRenderer: (params: any) =>
      `
        ${getVolumeSVG(params.value)}
        ${minifyNumber(params.value)}
      `,
    width: 150,
  },
  {
    headerName: "Rank",
    field: "rank",
    sortable: true,
    width: 100,
    cellRenderer: (params: any) => {
      return `
      ${params.value}
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 0L6.17557 3.38197L9.75528 3.45492L6.90211 5.61803L7.93893 9.04508L5 7L2.06107 9.04508L3.09789 5.61803L0.244718 3.45492L3.82443 3.38197L5 0Z" fill="#FFBF40"/>
      </svg>
`;
    },
  },
  {
    headerName: "Change",
    field: "diffRank",
    sortable: true,
    width: 100,
    cellRenderer: cellBadgeRenderer,
  },
  {
    headerName: "PX Rank",
    field: "pixelRank",
    sortable: true,
    width: 100,
    cellRenderer: (params: any) => {
      return minifyNumber(params.value);
    },
  },
  {
    headerName: "Change",
    field: "diffPixelRank",
    sortable: true,
    width: 100,
    cellRenderer: cellBadgeRenderer,
  },
  {
    headerName: "url-page",
    field: "landingPage",
    flex: 1,
    cellRenderer: (params: any) => {
      const url = `https://${domain}/${params.value}`;
      return `<a href='${url}'>${params.value ? params.value : "/"}</a>`;
    },
  },
  {
    headerName: "CPC - $",
    field: "cpc",
    sortable: true,
  },
];

// onMounted(() => getItems(1, domain));

let gridParams = {};
let gridAPI: any = ref({});
let currentPage = ref(1);
let totalPage = ref(0);

const updateData = (data: RowItem[], callback: () => void) => {
  var dataSource = {
    rowCount: null,
    getRows: function (gridParams: any) {
      setTimeout(function () {
        var rowsThisPage = data;
        var lastRow = -1;
        if (data.length <= gridParams.endRow) {
          lastRow = data.length;
        }
        gridParams.successCallback(rowsThisPage, lastRow);
        callback();
      }, 500);
    },
  };
  gridAPI.value.setServerSideDatasource(dataSource);
};

const loadData = (page: number, limit: number) => {
  const lock = lockPagination();

  page++;
  server.getItems({ domain, page: page, limit }).then((res) => {
    if (res !== false) {
      /*@ts-ignore*/
      res.data.forEach((item) => (item.modal = ""));

      /*@ts-ignore*/
      updateData(res.data, lock.open);
    }
  });
};

const onGridReady = (params: any) => {
  gridParams = params;
  gridAPI.value = params.api;
  currentPage.value = gridAPI.value.paginationGetCurrentPage();

  loadData(0, 20);
};

const paginationDisabled = ref(false);
const lockPagination = () => {
  paginationDisabled.value = true;
  return { open: () => (paginationDisabled.value = false) };
};

const updatePageSize = (e: string) => {
  gridAPI.value.paginationSetPageSize(+e);

  loadData(currentPage.value, gridAPI.value.paginationGetPageSize());
};
const nextPage = () => {
  currentPage.value++;

  loadData(currentPage.value, gridAPI.value.paginationGetPageSize());
};
const prevPage = () => {
  if (currentPage.value < 1) return;
  currentPage.value--;

  loadData(currentPage.value, gridAPI.value.paginationGetPageSize());
};

const selectedRow = ref<RowItem>();
const modalOpen = ref(false);

const onSelectionChanged = () => {
  selectedRow.value = gridAPI.value.getSelectedRows()[0];
  modalOpen.value = true;
};

const onCloseModal = () => {
  modalOpen.value = false;
};
</script>
