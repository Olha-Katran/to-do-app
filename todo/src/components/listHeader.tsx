import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

type Props = {
    listName: string;
    onEditClick: () => void;
    onDeleteClick: () => void;
};

const ListHeader: React.FC<Props> = ({ listName, onEditClick, onDeleteClick }) => (
    <div className="flex justify-between items-center mb-4">
        <h2 className="mb-4">{listName}</h2>
        <div>
            <button
                onClick={onEditClick}
                className="text-white-500 hover:text-white hover:bg-green-500 px-4 py-2 rounded-lg"
            >
                <FaEdit size={16} />
            </button>

            <button
                onClick={onDeleteClick}
                className="text-white-500 hover:text-white hover:bg-red-500 px-4 py-2 rounded-lg"
            >
                <FaTrash size={16} />
            </button>
        </div>
    </div>
);

export default ListHeader;
