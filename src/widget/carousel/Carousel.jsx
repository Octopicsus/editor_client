import { observer } from "mobx-react-lite"
import { carouselStore } from "../../store/CarouselStore"
import { Container, TitleValue, SubContainer, BubbleContainer, Bubble } from "./Carousel.styled"
import { Button } from "../valueButton/ValueButton.styled"
import { selectedStore } from "../../store/SelectedStore"


export default observer(function Carousel({ index }) {
  const carouselView = 220
  const mainHeight = 60


  const handleIncrement = () => {
    carouselStore.increment()
    carouselStore.postValue(carouselStore.count)
  }

  const handleDecrement = () => {
    carouselStore.decrement()
    carouselStore.postValue(carouselStore.count)
  }

  const showTitle = (value) => {
    const title = carouselStore.options[value]
    return title
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

  const selectBubble = (bubbleIndex) => {
    carouselStore.setClampValue(bubbleIndex)
    carouselStore.postValue(bubbleIndex)
  }


  return (
    <Container $isSelected={selectedStore.selected === index}>
      <Button
        $height={mainHeight}
        onClick={handleDecrement}
        disabled={disabledButton(carouselStore.count, carouselStore.maxCount, 'decrement')}
        $isSelected={selectedStore.selected === index}
      >
        &lt;
      </Button>

      <SubContainer $width={carouselView}>
        <TitleValue>{showTitle(carouselStore.count)}</TitleValue>
        <BubbleContainer>
          {carouselStore.options.map((option, optionIndex) => (
            <Bubble
              key={optionIndex}
              $isActive={optionIndex === carouselStore.count}
              onClick={() => selectBubble(optionIndex)}
            />
          ))}
        </BubbleContainer>
      </SubContainer>

      <Button
        $height={mainHeight}
        onClick={handleIncrement}
        disabled={disabledButton(carouselStore.count, carouselStore.maxCount, 'increment')}
        $isSelected={selectedStore.selected === index}
      >
        &gt;
      </Button>
    </Container>
  )
})
