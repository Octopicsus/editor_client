import { Routes, Route, Navigate } from "react-router-dom"
import { Root } from "./App.styled"
import SettingsList from "../settingsList/SettingsList"
import SettingsEditor from "../settingsEditor/SettingsEditor"
import { observer } from "mobx-react-lite"
import Menu from "../../widgets/menu/Menu"

function App() {
  return (
    <Root>
      <Menu />

      <Routes>
        <Route path="/" element={<Navigate to="/settings" />} />

        <Route path="/settings" element={<SettingsList />} />
        <Route path="/editor" element={<SettingsEditor />} />
      </Routes>
    </Root>
  )
}

export default observer(App)
