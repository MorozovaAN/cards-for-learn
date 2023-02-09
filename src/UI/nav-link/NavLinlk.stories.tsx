import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'
import { HashRouter } from 'react-router-dom'

import { NavLink } from './NavLink'

export default {
  title: 'NavLink',
  component: NavLink,
  decorators: [
    Story => (
      <HashRouter>
        <Story />
      </HashRouter>
    ),
  ],
} as ComponentMeta<typeof NavLink>

const Template: ComponentStory<typeof NavLink> = args => <NavLink {...args}>{args.url}</NavLink>

export const Default = Template.bind({})

Default.args = {
  styleType: 'primary',
  url: 'Email',
}
