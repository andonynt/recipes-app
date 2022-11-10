import styled from 'styled-components';

const Modal = styled.section`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 30;
  backdrop-filter: blur(16px);
  display: flex;
  justify-content: center;
  align-items: center;
  transition-duration: 500ms;
`;

export default Modal;
