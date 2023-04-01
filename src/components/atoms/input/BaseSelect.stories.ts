import type { Meta, StoryObj } from '@storybook/vue3';

import BaseSelect from './BaseSelect.vue'

const meta: Meta<typeof BaseSelect> = {
  title: 'Example/Atoms/Select',
  component: BaseSelect,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BaseSelect>;

export const Select: Story = {
  args: {
   type: 'select',
   name: 'Input',
   label: 'Pole tekstowe',
   options: [
    {label: 'test 1', value: 'value1'},
    {label: 'test 2', value: 'value2'},
    {label: 'test 3', value: 'value3'},
    {label: 'test 4', value: 'value4'},
    {label: 'test 5', value: 'value5'}
  ]
  },
};


