import {
  OptionItem,
  StepTitle,
  Wrapper,
  OptionName,
  OptionValue,
  Button,
} from "./carouselOptionItem.styled"

export default function CarouselOptionItem({
  index,
  option,
  onUpdate,
  onDelete,
}) {
  return (
    <OptionItem>
      <StepTitle>{`Step-${index + 1}`}</StepTitle>
      <Wrapper>
        <OptionName
          type="text"
          placeholder="Step Title"
          value={option.name}
          onChange={(event) => onUpdate({ name: event.target.value })}
        />
        <OptionValue
          type="text"
          placeholder="Step Value"
          value={option.value}
          onChange={(event) => onUpdate({ value: event.target.value })}
        />
        <Button onClick={onDelete}>remove</Button>
      </Wrapper>
    </OptionItem>
  )
}
