import OptionUnstyled from '@mui/base/OptionUnstyled'
import optionUnstyledClasses from '@mui/base/OptionUnstyled/optionUnstyledClasses'
import PopperUnstyled from '@mui/base/PopperUnstyled'
import selectUnstyledClasses from '@mui/base/SelectUnstyled/selectUnstyledClasses'
import styled from '@mui/system/styled'

export const StyledButton = styled('button')(
  () => `
  font-size: 16px;
  box-sizing: border-box;
  height: 42px;
  width: 240px;
  padding: 0 12px;
  border-radius: 10px;
  text-align: left;
  background: var(--color-background-dark-400);
  color: var(--color-on-primary-light-400);
  outline: none;
  border:none;
  transition: 0.3s ease-in;
  cursor: pointer;
   
  &:hover, &:focus {
    box-shadow: 0 0 0 3px var(--color-primary-base-transparent);
  }
  
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  
  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
      float: right;
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `
)

export const StyledListBox = styled('ul')(
  () => `
  font-size: 16px;
  box-sizing: border-box;
  padding: 6px 0;
  margin: 14px 0;
  width: 240px;
  border-radius: 10px;
  overflow: auto;
  outline: 0px;
  background: var(--color-background-dark-400);
  color: var(--color-on-primary-light-400);
  box-shadow: 0px 7px 15px var(--color-on-primary-light-400);
  `
)

export const StyledOption = styled(OptionUnstyled)(
  () => `
  list-style: none;
  padding: 6px;
  cursor: pointer;

  &:last-of-type {
    border-bottom: none;
  }
  
  &:hover {
    background-color: var(--color-background-dark-500);
  }

  &.${optionUnstyledClasses.selected} {
    background-color: var(--color-on-primary-light-400);
    color: var(--color-background-base);
  }
  `
)

export const StyledGroupRoot = styled('li')`
  list-style: none;
`

export const StyledGroupHeader = styled('span')`
  display: block;
  padding: 10px 0 5px 10px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  color: #5c5c5c;
`

export const StyledGroupOptions = styled('ul')`
  list-style: none;
  margin-left: 0;
  padding: 0;

  > li {
    padding-left: 20px;
  }
`

export const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`
