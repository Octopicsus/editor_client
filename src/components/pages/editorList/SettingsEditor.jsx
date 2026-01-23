import { observer } from "mobx-react-lite"

import ItemEditor from "../../widgets/editorScreen/newItem/ItemEditor"

import ListItems from "../../widgets/editorScreen/listItems/ListItems"
import { Screen } from "./SettingsEditor.styled"

export default observer(function SettingsEditor() {
  return (
    <Screen>
      <ListItems />
      <ItemEditor />
    </Screen>
  )
})
