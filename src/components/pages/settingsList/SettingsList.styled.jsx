import styled from "styled-components"
import "../../styles/colors.css"

export const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 3px;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 700px;
`

export const Item = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${(props) =>
    props.$isSelected ? "var(--color-bg-dark)" : "rgba(0, 0, 0, 0.17)"};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.13) 1%,
      rgba(0, 0, 0, 0.04) 1%,
      rgba(0, 0, 0, 0.04) 20%,
      rgba(0, 0, 0, 0) 98%
    );
    opacity: ${(props) => (props.$isSelected ? 1 : 0)};
    transition: opacity 0.3s ease;
    z-index: -1;
    pointer-events: none;
    outline: 2px solid rgba(252, 252, 252, 0.4);
  }

  &::after {
    content: "";
    position: absolute;
    left: 1;
    height: 100%;
    width: 402px;
    z-index: -1;
  }
`

export const TitleItem = styled.h3`
  padding-left: 24px;
  font-size: 18px;
  text-transform: uppercase;
  color: var(--color-text-muted);
  font-weight: bolder;
  user-select: none;
`
