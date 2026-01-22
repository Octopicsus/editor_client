import { Routes, Route, Navigate } from "react-router-dom"
import { Root } from "./App.styled"
import SettingsList from "../settingsList/SettingsList"
import SettingsEditor from "../editorList/SettingsEditor"
import { observer } from "mobx-react-lite"
import Menu from "../../widgets/_nav/menu/Menu"

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
