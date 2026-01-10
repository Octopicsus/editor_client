import styled from "styled-components"

export const Bar = styled.div`
  width: ${({ $size }) => `${$size}px`};
  height: 6px;
  background-color: #363636ff;
  position: relative;
  cursor: pointer;
  opacity: ${(props) => (props.$isSelected ? 1 : 0)};
  transition: 0.3s;

  &::before {
    content: "";
    display: block;
    width: ${({ $value }) => `${$value}%`};
    height: 100%;
    background-color: #4c4c4cff;
    position: absolute;
    transition: all 0.3s;
    background-image: radial-gradient(circle at center, gray 1px, transparent 0),
      radial-gradient(circle at center, #4c4c4cff 0.25rem, transparent 0.5%);
    background-size: 2px 2px;
    background-position: 0 0, 0.65rem 0.65rem;
  }

  &::after {
    content: "";
    display: block;
    width: 2px;
    height: 120%;
    top: 50%;
    transform: translateY(-50%);
    left: ${({ $value }) => `${$value}%`};
    background-color: #9e9e9eff;
    position: absolute;
    transition: all 0.3s;
  }
`

export const Container = styled.div`
  display: flex;
  background-color: rgba(24, 24, 24, 1);
  position: relative;

  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 2px;
    height: 100%;
    background-color: rgba(33, 33, 33, 1);
    top: 0;
    left: 0;
    z-index: 2;
    opacity: ${(props) => (props.$isSelected ? "0" : "1")};
    transition: all 0.3s;
  }
`

export const ProgressContainer = styled.div``

export const TitleValue = styled.h3`
  margin-top: 22px;
  margin-bottom: 2px;
  width: ${({ $size }) => `${$size}px`};
  pointer-events: none;
  font-size: 19px;
  z-index: 1;
  color: rgba(177, 177, 177, 1);
  user-select: none;
`
