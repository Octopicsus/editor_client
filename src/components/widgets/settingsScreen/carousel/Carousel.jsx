import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { selectedStore } from "../../../../store/selectedStore"
import { settingsStore } from "../../../../store/settingsStore"
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

  const item = settingsStore.getItem(id)
  const currentValue = item.value
  const options = item.options ?? []
  const maxCount = options.length - 1 

  useEffect(() => {
    settingsStore.getValues(id)
  }, [id])

  const selectBubble = (bubbleIndex) => {
    settingsStore.setClampValue(id, bubbleIndex)
    settingsStore.postValues(id, bubbleIndex)
  }

  const postAfterChange = async (id) => {
    await settingsStore.postValues(id, settingsStore.getItem(id).value)
  }

  const handleIncrement = async () => {
    settingsStore.increment(id)
    await postAfterChange(id)
  }

  const handleDecrement = async () => {
    settingsStore.decrement(id)
    await postAfterChange(id)
  }

  const showTitle = (value) => {
    return options[value]?.name
  }

  return (
    <Container $isSelected={isSelected}>
      <Button
        $height={mainHeight}
        onClick={handleDecrement}
        disabled={settingsStore.disabledButton(
          currentValue,
          "decrement",
        )}
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
        disabled={settingsStore.disabledButton(
          currentValue,
          "increment",
          maxCount
        )}
        $isSelected={isSelected}
      >
        &gt;
      </Button>
    </Container>
  )
})
