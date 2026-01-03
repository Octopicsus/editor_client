import styled from 'styled-components'

export const ListWrapper = styled.ul`
display: flex;
flex-direction: column;
gap: 10px;
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
padding: 12px;

&::before {
content: '';
position: absolute;
inset: 0;
background: linear-gradient(0deg,rgba(252, 252, 252, 0.08) 1%, rgba(252, 252, 252, 0.02) 1%, rgba(252, 252, 252, 0.02) 20%, rgba(255, 255, 255, 0) 98%);
opacity: ${props => props.$isSelected ? 1 : 0};
transition: opacity 0.3s ease;
z-index: -1;
pointer-events: none;
border-radius: 4px;
}
`

export const TitleItem = styled.h3`
padding-left: 24px;
font-size: 18px;
text-transform: uppercase;
color: rgba(146, 146, 146, 1);
font-weight: bolder;
`