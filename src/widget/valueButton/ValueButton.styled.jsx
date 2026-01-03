import styled from 'styled-components'

export const Button = styled.button`
background-color: rgba(101, 101, 101, 0);
color: #aeaeaeff;
font-size: 24px;
font-family: 'DotoR';
border: none;
width: ${({ $height }) => `${$height}px`};
height: ${({ $height }) => `${$height}px`};
user-select: none;
cursor: pointer;
opacity: ${props => props.$isSelected ? 1 : 0};
pointer-events: ${props => props.$isSelected ? 'auto' : 'none'};
transition: 0.5s;

&:disabled {
opacity: ${props => props.$isSelected ? 0.2 : 0};
  cursor: not-allowed;
}
`