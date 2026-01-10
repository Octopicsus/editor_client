import styled from "styled-components"
import "../../styles/colors.css"

export const Container = styled.div`
  display: flex;
  background-color: var(--color-bg-dark);
  position: relative;
  pointer-events: ${(props) => (props.$isSelected ? "auto" : "none")};

  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 2px;
    height: 100%;
    background-color: var(--color-bg-darker);
    top: 0;
    left: 0;
    z-index: 2;
    opacity: ${(props) => (props.$isSelected ? "0" : "1")};
    transition: all 0.3s;
  }
`

export const TitleValue = styled.h3`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 22px;
  margin-bottom: 2px;
  pointer-events: none;
  z-index: 1;
  color: var(--color-text-muted);
  user-select: none;
  font-size: 19px;
  text-transform: uppercase;
`

export const SubContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: ${({ $width }) => `${$width}px`};
  height: 50px;
  gap: 0px;
`

export const BubbleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 5px;
  opacity: ${(props) => (props.$isSelected ? 1 : 0)};
  transition: 0.3s;
`

export const Bubble = styled.div`
  width: 12px;
  height: 6px;
  border-radius: 5%;
  transition: all 0.3s;
  cursor: pointer;
  --bubble-color: ${({ $isActive }) => $isActive ? '#9e9e9eff' : '#4c4c4cff'};
  background-image: radial-gradient(circle at center, var(--color-texture-gray) 1px, transparent 0),
    radial-gradient(circle at center, var(--bubble-color) 0.25rem, transparent 0.5%);
  background-size: 2px 2px;
  background-position: 0 0, 0.65rem 0.65rem;
  opacity: ${(props) => (props.$isActive ? 0.9 : 0.4)};
`
