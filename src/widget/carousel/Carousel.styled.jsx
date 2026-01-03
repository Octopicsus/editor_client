import styled from 'styled-components'

export const Container = styled.div`
display: flex;
pointer-events: ${props => props.$isSelected ? 'auto' : 'none'};
`

export const TitleValue = styled.h3`
width: 100%;
display: flex;
justify-content: center;
margin-top: 16px;
margin-bottom:3px;
pointer-events: none;
z-index: 1;
color: rgba(177, 177, 177, 1);
user-select: none;
font-size: 20px;
text-transform: uppercase;
`

export const SubContainer = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
width: ${({ $width }) => `${$width}px`};
height: 60px;
gap: 0px;
`

export const BubbleContainer = styled.div`
display: flex;
width: 100%;
justify-content: center;
gap: 5px;
opacity: ${props => props.$isSelected ? 1 : 0};
transition: 0.3s;
`

export const Bubble = styled.div`
width: 12px;
height: 6px;
border-radius: 5%;
background-color: ${({ $isActive }) => $isActive ? '#9e9e9eff' : '#363636ff'};
transition: all 0.3s;
cursor: pointer;
`