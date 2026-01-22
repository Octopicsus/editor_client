import { observer } from "mobx-react-lite"
import { selectedStore } from "../../../../store/selectedStore"
import { settingsStore } from "../../../../store/settingsStore.js"
import { ProgressContainer, Bar, Container, TitleValue } from "./Gauge.styled"
import { Button } from "../valueButton/ValueButton.styled"
import { useEffect, useState } from "react"

export default observer(function Gauge({ id, index }) {
  const barWidth = 180
  const mainHeight = 68
  let fontSize = mainHeight / 3

  const [isDragging, setIsDragging] = useState(false)
  const isSelected = selectedStore.selected === index


  const item = settingsStore.getItem(id)
  const currentValue = item.value

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
    settingsStore.postValues(id, settingsStore.getItem(id).value)
  }

  const setCountbyPointer = (event) => {
    const x = event.clientX
    const rect = event.currentTarget.getBoundingClientRect()

    let position = Math.round(((x - rect.left) / barWidth) * 100)
    settingsStore.setClampValue(id, position)
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

  return (
    <Container $isSelected={isSelected}>
      <Button
        $height={mainHeight}
        $fontS={fontSize}
        onClick={handleDecrement}
        disabled={settingsStore.disabledButton(currentValue, "decrement")}
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
        disabled={settingsStore.disabledButton(currentValue, "increment")}
        $isSelected={isSelected}
      >
        &gt;
      </Button>
    </Container>
  )
})
