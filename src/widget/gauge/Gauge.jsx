import { observer } from "mobx-react-lite"
import { selectedStore } from "../../store/SelectedStore"
import { gaugeStore } from "../../store/GaugeStore"
import { ProgressContainer, Bar, Container, TitleValue } from "./Gauge.styled"
import { Button } from "../valueButton/ValueButton.styled"
import { useState, useEffect } from "react"

export default observer(function Gauge({index}) {
    const barWidth = 220
    const mainHeight = 60

    let fontSize = mainHeight / 3

    const [isDragging, setIsDragging] = useState(false)



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
        gaugeStore.postValue(gaugeStore.count)
    }

    const setCountbyPointer = (event) => {
        const x = event.clientX
        const rect = event.currentTarget.getBoundingClientRect()

        let position = Math.round(((x - rect.left) / barWidth) * 100)
        position = gaugeStore.setClampValue(position)
    }

    const handleIncrement = () => {
        gaugeStore.increment()
        gaugeStore.postValue(gaugeStore.count)
    }

    const handleDecrement = () => {
        gaugeStore.decrement()
        gaugeStore.postValue(gaugeStore.count)
    }

    const disabledButton = (value, side) => {
        switch (side) {
            case 'decrement':
                return value === 0
            case 'increment':
                return value === 100
            default:
                return false
        }
    }

    return (
        <Container $isSelected={selectedStore.selected === index}>
            <Button
                $height={mainHeight}
                $fontS={fontSize}
                onClick={handleDecrement}
                disabled={disabledButton(gaugeStore.count, 'decrement')}
                $isSelected={selectedStore.selected === index}
            >
                &lt;
            </Button>

            <ProgressContainer>
                <TitleValue $fontS={fontSize}>{gaugeStore.count}</TitleValue>
                <Bar $size={barWidth} $value={gaugeStore.count} onPointerDown={handleDown} onPointerMove={handleMove} onPointerUp={handleUp}>
                </Bar>
            </ProgressContainer>

            <Button
                $height={mainHeight}
                $fontS={fontSize}
                onClick={handleIncrement}
                disabled={disabledButton(gaugeStore.count, 'increment')}
                $isSelected={selectedStore.selected === index}
            >
                &gt;
            </Button>
        </Container>
    )
})
