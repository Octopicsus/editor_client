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
} from "./SettingsEditor.styled"

import { useRef } from "react"

export default observer(function SettingsEditor() {
  const typeRef = useRef(null)
  const titleRef = useRef(null)
  const valueRef = useRef(null)
  const defaultValueRef = useRef(null)

  const handleAddClick = () => {
    const data = {
      type: typeRef.current.value,
      title: titleRef.current.value,
      value: valueRef.current.value,
      defaultValue: defaultValueRef.current.value,
    }

    editorStore.addItem(data)

    editorStore.clearFormRefs({
      typeRef,
      titleRef,
      valueRef,
      defaultValueRef,
    })
  }

  return (
    <div>
      <ItemEditor>
        <TypeInput ref={typeRef}>
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

        <ButtonAdd onClick={handleAddClick}>Add</ButtonAdd>
        <button onClick={editorStore.cleanSession}>clean</button>
      </ItemEditor>
    </div>
  )
})
