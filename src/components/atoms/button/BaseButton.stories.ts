import type { Meta, StoryObj } from '@storybook/vue3';

import Button from './BaseButton.vue'

const meta: Meta<typeof Button> = {
  title: 'Example/Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    backgroundColor: { control: 'color' },
    onClick: { action: 'clicked' },
  },
  args: { primary: false }, // default value
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    primary: true,
    secondary: false,
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    secondary: true,
    label: 'Button',
  },
};

export const Danger: Story = {
  args: {
    danger: true,
    label: 'Button',

  },
};

export const Success: Story = {
  args: {
    success: true,
    label: 'Button',
  },
};

export const CustomColors: Story = {
  args: {
    label: 'Button',
    backgroundColor: 'bg-orange-300',
    textColor: 'text-orange-900'
  },
};

export const Disabled: Story = {
  args: {
    label: 'Button',
    backgroundColor: 'bg-orange-300',
    textColor: 'text-orange-900',
    disabled: true,
  },
};


export const Large: Story = {
  args: {
    label: 'Button',
    size: 'large',
  },
};

export const Small: Story = {
  args: {
    label: 'Button',
    size: 'small',
  },
};

export const Outline: Story = {
  args: {
    label: 'Button',
    outline: true,
  },
};
