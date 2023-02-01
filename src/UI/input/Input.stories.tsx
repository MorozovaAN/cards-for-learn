import React from 'react'

import { action } from '@storybook/addon-actions'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Input } from 'UI/input/Input'
import 'index.css'

export default {
  title: 'Input',
  component: Input,
  argTypes: {
    type: {
      description: 'Type of input',
      options: ['text', 'password', 'search'],
      control: {
        type: 'radio',
      },
    },
    textChange: {
      description: 'On/off btn for save current input value',
    },
    inputContainerClassName: {
      description: 'Styles for input container',
    },
    label: {
      description: 'Any label for your input',
    },
    error: {
      description: 'Some error for input',
    },
    textChangeBtnCallback: {
      description: 'Save btn callback',
    },
  },
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = args => {
  return (
    <div style={{ width: '250px' }}>
      <Input {...args} />
    </div>
  )
}

export const Default = Template.bind({})

Default.args = {
  type: 'text',
  label: 'Some label',
  placeholder: 'Write something...',
}
export const ErrorInput = Template.bind({})

ErrorInput.args = {
  type: 'text',
  label: 'email',
  error: 'Some error',
  placeholder: 'Write something...',
}

export const PasswordInput = Template.bind({})

PasswordInput.args = {
  type: 'password',
  label: 'password',
  placeholder: 'Enter ypu password',
}

export const SearchInput = Template.bind({})

SearchInput.args = {
  type: 'search',
  placeholder: 'Write something...',
}

export const InputWithSaveBtn = Template.bind({})

InputWithSaveBtn.args = {
  type: 'text',
  textChange: true,
  textChangeBtnCallback: action('Value was saved'),
  placeholder: 'Write something...',
}
