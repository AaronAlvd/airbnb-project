import { useRef, createContext, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [modalContent, setModalContent] = useState(null);
  const [onModalClose, setOnModalClose] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Add this state

  const closeModal = () => {
    setModalContent(null);
    setIsOpen(false); // Update state when closing
    if (typeof onModalClose === "function") {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const openModal = (content, onClose) => {
    setModalContent(content);
    setOnModalClose(() => onClose);
    setIsOpen(true); // Update state when opening
  };

  const contextValue = {
    modalRef,
    modalContent,
    closeModal,
    setModalContent,
    setOnModalClose,
    isOpen, // Include isOpen in context
    openModal, // Add openModal function
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal() {
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);
  if (!modalRef || !modalRef.current || !modalContent) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={closeModal} />
      <div id="modal-content">{modalContent}</div>
    </div>,
    modalRef.current
  );
}

export const useModal = () => useContext(ModalContext);
