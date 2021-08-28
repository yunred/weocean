import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  body{
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
  }

`;

export const MyHeader = styled.div`
  display: flex;
  flex-direction: column;

  & .sub1 {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .icon {
      display: flex;
    }
  }

  & .sub2 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid #aaaaaa;
  outline: none;
  border-radius: 0px;
  line-height: 2.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  &:focus {
    border: 1.2px solid #32bebe;
  }
  ::placeholder {
    color: #aaaaaa;
  }
`;

export const PostInput = styled.textarea`
  width: 100%;
  border: 1px solid #aaaaaa;
  outline: none;
  border-radius: 0px;
  line-height: 2.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  &:focus {
    border: 1.2px solid #32bebe;
  }
  ::placeholder {
    color: #aaaaaa;
  }
`;
