import { classes } from 'lib/utils/classNames';
import React, { useState } from 'react';

const XIcon = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const Modal: React.FC<{ visible: boolean; setVisible: any }> = ({
  visible = false,
  children,
  setVisible,
}) => {
  return (
    <div
      className={classes([
        visible ? 'visible' : 'hidden',
        'w-screen h-screen bg-gray-800 bg-opacity-50 fixed top-0 left-0 z-50 flex flex-col justify-center',
      ])}
      onClick={() => setVisible(false)}
    >
      <div className="flex justify-center">
        <div
          className=" m-1 rounded-xl relative max-w-full max-h-full overflow-hidden shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export const useModal = (): [
  React.FC<{}>,
  React.Dispatch<React.SetStateAction<boolean>>,
] => {
  const [visible, setVisible] = useState(false);

  const MyModal: React.FC = ({ children }) => (
    <Modal visible={visible} setVisible={setVisible}>
      {children}
    </Modal>
  );

  return [MyModal, setVisible];
};

export default Modal;
