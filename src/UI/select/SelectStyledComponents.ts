import OptionUnstyled from '@mui/base/OptionUnstyled/OptionUnstyled'
import optionUnstyledClasses from '@mui/base/OptionUnstyled/optionUnstyledClasses'
import PopperUnstyled from '@mui/base/PopperUnstyled/PopperUnstyled'
import selectUnstyledClasses from '@mui/base/SelectUnstyled/selectUnstyledClasses'
import { styled } from '@mui/system'

export const StyledButton = styled('button')(
  width => `
  font-size: 16px;
  box-sizing: border-box;
  height: 36px;
  width: width;
  padding: 12px;
  border-radius: 10px;
  border:none;
  padding: 0 6px;
  cursor: pointer;
  transition: 0.3s ease-in;
  background: var(--color-background-dark-400);
  color: var(--color-on-primary-light-400);

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

export const StyledListbox = styled('ul')(
  () => `
  font-size: 16px;
  box-sizing: border-box;
  padding: 6px 0;
  margin: 12px 0;
  width: 60px;
  border-radius: 10px;
  overflow: auto;
  outline: 0px;
  background: var(--color-background-dark-400);
  color: var(--color-on-primary-light-400);
  box-shadow: 0px -1px 10px 1px var(--color-on-primary-light-400);
  `
)

export const StyledOption = styled(OptionUnstyled)(
  () => `
  list-style: none;
  padding: 6px 0 6px 14px;
  cursor: pointer;
  transition: 0.3s ease-in;

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

export const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`
