import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { selectedStore } from "../../store/SelectedStore"
import { carouselStore } from "../../store/CarouselStore"
import { Container, TitleValue, SubContainer, BubbleContainer, Bubble } from "./Carousel.styled"
import { Button } from "../valueButton/ValueButton.styled"


export default observer(function Carousel({ id, index }) {
  const carouselView = 180
  const mainHeight = 60

  const isSelected = selectedStore.selected === index

  const count = carouselStore.getCount(id)
  const options = carouselStore.getOptions(id)
  const maxCount = carouselStore.getMaxCount(id)

  useEffect(() => {
    carouselStore.getValue(id)
  }, [id])

  const selectBubble = (bubbleIndex) => {
    carouselStore.setCarouselValue(id, bubbleIndex)
    carouselStore.postValue(id, bubbleIndex)
  }

  const handleIncrement = () => {
    carouselStore.increment(id)
    carouselStore.postValue(id, carouselStore.getCount(id))
  }

  const handleDecrement = () => {
    carouselStore.decrement(id)
    carouselStore.postValue(id, carouselStore.getCount(id))
  }

  const showTitle = (value) => {
    return options[value]
  }

  const disabledButton = (value, maxValue, side) => {
    switch (side) {
      case 'decrement':
        return value === 0
      case 'increment':
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
        disabled={disabledButton(count, maxCount, 'decrement')}
        $isSelected={isSelected}
      >
        &lt;
      </Button>

      <SubContainer $width={carouselView}>
        <TitleValue>{showTitle(count)}</TitleValue>

        <BubbleContainer $isSelected={isSelected}>
          {options.map((option, optionIndex) => (
            <Bubble
              key={optionIndex}
              $isActive={optionIndex === count}
              onClick={() => selectBubble(optionIndex)}
            />
          ))}
        </BubbleContainer>

      </SubContainer>

      <Button
        $height={mainHeight}
        onClick={handleIncrement}
        disabled={disabledButton(count, maxCount, 'increment')}
        $isSelected={isSelected}
      >
        &gt;
      </Button>
    </Container>
  )
})
