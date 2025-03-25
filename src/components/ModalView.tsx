import React from 'react';

interface ModalProp {
    isOpen: boolean,
    onClose: ()=> void,
    children: React.ReactNode
}

const ModalView: React.FC<ModalProp> = ({isOpen,onClose,children}) => {
    if(!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-6 rounded shadow-lg w-full max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white hover:text-red-400 text-xl"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalView;