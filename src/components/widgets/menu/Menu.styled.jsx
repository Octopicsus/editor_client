import styled from "styled-components"

export const NavWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  margin-right: 20px;
  gap: 5px;
  position: absolute;
  top: 0;
  right: 0;
`

export const Button = styled.button`
  border: none;
  width: 60px;
  height: 30px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0);
  font-family: "DotoR";
  text-transform: uppercase;
  font-size: 12px;
  color: ${(props) => (props.$isDefault ? "gray" : "white")};
  user-select: none;
`
