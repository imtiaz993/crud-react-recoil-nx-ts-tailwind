import React from 'react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this todo item?</p>
        <div className="md:flex justify-end md:space-x-2 mt-4">
          <button onClick={onClose} className="bg-gray-300 w-full md:w-1/2 p-2 rounded">
            Cancel
          </button>
          <button onClick={onConfirm} className="bg-red-500 w-full  mt-4 md:mt-0 md:w-1/2 text-white p-2 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
