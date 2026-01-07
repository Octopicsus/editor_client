import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Root, NavWrapper, Button } from "./App.styled";
import SettingsList from "../settingsList/SettingsList";
import SettingsEditor from "../settingsEditor/SettingsEditor";
import { observer } from "mobx-react-lite";

function App() {
  const navigate = useNavigate();
  const locaction = useLocation();

  const pageToggle = () => {
    return location.pathname === "/settings" ? "/editor" : "/settings";
  };

  const getButtonText = () => {
    return locaction.pathname === "/settings" ? "editor" : "settings";
  };

  return (
    <Root>
      <NavWrapper>
        <Button>reset</Button>
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
  );
}

export default observer(App);
