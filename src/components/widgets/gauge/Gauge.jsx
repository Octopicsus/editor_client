import { observer } from "mobx-react-lite"
import { selectedStore } from "../../../store/SelectedStore"
import { settingsStore } from "../../../store/SettingsStore"
import { ProgressContainer, Bar, Container, TitleValue } from "./Gauge.styled"
import { Button } from "../valueButton/ValueButton.styled"
import { useEffect, useState } from "react"

export default observer(function Gauge({ id, index }) {
  const barWidth = 180
  const mainHeight = 68
  let fontSize = mainHeight / 3

  const [isDragging, setIsDragging] = useState(false)
  const isSelected = selectedStore.selected === index
  const currentValue = settingsStore.getValue(id)

  useEffect(() => {
    settingsStore.getValues(id)
  }, [id])

  const handleDown = (event) => {
    setIsDragging(true)
    if ("pointerId" in event) {
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    setCountbyPointer(event)
  }

  const handleMove = (event) => {
    if (!isDragging) return
    setCountbyPointer(event)
  }

  const handleUp = (event) => {
    if ("pointerId" in event) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    setIsDragging(false)
    settingsStore.postValues(id, settingsStore.getValue(id))
  }

  const setCountbyPointer = (event) => {
    const x = event.clientX
    const rect = event.currentTarget.getBoundingClientRect()

    let position = Math.round(((x - rect.left) / barWidth) * 100)
    settingsStore.setClampValue(id, position)
  }

  const handleIncrement = () => {
    settingsStore.increment(id)
    settingsStore.postValues(id, settingsStore.getValue(id))
  }

  const handleDecrement = () => {
    settingsStore.decrement(id)
    settingsStore.postValues(id, settingsStore.getValue(id))
  }

  const disabledButton = (value, side) => {
    switch (side) {
      case "decrement":
        return value === 0
      case "increment":
        return value === 100
      default:
        return false
    }
  }

  return (
    <Container $isSelected={isSelected}>
      <Button
        $height={mainHeight}
        $fontS={fontSize}
        onClick={handleDecrement}
        disabled={disabledButton(currentValue, "decrement")}
        $isSelected={isSelected}
      >
        &lt;
      </Button>

      <ProgressContainer>
        <TitleValue $fontS={fontSize} $size={barWidth}>
          {currentValue}
        </TitleValue>

        <Bar
          $size={barWidth}
          $value={currentValue}
          onPointerDown={handleDown}
          onPointerMove={handleMove}
          onPointerUp={handleUp}
          $isSelected={isSelected}
        ></Bar>
      </ProgressContainer>

      <Button
        $height={mainHeight}
        $fontS={fontSize}
        onClick={handleIncrement}
        disabled={disabledButton(currentValue, "increment")}
        $isSelected={isSelected}
      >
        &gt;
      </Button>
    </Container>
  )
})
