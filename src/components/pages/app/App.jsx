import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom"
import { Root, NavWrapper, Button } from "./App.styled"
import SettingsList from "../settingsList/SettingsList"
import SettingsEditor from "../settingsEditor/SettingsEditor"
import { valuesStore } from "../../../store/ValuesStore"
import { observer } from "mobx-react-lite"
import { values } from "mobx"

function App() {
  const navigate = useNavigate()
  const locaction = useLocation()

  const pageToggle = () => {
    return location.pathname === "/settings" ? "/editor" : "/settings"
  }

  const getButtonText = () => {
    return locaction.pathname === "/settings" ? "editor" : "settings"
  }

  const reset = async () => {
    await valuesStore.resetAll()
  }

  return (
    <Root>
      <NavWrapper>
        <Button onClick={reset}>reset</Button>
        <Button onClick={() => navigate(pageToggle())}>
          {getButtonText()}
        </Button>
      </NavWrapper>

      <Routes>
        <Route path="/" element={<Navigate to="/settings" />} />

        <Route path="/settings" element={<SettingsList />} />
        <Route path="/editor" element={<SettingsEditor />} />
      </Routes>
    </Root>
  )
}

export default observer(App)
