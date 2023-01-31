import 'index.css'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Checkbox } from './Checkbox'

export default {
  title: 'Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>

const Template: ComponentStory<typeof Checkbox> = args => <Checkbox {...args}>Checkbox</Checkbox>

export const Default = Template.bind({})

Default.args = {
  checked: false,
  disabled: false,
}
