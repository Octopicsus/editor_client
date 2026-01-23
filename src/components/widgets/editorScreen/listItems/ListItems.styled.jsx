import styled from "styled-components"
import "../../../styles/colors.css"

const BaseInput = styled.input.attrs({
  readOnly: true,
})`
  pointer-events: none;
  user-select: none;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
`

const BaseSubInput = styled.input.attrs({
  readOnly: true,
})`
  pointer-events: none;
  user-select: none;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
`

////////////////////////////////////////////////////////////////////

export const ListWrapper = styled.div`
  width: 500px;
`

export const Item = styled.div`
  width: 100%;
  margin-bottom: 5px;
  background-color: var(--color-bg-dark);
  position: relative;
`

export const NavWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`

export const ButtonNav = styled.button``

export const Wrapper = styled.div``

export const SubWrapper = styled.div``

export const Container = styled.div``

export const Label = styled.label`
  user-select: none;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
`

export const TitleStep = styled.label`
  user-select: none;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
`

export const OptionLable = styled.label`
  user-select: none;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
`

export const Type = styled(BaseInput)`
  pointer-events: none;
`

export const Title = styled(BaseInput)`
  pointer-events: none;
`

export const Default = styled(BaseInput)`
  pointer-events: none;
`

export const OptionsWrapper = styled.div``

export const OptionItem = styled.div``

export const OptionName = styled(BaseSubInput)`
  pointer-events: none;
`

export const OptionValue = styled(BaseSubInput)`
  pointer-events: none;
`

export const Action = styled(BaseInput)`
  pointer-events: none;
`

export const ButtonWrapper = styled.div`
  user-select: none;
`

export const EditButton = styled.button``

export const RemoveButton = styled.button`
  opacity: 50%;
`
