<template>
    <div class="relative isolate overflow-hidden">
      <div class="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
        <dl class="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
          <div v-for="(stat, statIdx) in stats" :key="stat.name" :class="[statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '', 'flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8']">
            <dt class="text-sm font-medium leading-6 text-gray-500">{{ stat.name }}</dt>
            <dd :class="[stat.changeType === 'negative' ? 'text-rose-600' : 'text-gray-700', 'text-xs font-medium']">{{ stat.change }}</dd>
            <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">{{ stat.value }}</dd>
          </div>
        </dl>
      </div>

      <div class="absolute left-0 top-full -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-ml-96 sm:-mt-10 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50" aria-hidden="true">
        <div class="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]" style="clip-path: polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)" />
      </div>
    </div>

    <div class="space-y-16 py-16 xl:space-y-20">
      <!-- Recent activity table -->
      <div>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 class="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">Płatności cykliczne</h2>
        </div>
        <div class="mt-6 overflow-hidden border-t border-gray-100">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <table class="w-full text-left">
                <thead class="sr-only">
                  <tr>
                    <th>Amount</th>
                    <th class="hidden sm:table-cell">Client</th>
                    <th>More details</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="recurringStore.recurrings.length > 0" v-for="item in recurringStore.recurrings" :key="item.dateTime">
                    <tr class="text-sm leading-6 text-gray-900">
                      <th scope="colgroup" colspan="3" class="relative isolate py-2 font-semibold">
                        <time :datetime="item.created_at">Dzień generowania transakcji w miesiącu:
                          <span class="border rounded-md bg-sky-500 text-white border-sky-700 px-4">{{ item.day }}</span>
                        </time>
                        <div class="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                        <div class="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                      </th>
                    </tr>
                    <tr>
                      <td class="relative py-5 pr-6">
                        <div class="flex gap-x-6">
                          <div class="flex-auto">
                            <div class="flex items-start gap-x-3">
                              <div class="text-sm font-medium leading-6 text-gray-900">{{ item.title }}</div>
                              <div class='rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'>{{ item.group_type.name }}</div>
                            </div>
                            <div class="mt-1 text-xs leading-5 text-gray-500">Wpis generowany {{ item.day }} dnia w miesiącu</div>
                          </div>
                        </div>
                        <div class="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                        <div class="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                      </td>
                      <td class="py-5 text-right">
                        <div class="flex justify-end">
                          Kwota:  {{ item.amount }} PLN
                        </div>
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td>Brak danych</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'
import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
  Bars3Icon,
  EllipsisHorizontalIcon,
  PlusSmallIcon,
} from '@heroicons/vue/20/solid'
import { BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'

import { useCategoryStore } from "@/stores/categoryStore";
import { useTrackerStore } from "@/stores/trackerStore"
import { useRecurringStore } from '@/stores/RecurringStore'

const categoryStore = useCategoryStore()
const trackerStore = useTrackerStore()
const recurringStore = useRecurringStore()

const getIncomingCount = computed(() => trackerStore?.getIncomingCount || 0)
const getRevenuesCount = computed(() => trackerStore?.getRevenuesCount || 0)
const getRowCount = computed(() => trackerStore?.getRowCount || 0)
const saldo = computed(() => trackerStore?.saldo || 0)

const stats = [
  { name: 'Przychodów', value: getIncomingCount, subname: 'Kwota' , subValue: trackerStore.getIncomingSum  },
  { name: 'Kosztów', value: trackerStore.getRevenuesCount, subname: 'Kwota' , subValue: trackerStore.getRevenuesSum },
  { name: 'Ogółem wierszy', value: trackerStore.getRowCount, },
  { name: 'Saldo', value: trackerStore.saldo },
]


const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Invoices', href: '#' },
  { name: 'Clients', href: '#' },
  { name: 'Expenses', href: '#' },
]

const statuses = {
  Paid: 'text-green-700 bg-green-50 ring-green-600/20',
  Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
}

const mobileMenuOpen = ref(false);

onMounted(async () => {
  await nextTick()
    trackerStore.fetchTrackers(),
    recurringStore.fetchRecurrings()
  }
)
</script>