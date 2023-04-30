import OptionUnstyled from '@mui/base/OptionUnstyled'
import optionUnstyledClasses from '@mui/base/OptionUnstyled/optionUnstyledClasses'
import PopperUnstyled from '@mui/base/PopperUnstyled'
import selectUnstyledClasses from '@mui/base/SelectUnstyled/selectUnstyledClasses'
import styled from '@mui/system/styled'

import sortIcon from 'assets/img/icons/sort.svg'

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
  position:relative;
   
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
  
  @media (max-width: 720px) {
     width: 42px;
     font-size: 0;
     background: var(--color-primary-base);
      
     &:hover, &:focus {
       background: var(--color-primary-dark-100);
       box-shadow: none;
     }
     
     &::after {
       content:'';
       background: url(${sortIcon}) no-repeat;
       background-size: contain;
       position: absolute;
       top: 9px;
       left: 11px;
       height: 25px;
       width: 21px;
     }
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
  
  @media (max-width: 520px) {
   font-size: 13px;
   width: 200px;
  }
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
