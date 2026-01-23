import { observer } from "mobx-react-lite"
import { editorStore } from "../../../../store/editorStore"
import {
  ItemEditorContainer,
  ShowComponentButton,
  ButtonWrapper,
  ButtonCancel,
  ButtonAdd,
  TitleInput,
  TypeInput,
  TypeOption,
  DefaultInput,
  OptionList,
  OptionSubWrapper,
  OptionsTitle,
  ButtonAddStep,
  ActionInput,
} from "./ItemEditor.styled"

import { useRef, useState } from "react"
import CarouselOptionItem from "../carouselOption/CarouselOptionItem"

export default observer(function ItemEditor() {
  const typeRef = useRef(null)
  const titleRef = useRef(null)
  const defaultValueRef = useRef(null)
  const [options, setOptions] = useState([])
  const actionRef = useRef(null)

  const [type, setType] = useState("gauge")
  const [showWidget, setShowWidget] = useState(false)

  const openComponent = () => {
    setShowWidget(true)
  }

  const handleAddClick = () => {
    const data = {
      id: Date.now(),
      type: type,
      title: titleRef.current.value,
      value: defaultValueRef.current.value,
      defaultValue: defaultValueRef.current.value,
      action: actionRef.current.value,
      ...(type === "carousel" && { options }),
    }

    editorStore.postItem(data)

    editorStore.clearFormRefs({
      typeRef,
      titleRef,
      defaultValueRef,
      actionRef,
    })

    setOptions([])
    setType("gauge")
    setShowWidget(false)
  }

  const handleCancelClick = () => {
    editorStore.clearFormRefs({
      typeRef,
      titleRef,
      defaultValueRef,
      actionRef,
    })

    setShowWidget(false)
  }

  const updateOption = (id, itemObj) => {
    setOptions((optionsList) =>
      optionsList.map((option) =>
        option.id === id ? { ...option, ...itemObj } : option,
      ),
    )
  }

  const deleteOption = (id) => {
    setOptions((optionsList) =>
      optionsList.filter((option) => option.id !== id),
    )
  }

  const addOption = () => {
    const optionItem = {
      id: `OPT${Date.now()}`,
      name: "",
      value: "",
    }

    setOptions([...options, optionItem])
  }

  return (
    <div>
      {!showWidget && (
        <ShowComponentButton onClick={openComponent}>
          Create new
        </ShowComponentButton>
      )}

      {showWidget && (
        <ItemEditorContainer>
          <TypeInput
            ref={typeRef}
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <TypeOption value="gauge">gauge</TypeOption>
            <TypeOption value="carousel">carousel</TypeOption>
          </TypeInput>

          <TitleInput type="text" placeholder="Title" ref={titleRef} />

          <DefaultInput
            type="number"
            placeholder="Default Value"
            ref={defaultValueRef}
          />
          {type === "carousel" && (
            <OptionList>
              <OptionSubWrapper>
                <OptionsTitle>Options</OptionsTitle>
                <ButtonAddStep onClick={addOption}>Add Option</ButtonAddStep>
              </OptionSubWrapper>
              {options.map((option, index) => (
                <CarouselOptionItem
                  key={option.id}
                  index={index}
                  option={option}
                  onUpdate={(updates) => updateOption(option.id, updates)}
                  onDelete={() => deleteOption(option.id)}
                />
              ))}
            </OptionList>
          )}
          <ActionInput type="text" placeholder="Action" ref={actionRef} />
          <ButtonWrapper>
            <ButtonCancel onClick={handleCancelClick}>Cancel</ButtonCancel>
            <ButtonAdd onClick={handleAddClick}>Add</ButtonAdd>
          </ButtonWrapper>
        </ItemEditorContainer>
      )}
    </div>
  )
})
