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
background-color: rgba(0, 0, 0, 0.33);

&::before {
content: '';
position: absolute;
inset: 0;
background: linear-gradient(0deg,rgba(0, 0, 0, 0.13) 1%, rgba(0, 0, 0, 0.04) 1%, rgba(0, 0, 0, 0.04) 20%, rgba(0, 0, 0, 0) 98%);
opacity: ${props => props.$isSelected ? 1 : 0};
transition: opacity 0.3s ease;
z-index: -1;
pointer-events: none;
border: 1px solid rgba(252, 252, 252, 0.4);
}
`

export const TitleItem = styled.h3`
padding-left: 24px;
font-size: 18px;
text-transform: uppercase;
color: rgba(146, 146, 146, 1);
font-weight: bolder;
`