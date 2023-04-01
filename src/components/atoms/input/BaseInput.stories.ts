import type { Meta, StoryObj } from '@storybook/vue3';

import BaseInput from './BaseInput.vue'

const meta: Meta<typeof BaseInput> = {
  title: 'Example/Atoms/Input',
  component: BaseInput,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BaseInput>;

export const Text: Story = {
  args: {
   type: 'text',
   name: 'Input',
   label: 'Pole tekstowe'
  },
};

export const Password: Story = {
  args: {
   type: 'password',
   name: 'Input',
   label: 'Hasło'
  },
};

export const Email: Story = {
  args: {
   type: 'email',
   name: 'Input',
   label: 'Email'
  },
};

export const TextWithHelp: Story = {
  args: {
   type: 'email',
   name: 'Input',
   help: 'To jest wskazówka do pola tekstowego',
   label: 'Pole tekstowe'
  },
};

export const RequiredField: Story = {
  args: {
   type: 'text',
   name: 'Input',
   label: 'Pole tekstowe',
   validation: 'required|matches:/^[a-zA-Z]+$/|length:5',
   validationMessages: { matches: "Pole wymagane"}
  },
};

export const Select: Story = {
  args: {
   type: 'select',
   name: 'Input',
   label: 'Pole tekstowe',
   validation: 'required',
   validationMessages: { matches: "Pole wymagane"}
  },
};


