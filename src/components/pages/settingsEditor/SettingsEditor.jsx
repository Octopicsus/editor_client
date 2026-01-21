import { observer } from "mobx-react-lite"
import { editorStore } from "../../../store/editorStore"
import {
  ItemEditor,
  ButtonAdd,
  TitleInput,
  TypeInput,
  TypeOption,
  ValueInput,
  DefaultInput,
  OptionList,
  OptionSubWrapper,
  OptionsTitle,
  ButtonAddStep,
  ActionInput,
} from "./SettingsEditor.styled"

import { useRef, useState } from "react"
import CarouselOptionItem from "../../widgets/carouselOption/CarouselOptionItem"

export default observer(function SettingsEditor() {
  const typeRef = useRef(null)
  const titleRef = useRef(null)
  const valueRef = useRef(null)
  const defaultValueRef = useRef(null)
  const [options, setOptions] = useState([])
  const actionRef = useRef(null)

  const [type, setType] = useState("")

  const handleAddClick = () => {
    const data = {
      id: Date.now(),
      type: typeRef.current.value,
      title: titleRef.current.value,
      value: valueRef.current.value,
      defaultValue: defaultValueRef.current.value,
      action: actionRef.current.value,
      ...(type === "carousel" && { options }),
    }

    editorStore.postItem(data)

    editorStore.clearFormRefs({
      typeRef,
      titleRef,
      valueRef,
      defaultValueRef,
      actionRef,
    })
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

  const totalClean = () => {
    editorStore.cleanStorage()
    editorStore.cleanDB()
  }

  console.log(options)

  return (
    <div>
      <ItemEditor>
        <TypeInput
          ref={typeRef}
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          <TypeOption value="gauge">gauge</TypeOption>
          <TypeOption value="carousel">carousel</TypeOption>
        </TypeInput>

        <TitleInput type="text" placeholder="Title" ref={titleRef} />
        <ValueInput type="number" placeholder="Value" ref={valueRef} />
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

        <ButtonAdd onClick={handleAddClick}>Add</ButtonAdd>
      </ItemEditor>

      <button onClick={totalClean}>clean</button>
    </div>
  )
})
