import { useLocation, useNavigate } from "react-router-dom"
import { valuesStore } from "../../../store/ValuesStore"
import { NavWrapper, Button } from "./Menu.styled"
import { observer } from "mobx-react-lite"

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
    await valuesStore.resetAll()
  }

  return (
    <NavWrapper>
      <Button onClick={reset} $isDefault={valuesStore.isDefaultValues()}>
        reset
      </Button>
      <Button onClick={() => navigate(pageToggle())}>{getButtonText()}</Button>
    </NavWrapper>
  )
}

export default observer(Menu)
