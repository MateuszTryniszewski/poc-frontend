<template>

  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <main>

        <!-- Activity list -->
        <div class="divide-y divide-gray-200 overflow-hidden sm:rounded-lg bg-white shadow sm:my-8">
          <div class="">
            <div class="overflow-auto">
              <div class="border-b border-gray-200 bg-white py-5 px-4 sm:px-6">
                <div class="flex flex-wrap items-center justify-between sm:flex-nowrap">
                  <div class="">
                    <h3 class="text-base font-semibold leading-6 text-gray-900">Płatności cykliczne</h3>
                    <p class="mt-1 text-sm text-gray-500">Twórz płatności generowane automatycznie</p>
                  </div>
                  <div class="flex-shrink-0">
                    <button type="button"
                    @click="dialogState = true"
                    class="relative inline-flex items-center rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white
                    shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                    focus-visible:outline-primary-600">Dodaj</button>
                  </div>
                </div>
              </div>
              <div class="sm:px-6">
              <table class="mt-6 w-full whitespace-nowrap text-left">
                <thead class="border-b border-gray-200 text-sm leading-6 text-dark">
                  <tr>
                    <!-- <th scope="col" class="font-semibold ">Data</th> -->
                    <th scope="col" class="py-2 font-semibold sm:table-cell">Opis</th>
                    <th scope="col" class="py-2 font-semibold sm:table-cell">Typ</th>
                    <th scope="col" class="py-2 font-semibold sm sm:text-left">Kategoria</th>
                    <th scope="col" class="py-2 font-semibold sm:table-cell">Dzień w miesiącu</th>
                    <th scope="col" class="py-2 font-semibold md:table-cell">Kwota</th>
                    <!-- <th scope="col" class="py-2 font-semibold sm:table-cell">Saldo</th> -->
                    <th scope="col" class="py-2 text-right font-semibold sm:table-cell">Akcje</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr v-for="item in activityItems" :key="item.commit">
                    <!-- <td class="truncate text-sm font-medium leading-6 text-dark">{{ item.date }}</td> -->
                    <td class="py-4 text-sm leading-6 text-gray-900 md:table-cell ">{{ item.title }}</td>
                    <td class="py-4 text-sm leading-6 text-gray-900 md:table-cell ">{{ item?.group_type?.name }}</td>
                    <td class="py-4 text-sm leading-6 text-gray-900 md:table-cell ">{{ item?.category?.category }}</td>
                    <td class="py-4 text-sm leading-6 text-gray-900 md:table-cell ">{{ item.day }}</td>
                    <td class="py-4 text-sm leading-6 text-gray-900 md:table-cell ">{{ item.amount }}</td>
                    <!-- <td class="py-4 text-sm leading-6 text-gray-900 md:table-cell ">{{ item.amount }}</td> -->
                    <td class="py-4 text-sm leading-6 text-gray-900 md:table-cell w-24 text-right">
                      <button class="mx-1 px-1 text-secondary-600" title="Edytuj" @click="editRow(item)">
                        <PencilSquareIcon class="h-6 w-6" aria-hidden="true"/>
                      </button>
                      <button class="mx-1 px-1 text-danger-600" title="Usuń" @click="confirmDeleteRow(item)">
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
      </main>

      <DialogComponent :isOpen="dialogState" @setClose="dialogState = false" >
        <template #title>
          <div class="font-bold text-xl px-6 py-2">
           {{ selectedItem?.id ? 'Edytuj' : 'Dodaj' }}
          </div>
        </template>
        <template #content>
          <div class="px-6 py-2">
            <FormKit
              type="form"
              v-model="selectedItem"
              @submit="saveRow"
              submit-label="Zapisz">

              <FormKit type="text" name="title" label="Opis" validation="required"/>
              <FormKit type="number" value="initDate" name="day" label="Dzień generowania wpisu" validation="required"/>
              <FormKit name="group_id" type="radio" label="Typ" validation="required"
                :options="[
                  { label: 'Przychody', value: 1 },
                  { label: 'Koszty', value: 2 }
                ]"
              />
              <FormKit type="select" name="category_id" label="Kategoria" :options="categoriesOptions" validation="required"/>
              <FormKit type="number" name="amount" label="Kwota" validation="required"/>
            </FormKit>
          </div>
        </template>
      </DialogComponent>

      <ConfirmationDialogComponent
        :ConfirmationOpen="ConfirmationDialogState"
        @setConfirm="deleteRow"
        @setClose="ConfirmationDialogState = false" >
      </ConfirmationDialogComponent>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
  TrashIcon,
  PencilSquareIcon
} from '@heroicons/vue/24/outline'
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import DialogComponent from '@/components/DialogComponent.vue'
import ConfirmationDialogComponent from '@/components/ConfirmationDialogComponent.vue'
import { useCategoryStore } from "@/stores/categoryStore";
import { useRecurringStore } from "@/stores/RecurringStore"

const categoryStore = useCategoryStore()
const recurringStore = useRecurringStore()

// const initDate = ref(new Date().toDateString());
const dialogState = ref(false);
const ConfirmationDialogState = ref(false);
const categoriesOptions = computed(() =>
  categoryStore.getCategories.map((item) => ({ ...item, label: item.category, value: item.id }) ))

let selectedItem = reactive({});

const stats = [
  { name: 'Zapisanych wierszy', value: '405' },
  { name: 'przychodów', value: '100' },
  { name: 'kosztów', value: '323' },
  { name: 'kategorii', value: '4' },
]
const statuses = { Completed: 'text-green-400 bg-green-400/10', Error: 'text-rose-400 bg-rose-400/10' }

const activityItems = computed(() => recurringStore.getRecurrings)

function editRow(item) {
  dialogState.value = true;
  selectedItem = item;
}

function confirmDeleteRow(item) {
  ConfirmationDialogState.value = true
  selectedItem = item
}
function deleteRow() {
  ConfirmationDialogState.value = false
  recurringStore.deleteRecurrings(selectedItem.id)
}

async function saveRow() {  
  const row = activityItems.value.findIndex(item => item?.id === selectedItem?.id)

  row === -1
    ? await recurringStore.addRecurrings(selectedItem)
    : await recurringStore.updateRecurrings(selectedItem)

  dialogState.value = false;
}
const sidebarOpen = ref(false);

onMounted(() => recurringStore.fetchRecurrings())
</script>