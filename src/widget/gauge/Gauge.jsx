import { observer } from "mobx-react-lite"
import { selectedStore } from "../../store/SelectedStore"
import { gaugeStore } from "../../store/GaugeStore"
import { ProgressContainer, Bar, Container, TitleValue } from "./Gauge.styled"
import { Button } from "../valueButton/ValueButton.styled"
import { useEffect, useState } from "react"

export default observer(function Gauge({ id, index }) {
    const barWidth = 180
    const mainHeight = 68
    let fontSize = mainHeight / 3

    const [isDragging, setIsDragging] = useState(false)
    const isSelected = selectedStore.selected === index
    const count = gaugeStore.getCount(id)

    useEffect(() => {
        gaugeStore.getValue(id)
    }, [])


    const handleDown = (event) => {
        if (!isSelected) return

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
        if (!isSelected) return

        if ("pointerId" in event) {
            event.currentTarget.releasePointerCapture(event.pointerId)
        }
        setIsDragging(false)
        gaugeStore.postValue(id, gaugeStore.getCount(id))
    }

    const setCountbyPointer = (event) => {
        if (!isSelected) return

        const x = event.clientX
        const rect = event.currentTarget.getBoundingClientRect()

        let position = Math.round(((x - rect.left) / barWidth) * 100)
        gaugeStore.setGaugeValue(id, position)
    }

    const handleIncrement = () => {
        if (!isSelected) return

        gaugeStore.increment(id)
        gaugeStore.postValue(id, gaugeStore.getCount(id))
    }

    const handleDecrement = () => {
        if (!isSelected) return

        gaugeStore.decrement(id)
        gaugeStore.postValue(id, gaugeStore.getCount(id))
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
        <Container $isSelected={isSelected}>
            <Button
                $height={mainHeight}
                $fontS={fontSize}
                onClick={handleDecrement}
                disabled={disabledButton(count, 'decrement')}
                $isSelected={isSelected}
            >
                &lt;
            </Button>

            <ProgressContainer>
                <TitleValue
                    $fontS={fontSize}
                    $size={barWidth}
                >{count}</TitleValue>

                <Bar
                    $size={barWidth}
                    $value={count}
                    onPointerDown={handleDown}
                    onPointerMove={handleMove}
                    onPointerUp={handleUp}
                    $isSelected={isSelected}
                >
                </Bar>

            </ProgressContainer>

            <Button
                $height={mainHeight}
                $fontS={fontSize}
                onClick={handleIncrement}
                disabled={disabledButton(count, 'increment')}
                $isSelected={isSelected}
            >
                &gt;
            </Button>
        </Container>
    )
})
