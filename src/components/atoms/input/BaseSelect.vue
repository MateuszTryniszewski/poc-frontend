<template>
  <FormKit
    type="select"
    :label="label"
    :name="name"
    :options="options"
    :help="help"
    :validation="validation"
    :validation-messages="validationMessages"
    outer-class="mb-5"
    label-class="block text-gray-700 text-sm font-bold mb-1"
    inner-class="max-w-md"
    input-class="border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 hover:border-primary-200 focus:border-primary-500 focus:outline-none"
    help-class="text-xs pt-1 text-gray-500"
  />
</template>

<script lang="ts" setup>
// import { computed } from 'vue';
export interface FormKitOptionItem {
  label: string,
  value: unknown,
};

const props = withDefaults(defineProps<{
  label: string,
  name: string,
  options: FormKitOptionItem[]|[string],
  help?: string,
  validation?: string,
  validationMessages?: any,
}>(), {

});



</script>