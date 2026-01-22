import { observer } from "mobx-react-lite"
import { editorStore } from "../../../store/editorStore"
import ItemEditor from "../../widgets/editorScreen/newItem/ItemEditor"
import { settingsStore } from "../../../store/settingsStore"

export default observer(function SettingsEditor() {
  const totalClean = () => {
    editorStore.cleanStorage()
    editorStore.cleanDB()
    settingsStore.loadSettings()
  }
  return (
    <div>

      <ItemEditor />
      <button onClick={totalClean}>clean</button>
    </div>
  )
})
