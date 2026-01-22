import styled from "styled-components"
import "../../../styles/colors.css"

export const Bar = styled.div`
  width: ${({ $size }) => `${$size}px`};
  height: 4px;
  background-color: var(--color-fill-inactive);
  position: relative;
  cursor: pointer;
  opacity: ${(props) => (props.$isSelected ? 1 : 0.2)};
  transition: 0.3s;
  background-image: radial-gradient(
      circle at center,
      var(--color-texture-dark-fill) 1px,
      transparent 0%
    ),
    radial-gradient(
      circle at center,
      var(--color-texture-dark-shadow) 0.25rem,
      transparent 0.5%
    );
  background-size: 2px 2px;
  background-position: 0 0, 0.65rem 0.65rem;

  &::before {
    content: "";
    display: block;
    width: ${({ $value }) => `${$value}%`};
    height: 4px;
    background-color: var(--color-fill-bar);
    position: absolute;
    transition: all 0.3s;
    background-image: radial-gradient(
        circle at center,
        var(--color-texture-light-fill) 1px,
        transparent 0
      ),
      radial-gradient(
        circle at center,
        var(--color-texture-light-shadow) 0.25rem,
        transparent 0.5%
      );
    background-size: 2px 2px;
    background-position: 0 0, 0.65rem 0.65rem;
    opacity: 0.6;
  }

  &::after {
    content: "";
    display: block;
    width: 2px;
    height: 8px;
    top: 50%;
    transform: translateY(-50%);
    left: ${({ $value }) => `${$value}%`};
    background-color: var(--color-text-light);
    position: absolute;
    transition: all 0.3s;
  }
`

export const Container = styled.div`
  display: flex;
  background-color: var(--color-bg-dark);
  position: relative;

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

export const ProgressContainer = styled.div``

export const TitleValue = styled.h3`
  margin-top: 20px;
  margin-bottom: 2px;
  width: ${({ $size }) => `${$size}px`};
  pointer-events: none;
  font-size: 19px;
  z-index: 1;
  color: var(--color-text-muted);
  user-select: none;
`
