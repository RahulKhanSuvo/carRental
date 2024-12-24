import { IoMdCloseCircleOutline } from "react-icons/io";

const ModifyDate = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-80 md:w-auto relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            <IoMdCloseCircleOutline size={24} />
          </button>
          hi
        </div>
      </div>
    </div>
  );
};

export default ModifyDate;
