import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { selectedStore } from "../../../store/SelectedStore"
import { settingsStore } from "../../../store/SettingsStore"
import {
  Container,
  TitleValue,
  SubContainer,
  BubbleContainer,
  Bubble,
} from "./Carousel.styled"
import { Button } from "../valueButton/ValueButton.styled"

export default observer(function Carousel({ id, index }) {
  const carouselView = 180
  const mainHeight = 68
  const isSelected = selectedStore.selected === index

  const currentValue = settingsStore.getValue(id)
  const options = settingsStore.getOptions(id)
  const maxCount = settingsStore.getMaxCount(id)

  useEffect(() => {
    settingsStore.getValues(id)
  }, [id])

  const selectBubble = (bubbleIndex) => {
    settingsStore.setClampValue(id, bubbleIndex)
    settingsStore.postValues(id, bubbleIndex)
  }

  const handleIncrement = () => {
    settingsStore.increment(id)
    settingsStore.postValues(id, settingsStore.getValue(id))
  }

  const handleDecrement = () => {
   settingsStore.decrement(id)
    settingsStore.postValues(id, settingsStore.getValue(id))
  }

  const showTitle = (value) => {
    return options[value]
  }

  const disabledButton = (value, maxValue, side) => {
    switch (side) {
      case "decrement":
        return value === 0
      case "increment":
        return value === maxValue
      default:
        return false
    }
  }

  return (
    <Container $isSelected={isSelected}>
      <Button
        $height={mainHeight}
        onClick={handleDecrement}
        disabled={disabledButton(currentValue, maxCount, "decrement")}
        $isSelected={isSelected}
      >
        &lt;
      </Button>

      <SubContainer $width={carouselView}>
        <TitleValue>{showTitle(currentValue)}</TitleValue>

        <BubbleContainer $isSelected={isSelected}>
          {options.map((option, optionIndex) => (
            <Bubble
              key={optionIndex}
              $isActive={optionIndex === currentValue}
              onClick={() => selectBubble(optionIndex)}
            />
          ))}
        </BubbleContainer>
      </SubContainer>

      <Button
        $height={mainHeight}
        onClick={handleIncrement}
        disabled={disabledButton(currentValue, maxCount, "increment")}
        $isSelected={isSelected}
      >
        &gt;
      </Button>
    </Container>
  )
})
