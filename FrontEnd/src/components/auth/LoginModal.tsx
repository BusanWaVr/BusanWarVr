import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
`;

const Dialog = styled.dialog`
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  padding: 0;
  overflow: hidden;
  z-index: 1;
`;

interface Props {
  children: React.ReactNode;
}

function Modal({ children }: Props) {
  const navigate = useNavigate();

  function closeHandler() {
    navigate(-1);
  }

  return (
    <>
      <Backdrop onClick={closeHandler} />
      <Dialog open>{children}</Dialog>
    </>
  );
}

export default Modal;
