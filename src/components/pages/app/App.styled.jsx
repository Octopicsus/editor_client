import styled from "styled-components";

export const Root = styled.div`
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  text-align: center;
`;

export const NavWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 5px;
  position: absolute;
  top: 0;
  right: 0;
`;

export const Button = styled.button`
  border: none;
  width: 60px;
  height: 30px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0);
`;
