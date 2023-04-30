<template>
  <div class="overflow-hidden rounded-lg bg-white shadow my-6 lg:mx-4">
    <div class="px-4 py-5 sm:p-6">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-base font-semibold leading-6 text-gray-900">Płatności cykliczne</h1>
            <p class="mt-2 text-sm text-gray-700">Twórz płatności generowane autmatcznie</p>
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
                    <th v-for="(month, index) in months" :key="index" class="text-left">
                      {{ month }}
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr>
                    <td v-for="(sum, index) in summary" :key="index" class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{ sum }}</td>
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
      Wprowadź nazwę kategorii
    </template>
    <template #content>
      <FormKit type="form" @submit="addIncome" submit-label="Dodaj">
        <FormKit
          type="text"
          name="income"
          label="Przychód"
          validation="required"
        />
      </FormKit>
    </template>
  </DialogComponent>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import DialogComponent from '@/components/DialogComponent.vue';

const isOpenAddDialog: Ref<boolean> = ref(false);

function addIncome() {
  isOpenAddDialog.value = false
}

const months = [
  'Nazwa','styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec',
  'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'
]

const summary = [
  'Pensja', 100,100,100,100,100,100,100,100,100,100,100,100
]

</script>