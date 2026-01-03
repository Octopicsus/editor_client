import styled from 'styled-components'

export const Bar = styled.div`
width: ${({ $size }) => `${$size}px`};
height: 6px;
background-color: #363636ff;
position: relative;
cursor: pointer;
opacity: ${props => props.$isSelected ? 1 : 0};
transition: 0.3s;

&::before {
content: "";
display: block;
width: ${({ $value }) => `${$value}%`};
height: 100%;
background-color: #5b5b5bff;
position: absolute;
transition: all 0.3s;
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
`

export const ProgressContainer = styled.div`
`

export const TitleValue = styled.h3`
margin-top: 16px;
margin-bottom:3px;
width: ${({ $size }) => `${$size}px`};
pointer-events: none;
font-size: 20px;
z-index: 1;
color: rgba(177, 177, 177, 1);
user-select: none;
font-size: ${({ $fontS }) => `${$fontS}px`};
`