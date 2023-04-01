<template>
  <FormKit
    :type="type"
    :label="label"
    :name="name"
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

const props = withDefaults(defineProps<{
  type: string,
  label: string,
  name: string,
  help?: string,
  validation?: string,
  validationMessages?: any,
}>(), {
  type: 'text',
});

// const emit = defineEmits<{
//   (e: 'click', id: number): void;
// }>();

// const buttonBackgroundColor = computed(() => {
//   if (props.primary) return 'bg-primary-500 hover:bg-orange-600 text-white';
//   if (props.secondary) return 'bg-primary-200 hover:bg-primary-300 text-primary-900';
//   if (props.success) return 'bg-success-500 hover:bg-success-600 text-white';
//   if (props.danger) return 'bg-danger-500 hover:bg-danger-600 text-white';
//   if (props.backgroundColor) return props.outline
//     ? `bg-transparent border border-${props.backgroundColor} hover:bg-${props.backgroundColor}`
//     : `bg-${props.backgroundColor} hover:bg-stone-300`;
//   return 'bg-gray-300 hover:bg-gray-400 text-gray-800';
// });

// const buttonTextColor = computed(() => {
//   return props.textColor ? `text-${props.textColor}`: ''
// })

// const buttonSize = computed(() => {
//   if (props.size === 'large') return 'py-3 px-5';
//   if (props.size === 'small') return 'py-1 px-3';
//   return 'py-2 px-4';
// })

// const onClick = () => {
//   emit("click", 1)
// };

</script>