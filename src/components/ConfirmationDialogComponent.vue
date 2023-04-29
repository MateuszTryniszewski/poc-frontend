<template>
  <Dialog :open="ConfirmationOpen" @close="$emit('setClose')" class="relative z-50">
    <div class="fixed inset-0 bg-black/10" aria-hidden="true" />

    <div class="fixed inset-0 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4">

        <DialogPanel class="w-full max-w-sm rounded bg-white px-4 py-4 space-y-4">
          <DialogTitle class="font-bold text-xl">Czy na pewno chcesz usunąć?</DialogTitle>

          <button @click="$emit('setClose')" class="rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold">Zamknij</button>
          <button type="button"  @close="$emit('confirm')"
            class="ml-2 relative inline-flex items-center rounded-md bg-danger-500 px-3 py-2 text-sm font-semibold text-white
            shadow-sm hover:bg-danger-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-danger-600">Usuń</button>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
  import {
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription,
  } from '@headlessui/vue';

  defineProps({
      ConfirmationOpen: Boolean
    }
  )

  defineEmits(['confirm','setClose'])

</script>