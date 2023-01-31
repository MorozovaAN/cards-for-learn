import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import icon from '../../assets/img/icons/edit.svg'

import { Button } from './Button'

import 'index.css'

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    styleType: ['primary', 'secondary', 'icon'],
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => (
  <Button {...args}>{args.styleType === 'icon' ? <img src={icon} alt="" /> : 'Button'}</Button>
)

export const Primary = Template.bind({})

Primary.args = {
  styleType: 'primary',
  disabled: false,
}
