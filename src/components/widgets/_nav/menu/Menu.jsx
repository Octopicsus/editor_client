import { observer } from "mobx-react-lite"
import { useLocation, useNavigate } from "react-router-dom"
import { settingsStore } from "../../../../store/settingsStore.js"
import { editorStore } from "../../../../store/editorStore.js"
import { NavWrapper, Button } from "./Menu.styled"

function Menu() {
  const navigate = useNavigate()
  const location = useLocation()

  const pageToggle = () => {
    return location.pathname === "/settings" ? "/editor" : "/settings"
  }

  const getButtonText = () => {
    return location.pathname === "/settings" ? "editor" : "settings"
  }

  const reset = async () => {
    await settingsStore.resetAll()
  }

  const totalClean = () => {
    editorStore.cleanStorage()
    editorStore.cleanDB()
    settingsStore.loadSettings()
    editorStore.loadSettings()
  }

  return (
    <NavWrapper>
      <Button onClick={totalClean}>clean</Button>
      <Button onClick={reset} $isDefault={settingsStore.isDefaultValues()}>
        reset
      </Button>
      <Button onClick={() => navigate(pageToggle())}>{getButtonText()}</Button>
    </NavWrapper>
  )
}

export default observer(Menu)
