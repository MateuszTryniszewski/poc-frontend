<template>
  <Dialog :open="isOpen" @close="$emit('setClose')" class="relative z-50">
    <div class="fixed inset-0 bg-black/10" aria-hidden="true" />

    <div class="fixed inset-0 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4">

        <DialogPanel class="w-full max-w-sm rounded bg-white">
          <DialogTitle><slot name="title"></slot></DialogTitle>
          <DialogDescription></DialogDescription>
          <slot name="content"></slot>
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
      isOpen: Boolean
    }
  )

  defineEmits(['setClose'])

</script>