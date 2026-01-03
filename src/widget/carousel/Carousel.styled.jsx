import styled from 'styled-components'

export const Container = styled.div`
display: flex;
gap: 10px;
pointer-events: ${props => props.$isSelected ? 'auto' : 'none'};
`

export const TitleValue = styled.h3`
width: 100%;
display: flex;
justify-content: center;
margin: 0;
pointer-events: none;
z-index: 1;
color: rgba(177, 177, 177, 1);
user-select: none;
font-size: 18px;
text-transform: uppercase;
`

export const SubContainer = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
width: ${({ $width }) => `${$width}px`};
height: 60px;
gap: 2px;
`

export const BubbleContainer = styled.div`
display: flex;
width: 100%;
justify-content: center;
gap: 5px;
`

export const Bubble = styled.div`
width: 12px;
height: 4px;
border-radius: 5%;
background-color: ${({ $isActive }) => $isActive ? '#9e9e9eff' : '#363636ff'};
transition: all 0.3s;
cursor: pointer;
`