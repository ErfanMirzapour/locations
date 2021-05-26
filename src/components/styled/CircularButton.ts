import styled from 'styled-components';

const CircularButton = styled.button`
   position: absolute;
   z-index: 9999;
   bottom: 1rem;
   left: 1rem;
   background-color: #ff1e4499;
   width: 60px;
   height: 60px;
   border-radius: 50%;
   border: 2px solid #fff;
   box-shadow: -0.25rem 0.5rem 1rem #0005;
   cursor: pointer;
   color: #fff;
   display: grid;
   place-content: center;
   padding-bottom: 2px;

   & > .material-icons {
      font-size: xx-large;
   }

   &:active {
      box-shadow: inset -0.25rem 0.5rem 1rem #0005;
   }
`;

export default CircularButton;
