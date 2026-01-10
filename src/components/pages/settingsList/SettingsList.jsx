import { observer } from "mobx-react-lite"
import { settingsStore } from "../../../store/SettingsStore"
import { selectedStore } from "../../../store/selectedStore"
import Gauge from "../../widgets/gauge/Gauge"
import Carousel from "../../widgets/carousel/Carousel"
import { Item, TitleItem, ListWrapper } from "./SettingsList.styled"

export default observer(function SettingsList() {
  return (
    <ListWrapper>
      {settingsStore.settings.map((widget, index) => (
        <Item
          key={widget.id}
          $isSelected={selectedStore.selected === index}
          onMouseEnter={() => selectedStore.setValue(index)}
          onMouseLeave={() => selectedStore.setValue(-1)}
        >
          <TitleItem $isSelected={selectedStore.selected === index}>
            {widget.title}
          </TitleItem>
          {widget.type === "gauge" && <Gauge id={widget.id} index={index} />}
          {widget.type === "carousel" && (
            <Carousel id={widget.id} index={index} />
          )}
        </Item>
      ))}
    </ListWrapper>
  )
})
