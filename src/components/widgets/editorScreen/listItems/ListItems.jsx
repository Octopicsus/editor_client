import { observer } from "mobx-react-lite"
import { editorStore } from "../../../../store/editorStore"
import {
  ListWrapper,
  Item,
  Wrapper,
  SubWrapper,
  Label,
  TitleStep,
  OptionLable,
  Container,
  Type,
  Title,
  Default,
  OptionsWrapper,
  OptionItem,
  OptionName,
  OptionValue,
  Action,
  ButtonWrapper,
  EditButton,
  RemoveButton,
  NavWrapper,
  ButtonNav,
} from "./ListItems.styled"

export default observer(function ListItems() {
  const itemsList = editorStore.getAllItems()

  return (
    <div>
      <ListWrapper>
        {itemsList.map((item, index) => (
          <Item key={item.id}>
            <NavWrapper>
              <ButtonNav>+</ButtonNav>
              <ButtonNav>-</ButtonNav>
            </NavWrapper>

            <Wrapper>
              <Label>Type: </Label>
              <Type value={item.type} />
            </Wrapper>

            <Wrapper>
              <Label>Title: </Label>
              <Title value={item.title} />
            </Wrapper>

            <Wrapper>
              <Label>Deafult Value: </Label>
              <Default value={item.defaultValue} />
            </Wrapper>

            {item.type === "carousel" && (
              <Wrapper>
                <Label>Options: </Label>
                <OptionsWrapper>
                  {item.options.map((itemOption, index) => (
                    <OptionItem key={itemOption.id}>
                      <TitleStep>STEP - {index + 1}</TitleStep>
                      <SubWrapper>
                        <Container>
                          <OptionLable>Title: </OptionLable>
                          <OptionName value={itemOption.name} />
                        </Container>

                        <Container>
                          <OptionLable>Value: </OptionLable>
                          <OptionValue value={itemOption.value} />
                        </Container>
                      </SubWrapper>
                    </OptionItem>
                  ))}
                </OptionsWrapper>
              </Wrapper>
            )}

            <Wrapper>
              <Label>Action: </Label>
              <Action value={item.action} />
            </Wrapper>

            <ButtonWrapper>
              <RemoveButton>remove</RemoveButton>
              <EditButton>edit</EditButton>
            </ButtonWrapper>
          </Item>
        ))}
      </ListWrapper>
    </div>
  )
})
