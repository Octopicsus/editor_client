import { Root } from './App.styled'
import SettingsList from './widget/settingsList/SettingsList'
import { observer } from 'mobx-react-lite'


function App() {
  return (
    <Root>

      <SettingsList />

    </Root>
  )
}

export default observer(App)
