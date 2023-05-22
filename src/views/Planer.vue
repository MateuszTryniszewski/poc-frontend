<template>
      <!-- <header class="px-4 sm-px-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4 mt-6">
            <div v-for="(stat, statIdx) in stats" :key="stat.name" :class="['border border-sky-300 bg-sky-100 rounded-md py-6 px-4 sm:px-6 lg:px-8']">
              <p class="text-sm font-medium leading-6 text-gray-900">{{ stat.name }}</p>
              <p class="mt-2 flex items-baseline gap-x-2">
                <span class="text-4xl font-semibold tracking-tight text-dark">{{ stat.value }}</span>
              </p>
            </div>
          </div>
        </header> -->

  <div class="overflow-hidden rounded-lg bg-white shadow my-6 lg:mx-4">
    <div class="px-2 py-5">
      <div class="px-6">
        <div class="sm:flex sm:items-center sm:-mx-4">
          <div class="sm:flex-auto">
            <h1 class="text-base font-semibold leading-6 text-gray-900">Przychody</h1>
            <p class="mt-2 text-sm text-gray-700">Lista Twoich planowanych przychodów</p>
          </div>
          <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button type="button"
            @click="dialogState = true"
            class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm
            font-semibold text-white shadow-sm hover:bg-indigo-500
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-indigo-600">
            Dodaj
          </button>
          </div>
        </div>
        <div class="mt-8 flow-root">
          <div class="-my-2 overflow-x-auto sm:-mx-4">
            <div class="inline-block min-w-full py-2 align-middle px-2">
              <table class="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th v-for="(month, index) in columns" :key="index" class="text-left">
                      {{ month }}
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr  v-for="(row, index) in activityItems" :key="index" >
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {{ row.title }}
                    </td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {{ row['m01'] }}
                    </td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {{ row['m02'] }}
                    </td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {{ row['m03'] }}
                    </td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {{ row['m04'] }}
                    </td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {{ row['m05'] }}
                    </td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {{ row['m06'] }}
                    </td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {{ row['m07'] }}
                    </td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {{ row['m08'] }}
                    </td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {{ row['m09'] }}
                    </td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {{ row['m10'] }}
                    </td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {{ row['m11'] }}
                    </td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {{ row['m12'] }}
                    </td>
                    <td class="py-4 text-sm leading-6 text-gray-900 md:table-cell w-24 text-right">
                      <button class="mx-1 px-1 text-secondary-600" title="Edytuj" @click="editRow(row)">
                        <PencilSquareIcon class="h-6 w-6" aria-hidden="true"/>
                      </button>
                      <button class="mx-1 px-1 text-danger-600" title="Usuń" @click="confirmDeleteRow(row)">
                        <TrashIcon class="h-6 w-6" aria-hidden="true"/>
                      </button>
                    </td>
                  </tr>
                  <tr class="bg-blue-100">
                    <td></td>
                    <td v-for="(sum, ind) in sumsByMth" :key="ind">
                    {{ parseFloat(sum).toFixed(2) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <DialogComponent :isOpen="dialogState" @setClose="dialogState = false">
    <template #title>
      Wprowadź nazwę kategorii
    </template>
    <template #content>
      <FormKit type="form" @submit="saveRow" v-model="selectedItem" submit-label="Zapisz">
        <FormKit
          type="text"
          name="title"
          label="Przychód"
          validation="required"
        />
        <FormKit name="group_id" type="radio" label="Typ" validation="required"
                :options="[
                  { label: 'Przychody', value: 1 },
                  { label: 'Koszty', value: 2 }
                ]"
              />
        <FormKit type="select" name="category_id" label="Kategoria" placeholder="Wybierz kategorię"
          :options="categoriesOptions" validation="required"/>

        <div class="flex flex-wrap">
          <FormKit outer-class="w-1/3" type="number" name="m01" step="0.01" label="Styczeń"/>
          <FormKit outer-class="w-1/3" type="number" name="m02" step="0.01" label="Luty"/>
          <FormKit outer-class="w-1/3" type="number" name="m03" step="0.01" label="Marzec"/>
          <FormKit outer-class="w-1/3" type="number" name="m04" step="0.01" label="Kwiecień"/>
          <FormKit outer-class="w-1/3" type="number" name="m05" step="0.01" label="Maj"/>
          <FormKit outer-class="w-1/3" type="number" name="m06" step="0.01" label="Czerwiec"/>
          <FormKit outer-class="w-1/3" type="number" name="m07" step="0.01" label="Lipiec"/>
          <FormKit outer-class="w-1/3" type="number" name="m08" step="0.01" label="Sierpień"/>
          <FormKit outer-class="w-1/3" type="number" name="m09" step="0.01" label="Wrzesień"/>
          <FormKit outer-class="w-1/3" type="number" name="m10" step="0.01" label="Październik"/>
          <FormKit outer-class="w-1/3" type="number" name="m11" step="0.01" label="Listopad"/>
          <FormKit outer-class="w-1/3" type="number" name="m12" step="0.01" label="Grudzień"/>   
        </div>
        <FormKit
            type="hidden"
            label="Rok"
            value="2022"
            name="year"
          />
      </FormKit>
    </template>
  </DialogComponent>

  <ConfirmationDialogComponent
        :ConfirmationOpen="ConfirmationDialogState"
        @setConfirm="deleteRow"
        @setClose="ConfirmationDialogState = false" >
      </ConfirmationDialogComponent>

</template>

<script setup>

import { ref, reactive, computed, onMounted } from 'vue'
import ConfirmationDialogComponent from '@/components/ConfirmationDialogComponent.vue'
// import type { Ref } from 'vue';
import DialogComponent from '@/components/DialogComponent.vue';
import { useCategoryStore } from "@/stores/categoryStore";
import { usePlanerStore } from "@/stores/PlanerStore"
import {
  TrashIcon,
  PencilSquareIcon
} from '@heroicons/vue/24/outline'
const categoryStore = useCategoryStore()
const planerStore = usePlanerStore()

const ConfirmationDialogState = ref(false);
const dialogState = ref(false);

const stats = [
  { name: 'Zapisanych wierszy', value: '405' },
  { name: 'przychodów', value: '100' },
  { name: 'kosztów', value: '323' },
  { name: 'kategorii', value: '4' },
]
const statuses = { Completed: 'text-green-400 bg-green-400/10', Error: 'text-rose-400 bg-rose-400/10' }

// const total = computed(() => this.activityItems.reduce((accumulator, item) => accumulator + item.value, 0))

const columns = [
  'Nazwa', 'STY', 'LUT', 'MAR', 'KWI', 'MAJ', 'CZE', 'LIP', 'SIE', 'WRZ', 'PAŹ', 'LIS', 'GRU', 'Akcje'
]

const categoriesOptions = computed(() =>
  categoryStore.getCategories.map((item) => ({ ...item, label: item.category, value: item.id }) ))

const activityItems = computed(() => planerStore.getPlaners)

let selectedItem = reactive({
  title: '',
  year: 2022,
  group_id: null,
  category_id: null,
  m01: parseFloat(0).toFixed(2),
  m02: parseFloat(0).toFixed(2),
  m03: parseFloat(0).toFixed(2),
  m04: parseFloat(0).toFixed(2),
  m05: parseFloat(0).toFixed(2),
  m06: parseFloat(0).toFixed(2),
  m07: parseFloat(0).toFixed(2),
  m08: parseFloat(0).toFixed(2),
  m09: parseFloat(0).toFixed(2),
  m10: parseFloat(0).toFixed(2),
  m11: parseFloat(0).toFixed(2),
  m12: parseFloat(0).toFixed(2),
});


function editRow(item) {
  selectedItem = item;
  dialogState.value = true;
}

function confirmDeleteRow(item) {
  ConfirmationDialogState.value = true
  selectedItem = item
}
function deleteRow() {
  ConfirmationDialogState.value = false
  planerStore.deletePlaners(selectedItem.id)
}

async function saveRow() {  
  const row = activityItems.value.findIndex(item => item?.id === selectedItem?.id)

  row === -1
    ? await planerStore.addPlaners(selectedItem)
    : await planerStore.updatePlaners(selectedItem)

  dialogState.value = false;
}

const regex = /^m/;

const sumsByMth = computed(() => {
  const a = {};
  activityItems.value.forEach((row) => {
    Object.keys(row).forEach((month) => {
      if(regex.test(month)){
        if (!a[month]) {
          a[month] = row[month] * 1;
        } else {
          a[month] += row[month] * 1;
        }
      }
    });
  });
  return a
})


onMounted(() => planerStore.fetchPlaners())

</script>