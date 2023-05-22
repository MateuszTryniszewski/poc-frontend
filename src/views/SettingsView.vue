<template>
  <div class="overflow-hidden rounded-lg bg-white shadow my-6 lg:mx-4 max-w-4xl">
    <div class="px-4 py-5 sm:p-6">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-base font-semibold leading-6 text-gray-900">Kategorie</h1>
            <p class="mt-2 text-sm text-gray-700">Konfiguracja Kategorii</p>
          </div>
          <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button type="button"
            @click="isOpenAddDialog = true"
            class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm
            font-semibold text-white shadow-sm hover:bg-indigo-500
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-indigo-600">
            Dodaj
          </button>
          </div>
        </div>
        <div class="mt-8 flow-root">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table class="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th v-for="(column, index) in columns" :key="index" class="text-left">
                      {{ column }}
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr v-for="(category, index) in categories" :key="index">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-0">{{ category.category }}</td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-0">{{ category.income }}</td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-0">{{ category.revenue }}</td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-0">{{ category.color }}</td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-0">{{ category.icon }}</td>
                    <td class="py-4 text-sm leading-6 text-gray-900 md:table-cell w-24 text-right">
                      <button class="mx-1 px-1 text-secondary-600" title="Edytuj" @click="editRow(category)">
                        <PencilSquareIcon class="h-6 w-6" aria-hidden="true"/>
                      </button>
                      <button class="mx-1 px-1 text-danger-600" title="Usuń" @click="deleteRow(category.id)">
                        <TrashIcon class="h-6 w-6" aria-hidden="true"/>
                      </button>
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
  <DialogComponent :isOpen="isOpenAddDialog" @setClose="isOpenAddDialog = false">
    <template #title>
      <div class="py-4">Kategoria</div>
    </template>
    <template #content>
      <FormKit type="form" @submit="saveRow()" v-model="selectedItem"
        :submit-label="selectedItem?.id ? 'Zmień' : 'Dodaj'">
        <FormKit
          type="hidden"
          name="id"
        />
        <FormKit
          type="text"
          name="category"
          label="Kategoria"
          validation="required"
        />
        <FormKit
          type="checkbox"
          label="Przychody"
          name="income"
        />
        <FormKit
          type="checkbox"
          label="Koszty"
          name="revenue"
        />
        <FormKit
          type="color"
          name="color"
          label="Kolor"
        />
        <FormKit
          type="text"
          name="icon"
          label="Ikona"
        />
      </FormKit>
    </template>
  </DialogComponent>

</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'
import type { Ref } from 'vue'
import DialogComponent from '@/components/DialogComponent.vue';
import {TrashIcon,
  PencilSquareIcon
} from '@heroicons/vue/24/outline'

import { useCategoryStore } from "@/stores/categoryStore";

const categoryStore = useCategoryStore()

const isOpenAddDialog: Ref<boolean> = ref(false);
const categories = computed(() => categoryStore.getCategories )

let selectedItem = reactive({});

const columns = [
  'Nazwa', 'Przychody','Koszty', 'Kolor', 'Ikona'
]

function editRow(item: any) {
  isOpenAddDialog.value = true;
  selectedItem = item;
}

function deleteRow(id: any) {
  categoryStore.deleteCategory(id)
}

async function saveRow() {
  const row = categories.value.findIndex((item: any) => item?.id === selectedItem?.id)
  row === -1 ? await categoryStore.addCategory(selectedItem) : await categoryStore.updateCategory(selectedItem)
  isOpenAddDialog.value = false;
}

onMounted(() => categoryStore.fetchCategories())
</script>